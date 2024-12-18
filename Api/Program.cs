using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MyApp.Data;
using Npgsql;
using System.Text;
using Yarp.ReverseProxy.Configuration;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env file in the Api directory
Env.Load("./.env");

// Debug output to verify environment variables
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
Console.WriteLine($"DATABASE_URL: {databaseUrl}");
Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200", "http://localhost:8080", "https://angular-book-app.onrender.com", "https://angular-book-app-eeb487910d5c.herokuapp.com")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
        });
});

// Configure JWT authentication
var jwtSettings = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSettings["Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new ArgumentNullException("Jwt:Key", "JWT Key is not configured.");
}

var keyBytes = Encoding.UTF8.GetBytes(jwtKey);
if (keyBytes.Length < 16) // Ensure the key is at least 128 bits (16 bytes)
{
    throw new ArgumentException("Jwt:Key must be at least 128 bits (16 bytes) long.");
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var issuer = jwtSettings["Issuer"];
    var audience = jwtSettings["Audience"];

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
    };
});

builder.Services.AddAuthorization();

// Parse the PostgreSQL connection string from the environment variable
if (string.IsNullOrEmpty(databaseUrl))
{
    throw new ArgumentNullException("DATABASE_URL", "Database URL is not configured.");
}

var connString = new NpgsqlConnectionStringBuilder();

if (databaseUrl.StartsWith("postgres://"))
{
    // Parse URL format
    var databaseUri = new Uri(databaseUrl);
    var userInfo = databaseUri.UserInfo.Split(':');

    connString.Host = databaseUri.Host;
    connString.Port = databaseUri.Port > 0 ? databaseUri.Port : 5432; // Set default port if not specified
    connString.Username = userInfo[0];
    connString.Password = userInfo[1];
    connString.Database = databaseUri.AbsolutePath.Trim('/');
}
else
{
    // Parse key-value format
    var keyValues = databaseUrl.Split(';');
    foreach (var keyValue in keyValues)
    {
        var pair = keyValue.Split('=');
        if (pair.Length == 2)
        {
            switch (pair[0].Trim())
            {
                case "Host":
                    connString.Host = pair[1].Trim();
                    break;
                case "Database":
                    connString.Database = pair[1].Trim();
                    break;
                case "Username":
                    connString.Username = pair[1].Trim();
                    break;
                case "Password":
                    connString.Password = pair[1].Trim();
                    break;
                case "Port":
                    connString.Port = int.Parse(pair[1].Trim());
                    break;
            }
        }
    }
}

connString.SslMode = SslMode.Require;

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connString.ConnectionString));

// Add Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

// Add YARP reverse proxy
builder.Services.AddReverseProxy()
    .LoadFromMemory(new[]
    {
        new RouteConfig
        {
            RouteId = "angular",
            ClusterId = "angular-cluster",
            Match = new RouteMatch
            {
                Path = "{**catch-all}"
            }
        }
    },
    new[]
    {
        new ClusterConfig
        {
            ClusterId = "angular-cluster",
            Destinations = new Dictionary<string, DestinationConfig>
            {
                { "angular-destination-4200", new DestinationConfig { Address = "http://localhost:4200" } },
                { "angular-destination-8080", new DestinationConfig { Address = "http://localhost:8080" } }
            }
        }
    });

var app = builder.Build();

// Initialize the database with default admin users
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();

    if (!context.Users.Any(u => u.Username == "admin"))
    {
        context.Users.Add(new User { Username = "admin", Password = "admin" });
        context.SaveChanges();
    }
}

// Apply migrations
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowSpecificOrigin");
app.UseAuthentication();
app.UseAuthorization();

// Use YARP reverse proxy
app.MapReverseProxy();

app.MapControllers();

var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Urls.Add($"http://0.0.0.0:{port}");

app.Run();

public partial class Program { }
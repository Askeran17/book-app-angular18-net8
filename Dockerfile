# Multi-stage Dockerfile for Angular 18 + .NET 8 application
# Optimized for Render deployment

# Stage 1: Build Angular frontend
FROM node:20-alpine AS angular-build
WORKDIR /app/angular-app

# Copy Angular package files
COPY angular-app/package*.json ./

# Copy Angular source code (needed before npm ci due to postinstall script)
COPY angular-app/ ./

# Install dependencies (this will trigger postinstall which builds the app)
RUN npm ci --omit=dev

# Stage 2: Build .NET backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-build
WORKDIR /app

# Copy solution and project files
COPY angular18-net8.sln ./
COPY Api/Api.csproj ./Api/

# Restore dependencies
RUN dotnet restore

# Copy the rest of the API source code
COPY Api/ ./Api/

# Build and publish the API
RUN dotnet publish Api/Api.csproj -c Release -o /app/publish

# Stage 3: Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Install necessary packages
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy published API from build stage
COPY --from=dotnet-build /app/publish ./

# Copy Angular build output to wwwroot/browser
COPY --from=angular-build /app/angular-app/dist/angular-app/browser ./wwwroot/browser

# Expose port (Render will use the PORT environment variable)
EXPOSE 8080

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Start the application
ENTRYPOINT ["dotnet", "Api.dll"]

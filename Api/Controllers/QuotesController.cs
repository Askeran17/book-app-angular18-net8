using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using System.Threading.Tasks;

namespace MyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuotesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetQuotes()
        {
            var quotes = await _context.Quotes.ToListAsync();
            return Ok(quotes);
        }

        [HttpPost]
        public async Task<IActionResult> AddQuote([FromBody] Quote request)
        {
            _context.Quotes.Add(request);
            await _context.SaveChangesAsync();
            return Created("", new { message = "Quote added" });
        }
    }
}
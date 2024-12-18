using Microsoft.AspNetCore.Mvc;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet("test")]
        public IActionResult Index()
        {
            return Ok("success!");
        }
    }
}
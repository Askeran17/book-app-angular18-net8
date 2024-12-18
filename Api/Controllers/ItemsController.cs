using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ItemsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetItems()
        {
            return Ok(new { items = new string[] { "Item1", "Item2" } });
        }

        [HttpPost]
        public IActionResult CreateItem([FromBody] string item)
        {
            return Created("", new { message = "Item created" });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateItem(int id, [FromBody] string item)
        {
            return Ok(new { message = "Item updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteItem(int id)
        {
            return Ok(new { message = "Item deleted" });
        }
    }
}
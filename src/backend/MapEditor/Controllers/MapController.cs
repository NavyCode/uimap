using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TestSuiteService.Controllers
{
    [ApiController]
    [Route("maps")]
    public class MapController : ControllerBase
    {
        private readonly ILogger<MapController> _logger;

        public MapController(ILogger<MapController> logger)
        {
            _logger = logger;
        }

        [HttpGet("")]
        public ActionResult GetSuitesTree(int projectId, int planId)
        {
            return Ok();
        } 
    }
}

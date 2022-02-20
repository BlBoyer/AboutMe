using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using about_me.Models;
using about_me.Services;

namespace aboutme_api.Controllers;

[ApiController]
[Route("[controller]")]
public class OwnerController : ControllerBase
{
    private readonly ILogger<OwnerController> _logger;

    public OwnerController(ILogger<OwnerController> logger)
    {
        _logger = logger;
    }
    [EnableCors("myInfoAllowed")]
    [HttpGet("aboutme")]
    //get person details of id 0 'me' 
    public ActionResult<Person> Get(){
        var person = UserService.GetById(0);
        if (person is null){
            return NotFound();
        }
        return person;
    }
}

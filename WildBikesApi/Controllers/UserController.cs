using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WildBikesApi.DTO.User;
using WildBikesApi.Services.UserService;

namespace WildBikesApi.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("Token")]
        public async Task<ActionResult> Token(UserTokenDTO userTokenDTO)
        {
            if (await _userService.VerifyCredentials(userTokenDTO))
            {
                return Ok(_userService.GenerateToken(userTokenDTO));
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult> Register(UserRegisterDTO userRegisterDTO)
        {
            UserReadDTO? userReadDTO = await _userService.Register(userRegisterDTO);
            return userReadDTO is null ? BadRequest($"Username \"{userRegisterDTO.UserName}\" is already taken") : Ok(userReadDTO);
        }
    }
}

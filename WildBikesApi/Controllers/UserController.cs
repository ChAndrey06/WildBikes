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

        [HttpPost("Login")]
        public async Task<ActionResult<TokenDTO>> Login(UserLoginDTO userLoginDTO)
        {
            var response = await _userService.Login(userLoginDTO);

            if (response is null)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(response);
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register(UserRegisterDTO userRegisterDTO)
        {
            var userReadDTO = await _userService.Register(userRegisterDTO);

            return userReadDTO is null ? BadRequest($"Login \"{userRegisterDTO.Login}\" is already taken") : Ok(userReadDTO);
        }
    }
}

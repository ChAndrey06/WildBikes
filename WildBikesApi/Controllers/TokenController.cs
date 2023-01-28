using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WildBikesApi.DTO.User;
using WildBikesApi.Services.TokenService;
using WildBikesApi.Services.UserService;

namespace WildBikesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly BikesContext _context;

        public TokenController(ITokenService tokenService, BikesContext context)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("Refresh")]
        public async Task<ActionResult<TokenDTO>> Refresh(TokenDTO tokenDTO)
        {
            string accessToken = tokenDTO.AccessToken;
            string refreshToken = tokenDTO.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
            var userName = principal.Identity?.Name;

            User? user = await _context.Users.FirstOrDefaultAsync(i => i.UserName == userName); 

            if (user is null || user.RefreshToken != refreshToken) 
            {
                return BadRequest("Invalid credentials");
            }
            if (user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Refresh token expired");
            }

            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newAccessToken;
            user.RefreshTokenExpiryTime = DateTime.Now;

            await _context.SaveChangesAsync();
                
            return Ok(new TokenDTO
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            });
        }

        [HttpPost("Revoke"), Authorize]
        public async Task<ActionResult> Revoke()
        {
            var userName = User.Identity?.Name;

            User? user = _context.Users.FirstOrDefault(i => i.UserName == userName);

            if (user is null) return BadRequest();

            user.RefreshToken = null;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

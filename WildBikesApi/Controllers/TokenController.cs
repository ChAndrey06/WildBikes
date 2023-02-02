using Microsoft.AspNetCore.Mvc;
using WildBikesApi.DTO.User;
using WildBikesApi.Services.TokenService;

namespace WildBikesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokensService _tokenService;
        private readonly BikesContext _context;

        public TokenController(ITokensService tokenService, BikesContext context)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("Refresh")]
        public async Task<ActionResult<TokenDTO>> Refresh(TokenDTO tokenDTO)
        {
            var principal = _tokenService.GetPrincipalFromExpiredToken(tokenDTO.AccessToken);
            var login = principal.Identity?.Name;

            var user = await _context.Users.Include(i => i.RefreshTokens).FirstOrDefaultAsync(i => i.Login.Equals(login));

            if (user is null) return NotFound("User not found");

            var refreshToken = user.RefreshTokens?.FirstOrDefault(i => i.Value.Equals(tokenDTO.RefreshToken));

            if (refreshToken is null) return BadRequest("Invalid refresh token");
            if (refreshToken.ExpiryTime <= DateTime.Now) return BadRequest("Refresh token expired");

            string newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            string newRefreshToken = _tokenService.GenerateRefreshToken();

            refreshToken.Value = newRefreshToken;
            refreshToken.ExpiryTime = DateTime.Now.AddDays(2);

            await _context.SaveChangesAsync();
                
            return Ok(new TokenDTO
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }
    }
}

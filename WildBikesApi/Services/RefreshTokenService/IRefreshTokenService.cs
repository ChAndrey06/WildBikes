using Microsoft.AspNetCore.Mvc;
using WildBikesApi.DTO.User;

namespace WildBikesApi.Services.RefreshTokenService
{
    public interface IRefreshTokenService
    {
        Task<ActionResult<TokenDTO>> Create(RefreshToken refreshToken);
    }
}

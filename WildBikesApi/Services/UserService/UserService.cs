using AutoMapper;
using WildBikesApi.DTO.User;
using System.Security.Claims;
using WildBikesApi.Services.TokenService;
using WildBikesApi.Services.PasswordService;

namespace WildBikesApi.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly BikesContext _context;
        private readonly IMapper _mapper;
        private readonly ITokensService _tokenService;
        private readonly IPasswordService _passwordService;

        public UserService(
            BikesContext context,
            IMapper mapper,
            ITokensService tokenService,
            IPasswordService passwordService
        )
        {
            _context = context;
            _mapper = mapper;
            _tokenService = tokenService;
            _passwordService = passwordService;
        }

        public async Task<List<UserReadDTO>> GetAll()
        {
            var userList = await _context.Users.ToListAsync();
            var userReadDTOList = _mapper.Map<List<User>, List<UserReadDTO>>(userList);

            return userReadDTOList;
        }

        public async Task<UserReadDTO?> Register(UserRegisterDTO userRegisterDTO)
        {
            var user = await _context.Users.FirstOrDefaultAsync(i => i.Login.Equals(userRegisterDTO.Login));

            if (user is not null) return null;

            user = new User
            {
                Name = userRegisterDTO.Name,
                Login = userRegisterDTO.Login,
                PasswordHash = _passwordService.Hash(userRegisterDTO.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var userReadDTO = _mapper.Map<UserReadDTO>(user);

            return userReadDTO;
        }

        public async Task<TokenDTO?> Login(UserLoginDTO userLoginDTO)
        {
            var user = await _context.Users.FirstOrDefaultAsync(i => i.Login.Equals(userLoginDTO.Login));

            if (user is null || !_passwordService.Verify(userLoginDTO.Password, user.PasswordHash)) return null;

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, userLoginDTO.Login)
            };
            var accessTokenValue = _tokenService.GenerateAccessToken(claims);
            var refreshTokenValue = _tokenService.GenerateRefreshToken();
            var refreshTokenExpiryTime = DateTime.Now.AddDays(2);

            var refreshToken = user.RefreshTokens.FirstOrDefault(i => i.ExpiryTime <= DateTime.Now);

            if (refreshToken is null)
            {
                user.RefreshTokens.Add(new RefreshToken()
                    {
                        Value = refreshTokenValue,
                        ExpiryTime = refreshTokenExpiryTime
                    }
                );
            }
            else
            {
                refreshToken.Value = refreshTokenValue;
                refreshToken.ExpiryTime = refreshTokenExpiryTime;
            }

            _context.SaveChanges();

            return new TokenDTO
            {
                AccessToken = accessTokenValue,
                RefreshToken = refreshTokenValue,
            };
        }
    }
}

using AutoMapper;
using WildBikesApi.DTO.User;
using System.Security.Claims;
using WildBikesApi.Services.TokenService;

namespace WildBikesApi.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly BikesContext _context;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public UserService(BikesContext context, IMapper mapper, ITokenService tokenService)
        {
            _context = context;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        public async Task<List<UserReadDTO>> GetAll()
        {
            List<User> userList = await _context.Users.ToListAsync();
            List<UserReadDTO> userReadDTOList = _mapper.Map<List<User>, List<UserReadDTO>>(userList);

            return userReadDTOList;
        }

        public async Task<UserReadDTO?> Register(UserRegisterDTO userRegisterDTO)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(i => i.UserName.Equals(userRegisterDTO.UserName));

            if (user is not null)
            {
                return null;
            }

            user = new User
            {
                UserName = userRegisterDTO.UserName,
                PasswordHash = userRegisterDTO.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            UserReadDTO userReadDTO = _mapper.Map<UserReadDTO>(user);

            return userReadDTO;
        }

        public async Task<TokenDTO?> Login(UserLoginDTO userLoginDTO)
        {
            User? user = await VerifyCredentials(userLoginDTO);

            if (user is null)
            {
                return null;
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, userLoginDTO.UserName)
            };
            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

            _context.SaveChanges();

            TokenDTO tokenResponseDTO = new TokenDTO
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            };

            return tokenResponseDTO;
        }

        private async Task<User?> VerifyCredentials(UserLoginDTO userLoginDTO)
        {
            string username = userLoginDTO.UserName;
            string passwordHash = userLoginDTO.Password;

            User? user = await _context.Users.FirstOrDefaultAsync(i => i.UserName.Equals(username) && i.PasswordHash.Equals(passwordHash));
            
            return user;
        }
    }
}

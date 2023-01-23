using AutoMapper;
using Microsoft.Extensions.Options;
using System.Text;
using WildBikesApi.Configuration;
using WildBikesApi.DTO.User;
using WildBikesApi.Models;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WildBikesApi.DTO.Booking;

namespace WildBikesApi.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly BikesContext _context;
        private readonly IMapper _mapper;
        private readonly JwtSettings _jwtSettings;

        public UserService(BikesContext context, IMapper mapper, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _mapper = mapper;
            _jwtSettings = jwtSettings.Value;
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
                PasswordHash = hashUnhashString(userRegisterDTO.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            UserReadDTO userReadDTO = _mapper.Map<UserReadDTO>(user);

            return userReadDTO;
        }

        public async Task<bool> VerifyCredentials(UserTokenDTO userTokenDTO)
        {
            string username = userTokenDTO.UserName;
            string passwordHash = hashUnhashString(userTokenDTO.Password);

            User? user = await _context.Users.FirstOrDefaultAsync(i => i.UserName.Equals(username) && i.PasswordHash.Equals(passwordHash));
            
            return user is not null;
        }

        public string GenerateToken(UserTokenDTO userTokenDTO)
        {
            var issuer = _jwtSettings.Issuer;
            var audience = _jwtSettings.Audience;
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, userTokenDTO.UserName),
                    new Claim(JwtRegisteredClaimNames.Email, userTokenDTO.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature
                )
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;
        }

        private string hashUnhashString(string str, bool hash = true)
        {
            if (hash)
            {
                return Convert.ToBase64String(Encoding.UTF8.GetBytes(str));
            }

            return Encoding.UTF8.GetString(Convert.FromBase64String(str));
        }
    }
}

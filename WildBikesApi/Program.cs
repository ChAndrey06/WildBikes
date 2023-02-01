global using Microsoft.EntityFrameworkCore;
global using WildBikesApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WildBikesApi.Configuration;
using WildBikesApi.Configurations;
using WildBikesApi.Services.BookingService;
using WildBikesApi.Services.MailService;
using WildBikesApi.Services.PdfGeneratorService;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WildBikesApi.Services.UserService;
using WildBikesApi.Services.ResourcesService;
using WildBikesApi.Services.TokenService;
using WildBikesApi.Services.ViewRendererService;
using WildBikesApi.Services.PasswordService;
using Microsoft.AspNetCore.Authentication;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Options;
using Microsoft.CodeAnalysis;

string MyAllowSpecificOrigins = "myAllowSpecificOrigins";
string JwtSettingsKey = "JwtSettings";
string MailSettingsKey = "MailSettings";
string ResourcesNamesKey = "Resources";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(o => o.AddPolicy(name: MyAllowSpecificOrigins, policy =>
{
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
}));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    JwtSettings jwtSettings = new JwtSettings();
    builder.Configuration.GetSection(JwtSettingsKey).Bind(jwtSettings);

    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
});
builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition(name: "Bearer", securityScheme: new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter the Bearer Authorization string as following: `Bearer Generated-JWT-Token`",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Name = "Bearer",
                In = ParameterLocation.Header,
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddAutoMapper(typeof(MapperInitializer));

builder.Services.AddScoped<IBookingsService, BookingsService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPdfGeneratorService, PdfGeneratorService>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IResourcesService, ResourcesService>();
builder.Services.AddScoped<IViewRendererService, ViewRendererService>();
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection(MailSettingsKey));
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection(JwtSettingsKey));
builder.Services.Configure<ResourcesNames>(builder.Configuration.GetSection(ResourcesNamesKey));

builder.Services.AddDbContext<BikesContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
    {
        context.Request.Path = "/index.html";
        await next();
    }
});

//app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

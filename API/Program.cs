using System.Text;
using API.Data;
using API.interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//register the DbContext with the connection string from appsettings.json
var connectionString = builder.Configuration
    .GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});

//register the token service
builder.Services.AddScoped<ITokenService, TokenService>();

//Configure Authentication (The Validator)
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // The signing key must match!
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                builder.Configuration["jwt:tokenKey"]!)),

            // Validate the Issuer (who created the token)
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["jwt:issuer"],

            // Validate the Audience (who the token is for)
            ValidateAudience = true,
            ValidAudience = builder.Configuration["jwt:audience"],

            // Validate the Expiration
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

//configure CORS to allow requests from the Angular frontend
var allowedOrigins = builder.Configuration
                .GetSection("allowedOrigins")
                .Get<string[]>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins(allowedOrigins!);
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

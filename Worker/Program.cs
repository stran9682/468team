using Worker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Text;
using Worker.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// TODO Initialize Database with correct connection string.
builder.Services.AddEntityFrameworkNpgsql().AddDbContext<ClothingItemContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<UserContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Set up JWT authentication
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,    // basically make sure the token is valid from key
            IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Secret"]!)),
            ValidateIssuer = false, // i am not caring about where the token is coming from
            ValidateAudience = false,   // i also do not care who is recieving this damn token
            ValidateLifetime = true     // but i do care that it is not expired
        };
    });

// TODO Add Identity services to the container.
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<UserContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<JwtService>();

// TODO Implement CORS functionality for API

// TODO initialize the database

var app = builder.Build();

// Apply migrations to database
using (var scope = app.Services.CreateScope())
{
    var clothingItemContext = scope.ServiceProvider.GetRequiredService<ClothingItemContext>();
    clothingItemContext.Database.Migrate();

    var userContext = scope.ServiceProvider.GetRequiredService<UserContext>();
    userContext.Database.Migrate();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();

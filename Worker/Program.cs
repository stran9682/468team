using Worker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

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

builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddBearerToken();

// TODO Add Identity services to the container.
builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<UserContext>();

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

app.MapIdentityApi<IdentityUser>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();

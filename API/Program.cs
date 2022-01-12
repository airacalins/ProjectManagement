using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<PropertyManagementContext>(opt =>
{
    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

    string connectionString = "";

    // if (env == "Development")
    // {
    //     connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    // }
    // else
    // {
    //     var conUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
    //     conUrl = conUrl!.Replace("postgres://", string.Empty);
    //     var pgUserPass = conUrl.Split("@")[0];
    //     var pgHostPortDb = conUrl.Split("@")[1];
    //     var pgHostPort = pgHostPortDb.Split("/")[0];
    //     var pgDb = pgHostPortDb.Split("/")[1];
    //     var pgUser = pgUserPass.Split(":")[0];
    //     var pgPass = pgUserPass.Split(":")[1];
    //     var pgHost = pgHostPort.Split(":")[0];
    //     var pgPort = pgHostPort.Split(":")[1];

    //     connectionString = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;Trust Server Certificate=true";
    // }

        var conUrl = "postgres://omkvwsofzdvbhh:7c5c1cb0bfc0690196cd7aba21e63ab5571059d38ab6d23b86bb62957100663d@ec2-44-193-150-214.compute-1.amazonaws.com:5432/d52q2bsm0qgqdg";
        conUrl = conUrl!.Replace("postgres://", string.Empty);
        var pgUserPass = conUrl.Split("@")[0];
        var pgHostPortDb = conUrl.Split("@")[1];
        var pgHostPort = pgHostPortDb.Split("/")[0];
        var pgDb = pgHostPortDb.Split("/")[1];
        var pgUser = pgUserPass.Split(":")[0];
        var pgPass = pgUserPass.Split(":")[1];
        var pgHost = pgHostPort.Split(":")[0];
        var pgPort = pgHostPort.Split(":")[1];

        connectionString = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;Trust Server Certificate=true";
    opt.UseNpgsql(connectionString);
});

builder.Services.AddIdentityCore<User>(opt =>
{
    opt.User.RequireUniqueEmail = false;
}).AddRoles<IdentityRole>().AddEntityFrameworkStores<PropertyManagementContext>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(opt => 
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
    };
});

builder.Services.AddAuthorization();
builder.Services.AddCors();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt => 
{
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Jwt auth header",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

builder.Services.Configure<CloudinarySettingsDto>
    (builder.Configuration.GetSection("Cloudinary"));
    
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<PhotoAccessorService>();
builder.Services.AddScoped<PhotoService>();

var app = builder.Build();

await SeedData(app);

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(opt => {
    opt.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
});

app.UseEndpoints(opt => {
    opt.MapControllers();
    opt.MapFallbackToController("Index", "Fallback");
});

app.Run();

async Task SeedData(WebApplication webApplication) {
    using var scope = webApplication.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<PropertyManagementContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        context.Database.Migrate();
        await DbInitializer.Initialize(context, userManager);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Problem migrating data");
    }
}
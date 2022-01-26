using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;
    private readonly PhotoService _photoService;

    public AccountController(UserManager<User> userManager, TokenService tokenService, PhotoService photoService)
    {
      _userManager = userManager;
      _tokenService = tokenService;
      _photoService = photoService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.FindByNameAsync(loginDto.Username);
      if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
        return Unauthorized();


      return new UserDto
      {
        Username = user.UserName,
        Photo = user.Photo?.Url ?? string.Empty,
        Token = await _tokenService.GenerateToken(user)
      };
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
      var user = new User { UserName = registerDto.Email };
      user.IsEnabled = true;
      user.FirstName = registerDto.FirstName;
      user.LastName = registerDto.LastName;
      user.Phone = registerDto.Phone;
      user.Email = registerDto.Email;
      user.Address = registerDto.Address;
      var result = await _userManager.CreateAsync(user, registerDto.Password);

      if (!result.Succeeded)
      {
        foreach (var error in result.Errors)
        {
          ModelState.AddModelError(error.Code, error.Description);
        }

        return ValidationProblem();
      }

      await _userManager.AddToRoleAsync(user, "User");
      return StatusCode(201);
    }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
      var user = await _userManager.FindByNameAsync(User.Identity.Name);
      return new UserDto
      {
        Username = user.UserName,
        Photo = user.Photo?.Url ?? string.Empty,
        Token = await _tokenService.GenerateToken(user)
      };
    }

    [Authorize]
    [HttpPost("setPhoto")]
    public async Task<ActionResult<string>> SetPhoto(IFormFile file)
    {
      var user = await _userManager.FindByNameAsync(User.Identity.Name);
      return await _photoService.UploadUserPhoto(file, user.Id);
    }
  }
}
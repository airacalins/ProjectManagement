using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Enums;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UsersController : ControllerBase
  {
    private readonly PropertyManagementContext _context;
    private readonly UserManager<User> _userManager;
    public UsersController(PropertyManagementContext context, UserManager<User> userManager)
    {
      _context = context;
      _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<List<ApplicationUserDto>>> GetAll()
    {
      var users = await _context.Users.Include(i => i.Photo)
      .Where(i => i.IsEnabled)
      .OrderBy(i => i.UserName)
      .Select(i => new ApplicationUserDto
      {
        Id = i.Id,
        IsEnabled = i.IsEnabled,
        FirstName = i.FirstName,
        LastName = i.LastName,
        Phone = i.Phone,
        Email = i.Email,
        Address = i.Address,
        Username = i.UserName
      }).ToListAsync();

      return Ok(users);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<ApplicationUserDto>> GetOne(string id)
    {
      var user = await _context.Users.Include(i => i.Photo)
      .Where(i => i.IsEnabled)
      .OrderBy(i => i.UserName)
      .Select(i => new ApplicationUserDto
      {
        Id = i.Id,
        IsEnabled = i.IsEnabled,
        FirstName = i.FirstName,
        LastName = i.LastName,
        Phone = i.Phone,
        Email = i.Email,
        Address = i.Address,
        Username = i.UserName
      }).FirstOrDefaultAsync(i => i.Id == id);
      return Ok(user);
    }

    [HttpPost("add-user")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
      var user = new User { UserName = registerDto.Username };
      user.IsEnabled = true;
      user.FirstName = registerDto.FirstName;
      user.LastName = registerDto.LastName;
      user.Phone = registerDto.Phone;
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
      return Ok();
    }

    [HttpPut]
    public async Task<ActionResult<ApplicationUserDto>> Update(ApplicationUserDto input)
    {
      var user = await _context.Users.FindAsync(input.Id);
      if (user == null)
        return NotFound("User not found");

      user.FirstName = input.FirstName;
      user.LastName = input.LastName;
      user.Phone = input.Phone;
      user.Address = input.Address;

      await _context.SaveChangesAsync();

      return Ok(user);
    }

    [HttpPut("update-password")]
    public async Task<ActionResult<ApplicationUserDto>> UpdatePassword(UpdatePasswordDto input)
    {
      var user = await _context.Users.FindAsync(input.Id);
      if (user == null)
        return NotFound("User not found");

      await _userManager.RemovePasswordAsync(user);
      await _userManager.AddPasswordAsync(user, input.password);

      return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSlot(string id)
    {
      var user = await _context.Users.FirstOrDefaultAsync(i => i.Id == id);
      if (user == null)
        return NotFound("User not found");

      user.IsEnabled = false;
      await _context.SaveChangesAsync();

      return Ok();
    }
  }
}
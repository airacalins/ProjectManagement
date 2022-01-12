using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnnouncementsController : ControllerBase
    {
        private readonly PropertyManagementContext _context;
        public AnnouncementsController(PropertyManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Announcement>>> GetTenants()
        {
            var announcements = await _context.Announcements.OrderByDescending(i => i.DateCreated).Take(10).ToListAsync();
            return Ok(announcements);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Announcement>> GetTenant(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            return Ok(announcement);
        }
        
    }
}
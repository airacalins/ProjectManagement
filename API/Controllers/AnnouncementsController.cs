using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
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
        public async Task<ActionResult<List<Announcement>>> GetAnnouncements()
        {
            var announcements = await _context.Announcements.OrderByDescending(i => i.DateCreated).Take(10).ToListAsync();
            return Ok(announcements);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Announcement>> GetAnnouncement(Guid id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            return Ok(announcement);
        }
        
        [HttpPost]
        public async Task<ActionResult<Announcement>> CreateAnnouncement(CreateAnnouncementDto input)
        {
            var announcement = new Announcement
            {
                Title = input.Title,
                Message = input.Message,
                DateCreated = DateTimeOffset.UtcNow,
                IsArchived = false
            };
            
            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();
            return Ok(announcement);
        }
        
        [HttpPut]
        public async Task<ActionResult<Announcement>> UpdateAnnouncement(UpdateAnnouncementDto input)
        {
            var announcement = await _context.Announcements.FindAsync(input.Id);
            if (announcement == null)
                return NotFound("Announcement not found");

            announcement.Title = input.Title;
            announcement.Message = input.Message;

            await _context.SaveChangesAsync();

            return Ok(announcement);
        }

        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAnnouncement(Guid id)
        {
            var announcement = await _context.Announcements.FirstOrDefaultAsync(i => i.Id == id);
            if (announcement == null)
                return NotFound("Announcement not found");            
                      
            _context.Announcements.Remove(announcement);
            await _context.SaveChangesAsync();

            return Ok();
        }
        
    }
}
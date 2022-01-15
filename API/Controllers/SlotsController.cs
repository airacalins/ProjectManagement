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
    public class SlotsController : ControllerBase
    {
        private readonly PropertyManagementContext _context;
        public SlotsController(PropertyManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<UnitDto>>> GetSlots()
        {
            var units = await _context.Units.Include(i => i.UnitPrices).Include(i => i.UnitPhotos).ThenInclude(p => p.Photo).ToListAsync();
            var result = units.Select(i => new UnitDto
            {
                Id = i.Id,
                SlotNumber = i.Code,
                Size = i.Size,
                RentalFee = i.UnitPrices != null && i.UnitPrices.Any() ? i.UnitPrices.OrderByDescending(p => p.DateImplemented).FirstOrDefault()!.Price.ToString() : "N/A",
                Status = i.SlotStatus.ToString()
            });
            return Ok(result);
        }
        
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Enums;
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
            var units = await _context.Units.Include(i => i.UnitPhotos).ThenInclude(p => p.Photo)
            .Select(i => new UnitDto
            {
                Id = i.Id,
                SlotNumber = i.SlotNumber,
                Size = i.Size,
                Price = i.Price,
                Status = i.SlotStatus
            }).ToListAsync();

            return Ok(units);
        }
        
        
        [HttpGet("{id}")]
        public async Task<ActionResult<UnitDto>> GetSlot(Guid id)
        {
            var unit = await _context.Units.Include(i => i.UnitPhotos).ThenInclude(p => p.Photo)
            .Select(i => new UnitDto
            {
                Id = i.Id,
                SlotNumber = i.SlotNumber,
                Size = i.Size,
                Price = i.Price,
                Status = i.SlotStatus
            }).FirstOrDefaultAsync(i => i.Id == id);
            return Ok(unit);
        }

        [HttpPost]
        public async Task<ActionResult<UnitDto>> AddSlot(CreateUnitDto input)
        {
            var unit = new Unit{
                SlotNumber = input.SlotNumber,
                Size = input.Size,
                Price = input.Price,
                SlotStatus = SlotStatus.Available
            };
            _context.Units.Add(unit);
            await _context.SaveChangesAsync();

            return Ok(unit);
        }

        [HttpPut]
        public async Task<ActionResult<UnitDto>> UpdateSlot(UnitDto input)
        {
            var unit = await _context.Units.FindAsync(input.Id);
            if (unit == null)
                return NotFound("Slot not found");

            unit.SlotNumber = input.SlotNumber;
            unit.Size = input.Size;
            unit.Price = input.Price;
            unit.SlotStatus = unit.SlotStatus == SlotStatus.Rented ? SlotStatus.Rented : input.Status;

            await _context.SaveChangesAsync();

            return Ok(unit);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSlot(Guid id)
        {
            var unit = await _context.Units.Include(i => i.TenantContracts).FirstOrDefaultAsync(i => i.Id == id);
            if (unit == null)
                return NotFound("Slot not found");            
            
            if (unit.SlotStatus == SlotStatus.Rented || unit.SlotStatus == SlotStatus.Reserved)
                return NotFound("Can't delete rented or reserved slots");
                      
            _context.Units.Remove(unit);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
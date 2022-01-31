using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly PropertyManagementContext _context;
        public ReportsController(PropertyManagementContext context)
        {
            _context = context;
        }

        // [HttpGet("income")]
        // public async Task<ActionResult<List<UnitDto>>> GetIncome()
        // {
        //     var units = await _context.Units.Include(i => i.UnitPhotos).ThenInclude(p => p.Photo)
        //     .Select(i => new UnitDto
        //     {
        //         Id = i.Id,
        //         SlotNumber = i.SlotNumber,
        //         Size = i.Size,
        //         Price = i.Price,
        //         Status = i.SlotStatus
        //     }).ToListAsync();

        //     return Ok(units);
        // }
        
    }
}
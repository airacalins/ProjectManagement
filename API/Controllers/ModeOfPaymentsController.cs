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
    public class ModeOfPaymentsController : ControllerBase
    {
        private readonly PropertyManagementContext _context;
        public ModeOfPaymentsController(PropertyManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ModeOfPayment>>> GetModeOfPayments()
        {
            var modeOfPayments = await _context.ModeOfPayments.ToListAsync();
            return Ok(modeOfPayments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ModeOfPayment>> GetModeOfPayment(Guid id)
        {
            var modeOfPayment = await _context.ModeOfPayments.FindAsync(id);
            return Ok(modeOfPayment);
        }
        
    }
}
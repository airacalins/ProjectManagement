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
            var modeOfPayments = await _context.ModeOfPayments.Where(i => !i.IsArchived).ToListAsync();
            return Ok(modeOfPayments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ModeOfPayment>> GetModeOfPayment(Guid id)
        {
            var modeOfPayment = await _context.ModeOfPayments.FindAsync(id);
            return Ok(modeOfPayment);
        }
        
        

        [HttpPost]
        public async Task<ActionResult<ModeOfPayment>> Create(CreateModeOfPaymentDto input)
        {
            var newModeOfPayment = new ModeOfPayment
            {
                AccountName = input.AccountName,
                AccountNumber = input.AccountNumber,
                BankName = input.BankName,
                IsArchived = false
            };
            
            _context.ModeOfPayments.Add(newModeOfPayment);
            await _context.SaveChangesAsync();
            return Ok(newModeOfPayment);
        }
        
        [HttpPut]
        public async Task<ActionResult<ModeOfPayment>> Update(UpdateModeOfPaymentDto input)
        {
            var modeOfPayment = await _context.ModeOfPayments.FindAsync(input.Id);
            if (modeOfPayment == null)
                return NotFound("Mode of payment not found");

            modeOfPayment.BankName = input.BankName;
            modeOfPayment.AccountName = input.AccountName;
            modeOfPayment.AccountNumber = input.AccountName;

            await _context.SaveChangesAsync();

            return Ok(modeOfPayment);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var modeOfPayment = await _context.ModeOfPayments.FirstOrDefaultAsync(i => i.Id == id);
            if (modeOfPayment == null)
                return NotFound("Mode of payment not found");      

            modeOfPayment.IsArchived = true;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
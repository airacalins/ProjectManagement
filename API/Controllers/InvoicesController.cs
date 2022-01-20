using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase
    {
        
        private readonly PropertyManagementContext _context;
        public InvoicesController(PropertyManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<InvoiceDto>>> Get()
        {
            var invoices = await _context.Invoices
            .Include(i => i.InvoiceItems)
            .Include(i => i.Tenant)
            .Include(i => i.TenantContract)
            .Include(i => i.Unit)
            .Include(i => i.Payments)
            .Select(i => new InvoiceDto
            {
                Id = i.Id,
                SlotNumber = i.Unit.SlotNumber,
                TenantId = i.TenantId,
                FirstName = i.Tenant.FirstName,
                LastName = i.Tenant.LastName,
                Phone = i.Tenant.Phone,
                BusinessName = i.Tenant.BusinessName,
                Amount = i.InvoiceItems.Sum(s => s.Amount),
                Payments = i.Payments.Select(p => new InvoicePaymentDto
                {
                    Id = p.Id,
                    Status = p.Status,
                    BankName = p.ModeOfPayment != null ? p.ModeOfPayment.BankName : string.Empty,
                    AccountName = p.ModeOfPayment != null ? p.ModeOfPayment.AccountName : string.Empty,
                    AccountNumber = p.ModeOfPayment != null ? p.ModeOfPayment.AccountNumber : string.Empty,
                    DateCreated = p.DateCreated
                }),
                DateCreated = i.DateCreated,
                DueDate = i.DueDate
            }).ToListAsync();

            return Ok(invoices);
        }
        
        
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDto>> GetOne(Guid id)
        {
            
            var invoice = await _context.Invoices
            .Include(i => i.InvoiceItems)
            .Include(i => i.Tenant)
            .Include(i => i.TenantContract)
            .Include(i => i.Unit)
            .Include(i => i.Payments)
            .Where(i => i.Id == id)
            .Select(i => new InvoiceDto
            {
                Id = i.Id,
                SlotNumber = i.Unit.SlotNumber,
                TenantId = i.TenantId,
                FirstName = i.Tenant.FirstName,
                LastName = i.Tenant.LastName,
                Phone = i.Tenant.Phone,
                BusinessName = i.Tenant.BusinessName,
                Amount = i.InvoiceItems.Sum(s => s.Amount),
                Payments = i.Payments.Select(p => new InvoicePaymentDto
                {
                    Id = p.Id,
                    Status = p.Status,
                    BankName = p.ModeOfPayment != null ? p.ModeOfPayment.BankName : string.Empty,
                    AccountName = p.ModeOfPayment != null ? p.ModeOfPayment.AccountName : string.Empty,
                    AccountNumber = p.ModeOfPayment != null ? p.ModeOfPayment.AccountNumber : string.Empty,
                    DateCreated = p.DateCreated
                }),
                DateCreated = i.DateCreated,
                DueDate = i.DueDate
            }).FirstOrDefaultAsync();
            return Ok(invoice);
        }
    }
}
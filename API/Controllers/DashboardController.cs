using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly PropertyManagementContext _context;
        public DashboardController(PropertyManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<DashboardDto>>> GetModeOfPayments()
        {
            var slots = await _context.Units.Where(i => i.SlotStatus != SlotStatus.Archived).ToListAsync();
            var availableSlots = slots.Where(i => i.SlotStatus == SlotStatus.Available).Count();
            var rentedSlots = slots.Where(i => i.SlotStatus == SlotStatus.Rented).Count();
            var tenants = await _context.TenantContracts.Where(i => i.Status == TenantContractStatus.Active).CountAsync();
            var invoices = await _context.Invoices.Where(i => i.InvoiceStatus != InvoiceStatus.Paid).ToListAsync();
            var latePayments = invoices.Where(i => i.InvoiceStatus != InvoiceStatus.Pending).Where(i => i.DueDate <= DateTimeOffset.UtcNow).Count();
            var pending = invoices.Where(i => i.InvoiceStatus == InvoiceStatus.Pending).Count();

            var dashboardData = new DashboardDto
            {
                Slots = slots.Count(),
                AvailableSlots = availableSlots,
                RentedSlots = rentedSlots,
                Tenants = tenants,
                UnpaidInvoices = invoices.Count(),
                LatePayments = latePayments,
                PendingPayments = pending
            };

            return Ok(dashboardData);
        }

    }
}
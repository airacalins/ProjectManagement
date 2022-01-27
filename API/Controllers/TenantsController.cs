using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Enums;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TenantsController : ControllerBase
  {
    private readonly PropertyManagementContext _context;
    private readonly RandomStringService _randomStringService;
    public TenantsController(PropertyManagementContext context, RandomStringService randomStringService)
    {
      _randomStringService = randomStringService;
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Tenant>>> GetTenants()
    {
      var tenants = await _context.Tenants.ToListAsync();
      return Ok(tenants);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Tenant>> GetTenant(Guid id)
    {
      var tenant = await _context.Tenants.FindAsync(id);
      return Ok(tenant);
    }


    [HttpPost]
    public async Task<ActionResult<Tenant>> AddTenant(CreateTenantDto input)
    {
      var unit = await _context.Units.FindAsync(input.SlotId);

      if (unit == null)
      {
        return NotFound("Unit not found.");
      }

      var isValidTenantUniqueId = false;
      var tenantUniqueId = string.Empty;
      while(!isValidTenantUniqueId)
      {
        tenantUniqueId = _randomStringService.GetRandomString().ToUpper();
        isValidTenantUniqueId = !(await _context.Tenants.AnyAsync(i => i.TenantUniqueId == tenantUniqueId));
      }

      var tenant = new Tenant
      {
        FirstName = input.FirstName,
        LastName = input.LastName,
        Phone = input.Contact,
        BusinessName = input.BusinessName ?? string.Empty,
        DateCreated = DateTimeOffset.UtcNow,
        TenantUniqueId = tenantUniqueId,
        Address = input.Address
      };
      _context.Tenants.Add(tenant);
      await _context.SaveChangesAsync();

      var newContract = new TenantContract
      {
        TenantId = tenant.Id,
        UnitId = input.SlotId,
        StartDate = input.StartDate.ToUniversalTime(),
        NextPaymentDate = input.StartDate.AddMonths(1).ToUniversalTime(),
        EndDate = input.EndDate.ToUniversalTime(),
        Status = TenantContractStatus.Active,
        Price = unit.Price,
        NumberOfDeposit = 1
      };

      _context.TenantContracts.Add(newContract);
      await _context.SaveChangesAsync();

      var invoice = new Invoice
        {
          TenantId = newContract.TenantId,
          TenantContractId = newContract.Id,
          UnitId = newContract.UnitId,
          DateCreated = DateTimeOffset.UtcNow,
          DueDate = newContract.NextPaymentDate
        };

        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();

        var invoiceItem = new InvoiceItem
        {
          InvoiceId = invoice.Id,
          Description = "Rental Fee",
          Amount = newContract.Price
        };

        var depositInvoiceItem = new InvoiceItem
        {
          InvoiceId = invoice.Id,
          Description = "Deposit Fee",
          Amount = newContract.Price
        };

        _context.InvoiceItems.Add(invoiceItem);
        _context.InvoiceItems.Add(depositInvoiceItem);
        await _context.SaveChangesAsync();

      return Ok(tenant);
    }
  }
}
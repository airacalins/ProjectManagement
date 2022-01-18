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
  public class TenantsController : ControllerBase
  {
    private readonly PropertyManagementContext _context;
    public TenantsController(PropertyManagementContext context)
    {
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
      var tenant = new Tenant
      {
        FirstName = input.FirstName,
        LastName = input.LastName,
        Phone = input.Contact,
        BusinessName = input.CompanyName ?? string.Empty,
        DateCreated = DateTimeOffset.UtcNow
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

      return Ok(tenant);
    }
  }
}
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
    private readonly PhotoService _photoService;
    public TenantsController(PropertyManagementContext context, RandomStringService randomStringService, PhotoService photoService)
    {
      _randomStringService = randomStringService;
      _context = context;
      _photoService = photoService;
    }

    [HttpGet]
    public async Task<ActionResult<List<TenantDto>>> GetTenants()
    {
      var tenants = await _context.Tenants.Include(i => i.TenantContracts).ThenInclude(i => i.Unit)
      .ToListAsync();

      var result = tenants.OrderBy(i => i.FirstName).Select(i => new TenantDto
      {
        Id = i.Id,
        FirstName = i.FirstName,
        LastName = i.LastName,
        Phone = i.Phone,
        BusinessName = i.BusinessName,
        DateCreated = i.DateCreated,
        Address = i.Address,
        TenantUniqueId = i.TenantUniqueId,
        IsActive = i.TenantContracts.Any(i => i.Status == TenantContractStatus.Active),
        Contract = i.TenantContracts != null && i.TenantContracts.Count() > 0 ? 
          i.TenantContracts.Select(t => new SlotContractDto
          {
            Id = t.Id,
            SlotId = t.UnitId,
            SlotNumber = t.Unit.SlotNumber,
            Size = t.Unit.Size,
            Price = t.Unit.Price,
            StartDate = t.StartDate,
            EndDate = t.EndDate,
            NextBillingDate = t.NextPaymentDate,
            Status = t.Status,
          }).FirstOrDefault() : null
      });
      return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TenantDto>> GetTenant(Guid id)
    {
      var tenants = await _context.Tenants.Include(i => i.TenantContracts).ThenInclude(i => i.Unit)
      .ToListAsync();

      var tenantsDto = tenants.Select(i => new TenantDto
      {
        Id = i.Id,
        FirstName = i.FirstName,
        LastName = i.LastName,
        Phone = i.Phone,
        BusinessName = i.BusinessName,
        DateCreated = i.DateCreated,
        Address = i.Address,
        TenantUniqueId = i.TenantUniqueId,
        IsActive = i.TenantContracts.Any(i => i.Status == TenantContractStatus.Active),
        Contract = i.TenantContracts != null && i.TenantContracts.Count() > 0 ? 
          i.TenantContracts.Select(t => new SlotContractDto
          {
            Id = t.Id,
            SlotId = t.UnitId,
            SlotNumber = t.Unit.SlotNumber,
            Size = t.Unit.Size,
            Price = t.Unit.Price,
            StartDate = t.StartDate,
            EndDate = t.EndDate,
            NextBillingDate = t.NextPaymentDate,
            Status = t.Status
          }).FirstOrDefault() : null
      });

      var tenant = tenantsDto.FirstOrDefault(i => i.Id == id);
      return Ok(tenant);
    }


    [HttpPost]
    public async Task<ActionResult> AddTenant(CreateTenantDto input)
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

      unit.SlotStatus = SlotStatus.Rented;
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

      return Ok();
    }

    
    [HttpPut]
    public async Task<ActionResult> UpdateTenant(UpdateTenantDto input)
    {
      var tenant = await _context.Tenants.FindAsync(input.Id);

      if (tenant == null)
      {
        return NotFound("Tenant not found.");
      }
      
        tenant.FirstName = input.FirstName;
        tenant.LastName = input.LastName;
        tenant.Phone = input.Contact;
        tenant.BusinessName = input.BusinessName ?? string.Empty;
        tenant.Address = input.Address;
        
      await _context.SaveChangesAsync();
      return Ok();
    }

    [HttpPut("update-tenant-contract")]
    public async Task<ActionResult> UpdateTenantContract(UpdateTenantContractDto input)
    {
      var tenantContract = await _context.TenantContracts.FindAsync(input.Id);

      if (tenantContract == null)
      {
        return NotFound("Tenant contract not found.");
      }

      tenantContract.EndDate = input.EndDate;
        
      await _context.SaveChangesAsync();

      return Ok();
    }

    [HttpPost("upload-contract-photo")]
    public async Task<ActionResult> UploadTenantContractPhoto([FromForm] TenantContractPhotoDto input)
    {
      var tenantContract = await _context.TenantContracts.FindAsync(input.Id);

      if (tenantContract == null)
      {
        return NotFound("Tenant contract not found.");
      }

      var photo = await _photoService.UploadPhoto(input.File);
      _context.TenantContractPhotos.Add(new TenantContractPhoto {
        PhotoId = photo.Id,
        TenantContractId = tenantContract.Id
      });
        
      await _context.SaveChangesAsync();

      return Ok();
    }

    [HttpGet("get-contract-photo/{id}")]
    public async Task<ActionResult<List<TenantContractImagesDto>>> GetTenantContractPhoto(Guid id)
    {
      var tenantContract = await _context.TenantContracts.FindAsync(id);

      if (tenantContract == null)
      {
        return NotFound("Tenant contract not found.");
      }
      var result = await _context.TenantContractPhotos.Include(i => i.Photo).Where(i => i.TenantContractId == id)
      .Select(i => new TenantContractImagesDto
      {
        Id = i.Id,
        Url = i.Photo.Url
      })
      .ToListAsync();
      return Ok(result);
    }

    [HttpDelete("terminate-contract/{id}")]
    public async Task<ActionResult> Terminate(Guid id)
    {
      var tenant = await _context.Tenants.FindAsync(id);

      if (tenant == null)
      {
        return NotFound("Tenant not found.");
      }
        
      await _context.SaveChangesAsync();

      var tenantContract = await _context.TenantContracts.FirstOrDefaultAsync(i => i.TenantId == id);

      if (tenantContract != null)
      {
        tenantContract.EndDate = DateTimeOffset.UtcNow;
        tenantContract.Status = TenantContractStatus.Terminated;
        await _context.SaveChangesAsync();
      }

      return Ok();
    }
  }
}
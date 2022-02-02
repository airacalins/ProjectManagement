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
  public class InvoicesController : ControllerBase
  {
    private readonly PhotoService _photoService;

    private readonly PropertyManagementContext _context;
    private readonly RandomStringService _randomStringService;
    public InvoicesController(PropertyManagementContext context, RandomStringService randomStringService, PhotoService photoService)
    {
      _context = context;
      _randomStringService = randomStringService;
      _photoService = photoService;
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
      .ThenInclude(i => i.Photo)
      .OrderByDescending(i => i.DateCreated)
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
        InvoiceNumber = i.InvoiceNumber,
        InvoiceStatus = i.InvoiceStatus,
        TenantUniqueId = i.Tenant.TenantUniqueId,
        Payments = i.Payments.Select(p => new InvoicePaymentDto
        {
          Id = p.Id,
          Status = p.Status,
          BankName = p.ModeOfPayment != null ? p.ModeOfPayment.BankName : string.Empty,
          AccountName = p.ModeOfPayment != null ? p.ModeOfPayment.AccountName : string.Empty,
          AccountNumber = p.ModeOfPayment != null ? p.ModeOfPayment.AccountNumber : string.Empty,
          DateCreated = p.DateCreated,
          Amount = p.Amount,
          ReferenceNumber = p.ReferenceNumber,
          ImageUrl = p.Photo.Url
        }),
        InvoiceItems = i.InvoiceItems.Select(j => new InvoiceItemDto
        {
          Id = j.Id,
          Amount = j.Amount,
          Description = j.Description
        }),
        DateCreated = i.DateCreated,
        DueDate = i.DueDate
      }).ToListAsync();

      return Ok(invoices);
    }

    [HttpGet("get-tenant-invoice-by-account-number/{id}")]
    public async Task<ActionResult<List<InvoiceDto>>> Get(string id)
    {
      var invoices = await _context.Invoices
      .Include(i => i.InvoiceItems)
      .Include(i => i.Tenant)
      .Include(i => i.TenantContract)
      .Include(i => i.Unit)
      .Include(i => i.Payments)
      .ThenInclude(i => i.Photo)
      .OrderByDescending(i => i.DateCreated)
      .Select(i => new InvoiceDto
      {
        Id = i.Id,
        SlotNumber = i.Unit.SlotNumber,
        TenantId = i.TenantId,
        FirstName = i.Tenant.FirstName,
        LastName = i.Tenant.LastName,
        TenantUniqueId = i.Tenant.TenantUniqueId,
        Phone = i.Tenant.Phone,
        BusinessName = i.Tenant.BusinessName,
        Amount = i.InvoiceItems.Sum(s => s.Amount),
        InvoiceNumber = i.InvoiceNumber,
        InvoiceStatus = i.InvoiceStatus,
        Payments = i.Payments.Select(p => new InvoicePaymentDto
        {
          Id = p.Id,
          Status = p.Status,
          BankName = p.ModeOfPayment != null ? p.ModeOfPayment.BankName : string.Empty,
          AccountName = p.ModeOfPayment != null ? p.ModeOfPayment.AccountName : string.Empty,
          AccountNumber = p.ModeOfPayment != null ? p.ModeOfPayment.AccountNumber : string.Empty,
          DateCreated = p.DateCreated,
          Amount = p.Amount,
          ReferenceNumber = p.ReferenceNumber,
          ImageUrl = p.Photo.Url
        }),
        InvoiceItems = i.InvoiceItems.Select(j => new InvoiceItemDto
        {
          Id = j.Id,
          Amount = j.Amount,
          Description = j.Description
        }),
        DateCreated = i.DateCreated,
        DueDate = i.DueDate
      }).Where(i => i.TenantUniqueId.ToLower() == id.ToLower()).ToListAsync();

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
      .ThenInclude(i => i.Photo)
      .Where(i => i.Id == id)
      .OrderByDescending(i => i.DateCreated)
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
        InvoiceNumber = i.InvoiceNumber,
        InvoiceStatus = i.InvoiceStatus,
        TenantUniqueId = i.Tenant.TenantUniqueId,
        Payments = i.Payments.Select(p => new InvoicePaymentDto
        {
          Id = p.Id,
          Status = p.Status,
          BankName = p.ModeOfPayment != null ? p.ModeOfPayment.BankName : string.Empty,
          AccountName = p.ModeOfPayment != null ? p.ModeOfPayment.AccountName : string.Empty,
          AccountNumber = p.ModeOfPayment != null ? p.ModeOfPayment.AccountNumber : string.Empty,
          DateCreated = p.DateCreated,
          Amount = p.Amount,
          ReferenceNumber = p.ReferenceNumber,
          ImageUrl = p.Photo.Url

        }),
        InvoiceItems = i.InvoiceItems.Select(j => new InvoiceItemDto
        {
          Id = j.Id,
          Amount = j.Amount,
          Description = j.Description
        }),
        DateCreated = i.DateCreated,
        DueDate = i.DueDate
      }).FirstOrDefaultAsync();
      return Ok(invoice);
    }

    [HttpPut("update-payment-status")]
    public async Task<ActionResult> UpdatePaymentStatus(UpdateInvoicePaymentDto input)
    {
      var payment = await _context.Payments.FindAsync(input.Id);
      if (payment == null)
        return NotFound("Payment not found");

      payment.Status = input.IsApproved ? PaymentStatus.Approved : PaymentStatus.Declined;

      await _context.SaveChangesAsync();

      var invoice = await _context.Invoices.FindAsync(payment.InvoiceId);

      var totalPayments = await _context.Payments.Where(i => i.InvoiceId == payment.InvoiceId)
      .Where(i => i.Status == PaymentStatus.Approved)
      .SumAsync(i => i.Amount);

      var amountToPay = await _context.InvoiceItems.Where(i => i.InvoiceId == payment.InvoiceId)
      .SumAsync(i => i.Amount);
    
      if (totalPayments > 0) {
        invoice.InvoiceStatus = totalPayments >= amountToPay ? InvoiceStatus.Paid : InvoiceStatus.PartiallyPaid;
      }
      else 
      {
        invoice.InvoiceStatus = InvoiceStatus.Unpaid;
      }

      return Ok();
    }

    [HttpPost("payment")]
    public async Task<ActionResult> Payment([FromForm]CreatePaymentDto input)
    {
      var isValidUniqueId = false;
      var uniqueId = string.Empty;
      while (!isValidUniqueId)
      {
        uniqueId = _randomStringService.GetRandomString(6).ToUpper();
        isValidUniqueId = !(await _context.Invoices.AnyAsync(i => i.InvoiceNumber == uniqueId));
      }
      var invoice = await _context.Invoices
      .Where(i => i.Id == input.InvoiceId)
      .FirstOrDefaultAsync();
      if (invoice == null)
        return NotFound("Invoice not found");

      invoice.InvoiceStatus = InvoiceStatus.Pending;
      await _context.SaveChangesAsync();

      // var photo = await _photoService.UploadPhoto(input.File);
      var photo = await _photoService.UploadPhotoFromBase64(input.File);
      var payment = new Payment
      {
        TenantId = invoice.TenantId,
        InvoiceId = invoice.Id,
        UnitId = invoice.UnitId,
        Status = PaymentStatus.Pending,
        ModeOfPaymentId = input.ModeOfPaymentId,
        DateCreated = DateTimeOffset.UtcNow,
        PhotoId = photo.Id,
        Amount = input.Amount,
        ReferenceNumber = uniqueId
      };

      _context.Payments.Add(payment);
      await _context.SaveChangesAsync();

      return Ok();
    }
  }
}
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

    private readonly PropertyManagementContext _context;
    private readonly RandomStringService _randomStringService;
    public InvoicesController(PropertyManagementContext context, RandomStringService randomStringService)
    {
      _context = context;
      _randomStringService = randomStringService;
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
        Payments = i.Payments.Select(p => new InvoicePaymentDto
        {
          Id = p.Id,
          Status = p.Status,
          BankName = p.ModeOfPayment != null ? p.ModeOfPayment.BankName : string.Empty,
          AccountName = p.ModeOfPayment != null ? p.ModeOfPayment.AccountName : string.Empty,
          AccountNumber = p.ModeOfPayment != null ? p.ModeOfPayment.AccountNumber : string.Empty,
          DateCreated = p.DateCreated,
          Amount = p.Amount,
          ReferenceNumber = p.ReferenceNumber
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
        Payments = i.Payments.Select(p => new InvoicePaymentDto
        {
          Id = p.Id,
          Status = p.Status,
          BankName = p.ModeOfPayment != null ? p.ModeOfPayment.BankName : string.Empty,
          AccountName = p.ModeOfPayment != null ? p.ModeOfPayment.AccountName : string.Empty,
          AccountNumber = p.ModeOfPayment != null ? p.ModeOfPayment.AccountNumber : string.Empty,
          DateCreated = p.DateCreated,
          Amount = p.Amount,
          ReferenceNumber = p.ReferenceNumber
        }),
        DateCreated = i.DateCreated,
        DueDate = i.DueDate
      }).FirstOrDefaultAsync();
      return Ok(invoice);
    }

    [HttpPut("update-payment-status")]
    public async Task<ActionResult<InvoiceDto>> UpdatePaymentStatus(UpdateInvoicePaymentDto input)
    {
      var payment = await _context.Payments.FindAsync(input.Id);
      if (payment == null)
        return NotFound("Payment not found");

      payment.Status = input.IsApproved ? PaymentStatus.Approved : PaymentStatus.Declined;

      await _context.SaveChangesAsync();

      var invoice = await _context.Invoices
      .Include(i => i.InvoiceItems)
      .Include(i => i.Tenant)
      .Include(i => i.TenantContract)
      .Include(i => i.Unit)
      .Include(i => i.Payments)
      .Where(i => i.Id == payment.InvoiceId)
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
        Payments = i.Payments.Select(p => new InvoicePaymentDto
        {
          Id = p.Id,
          Status = p.Status,
          BankName = p.ModeOfPayment != null ? p.ModeOfPayment.BankName : string.Empty,
          AccountName = p.ModeOfPayment != null ? p.ModeOfPayment.AccountName : string.Empty,
          AccountNumber = p.ModeOfPayment != null ? p.ModeOfPayment.AccountNumber : string.Empty,
          DateCreated = p.DateCreated,
          Amount = p.Amount,
          ReferenceNumber = p.ReferenceNumber
        }),
        DateCreated = i.DateCreated,
        DueDate = i.DueDate
      }).FirstOrDefaultAsync();
      return Ok(invoice);
    }

    [HttpPost("payment")]
    public async Task<ActionResult> Payment(CreatePaymentDto input)
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

      var payment = new Payment
      {
        TenantId = invoice.TenantId,
        InvoiceId = invoice.Id,
        UnitId = invoice.UnitId,
        Status = PaymentStatus.Pending,
        ModeOfPaymentId = input.ModeOfPaymentId,
        DateCreated = DateTimeOffset.UtcNow,
        PhotoId = input.PhotoId,
        Amount = input.Amount,
        ReferenceNumber = uniqueId
      };

      _context.Payments.Add(payment);
      await _context.SaveChangesAsync();

      return Ok();
    }
  }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Enums;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
  public class InvoiceService
  {
    private readonly RandomStringService _randomStringService;

    private readonly PropertyManagementContext _context;
    public InvoiceService(PropertyManagementContext context, RandomStringService randomStringService)
    {
      _randomStringService = randomStringService;
      _context = context;
    }

    public async Task GenerateInvoice()
    {
      var invoiceDate = DateTimeOffset.UtcNow.AddDays(-5);
      var contracts = await _context.TenantContracts
      .Include(i => i.Tenant)
      .Where(i => i.Status == TenantContractStatus.Active)
      .Where(i => i.NextPaymentDate < invoiceDate).ToListAsync();

      foreach (var contract in contracts)
      {
        var isValidUniqueId = false;
        var uniqueId = string.Empty;
        var lastInvoice = await _context.Invoices.Include(i => i.InvoiceItems).OrderByDescending(i => i.DateCreated)
        .Where(i => i.TenantContractId == contract.Id).FirstOrDefaultAsync();

        while (!isValidUniqueId)
        {
          uniqueId = _randomStringService.GetRandomString(6).ToUpper();
          isValidUniqueId = !(await _context.Invoices.AnyAsync(i => i.InvoiceNumber == uniqueId));
        }
        var invoice = new Invoice
        {
          TenantId = contract.TenantId,
          TenantContractId = contract.Id,
          UnitId = contract.UnitId,
          DateCreated = DateTimeOffset.UtcNow,
          DueDate = contract.NextPaymentDate,
          InvoiceNumber = uniqueId
        };

        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();

        var invoiceItem = new InvoiceItem
        {
          InvoiceId = invoice.Id,
          Description = "Rental Fee",
          Amount = contract.Price
        };

        _context.InvoiceItems.Add(invoiceItem);
        await _context.SaveChangesAsync();

        if (lastInvoice != null)
        {
          if (lastInvoice.LastPaymentDate != null)
          {
            if (lastInvoice.LastPaymentDate > lastInvoice.DueDate)
            {
              var lateDays = lastInvoice.LastPaymentDate.Value.Subtract(lastInvoice.DueDate).Days;
              var latePenalty = lateDays < 60 ? 0.03 : 0.08;
              var latePenaltyPayment = new InvoiceItem
              {
                InvoiceId = invoice.Id,
                Description = lateDays < 60 ? $"Late Payment Fee (5%)" : $"Late Payment Fee (8%)",
                Amount = contract.Price + (contract.Price * latePenalty)
              };
              _context.InvoiceItems.Add(latePenaltyPayment);
              await _context.SaveChangesAsync();
            }
          }
          if (lastInvoice.LastPaymentDate == null && lastInvoice.DueDate < DateTimeOffset.UtcNow)
          {
            var lateDays = DateTimeOffset.UtcNow.Subtract(lastInvoice.DueDate).Days;
            var latePenalty = lateDays < 60 ? 0.03 : 0.08;
            var latePenaltyPayment = new InvoiceItem
            {
              InvoiceId = invoice.Id,
              Description = lateDays < 60 ? $"Late Payment Fee (5%)" : $"Late Payment Fee (8%)",
              Amount = contract.Price + (contract.Price * latePenalty)
            };
            _context.InvoiceItems.Add(latePenaltyPayment);
            await _context.SaveChangesAsync();

          }
        }


        var nextBillDate = contract.NextPaymentDate.AddMonths(1);
        if (nextBillDate > contract.EndDate)
        {
          contract.Status = TenantContractStatus.Expired;
        }
        else
        {
          contract.NextPaymentDate = nextBillDate;
        }

        await _context.SaveChangesAsync();
      }
    }
  }
}
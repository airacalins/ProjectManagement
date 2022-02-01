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
        while(!isValidUniqueId)
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
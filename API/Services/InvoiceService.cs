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

    private readonly PropertyManagementContext _context;
    public InvoiceService(PropertyManagementContext context)
    {
      _context = context;
    }

    public async Task GenerateInvoice()
    {
      var contracts = await _context.TenantContracts
      .Include(i => i.Tenant)
      .Where(i => i.NextPaymentDate < DateTimeOffset.UtcNow).ToListAsync();

      foreach (var contract in contracts)
      {
        var invoice = new Invoice
        {
          TenantId = contract.TenantId,
          TenantContractId = contract.Id,
          UnitId = contract.UnitId,
          DateCreated = DateTimeOffset.UtcNow,
          DueDate = contract.NextPaymentDate
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

        contract.NextPaymentDate = contract.NextPaymentDate.AddMonths(1);
        await _context.SaveChangesAsync();
      }
    }
  }
}
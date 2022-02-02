using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ReportsController : ControllerBase
  {
    private readonly PropertyManagementContext _context;
    public ReportsController(PropertyManagementContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ReportDto>> GetIncome(ReportType? reportType, DateTimeOffset? date)
    {
      var invoices = await _context.Invoices.Include(i => i.InvoiceItems).ToListAsync();
      if(date == null || reportType == null) {
          return GenerateReport(invoices);
      }
      if (reportType == ReportType.Daily)
      {
        var today = date != null ? date.Value.Date : DateTimeOffset.UtcNow.Date;
        var dailyInvoices = invoices.Where(i => i.DateCreated.Date == today).ToList();
        return GenerateReport(dailyInvoices);
      }

      if (reportType == ReportType.Weekly)
      {
        var weekDates = GetWeekDates(date.Value);
        var weeklyInvoices = invoices.Where(i => weekDates[0].Date >= i.DateCreated.Date && i.DateCreated.Date <= weekDates[6].Date).ToList();
        return GenerateReport(weeklyInvoices);
      }

      if (reportType == ReportType.Monthly)
      {
        var dateTimeFirstDayOfMonth = new DateTime(date.Value.Year, date.Value.Month, 1);
        var firstDayOfMonth = new DateTimeOffset(dateTimeFirstDayOfMonth);
        var lastDayOfMonth = new DateTimeOffset(dateTimeFirstDayOfMonth.AddMonths(1).AddDays(-1));
        var monthlyInvoices = invoices.Where(i => firstDayOfMonth.Date >= i.DateCreated.Date && i.DateCreated.Date <= lastDayOfMonth.Date).ToList();
        return GenerateReport(monthlyInvoices);
      }

      if (reportType == ReportType.Monthly)
      {
        var dateTimeFirstDayOfYear = new DateTime(date.Value.Year, 1, 1);
        var firstDayOfYear = new DateTimeOffset(dateTimeFirstDayOfYear);
        var lastDayOfYear = new DateTimeOffset(new DateTime(date.Value.Year, 12, 31));
        var yearlyInvoices = invoices.Where(i => firstDayOfYear.Date >= i.DateCreated.Date && i.DateCreated.Date <= lastDayOfYear.Date).ToList();
        return GenerateReport(yearlyInvoices);
      }

      return Ok(new ReportDto());
    }

    private List<DateTimeOffset> GetWeekDates(DateTimeOffset date)
    {
      DateTimeOffset startOfWeek = DateTimeOffset.Now.AddDays((int)CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek - (int)DateTimeOffset.UtcNow.DayOfWeek);
      List<DateTimeOffset> result = Enumerable.Range(0, 7).Select(i => startOfWeek.AddDays(i)).ToList();
      return result;
    }

    private ReportDto GenerateReport(List<Invoice> invoices)
    {

      var result = new ReportDto
      {
        Invoice = new InvoiceReportItemDto
        {
          Quantity = invoices.Count(),
          Amount = invoices.Sum(i => i.InvoiceItems.Sum(j => j.Amount))
        },
        Paid = new InvoiceReportItemDto
        {
          Quantity = invoices.Where(i => i.InvoiceStatus == InvoiceStatus.Paid).Count(),
          Amount = invoices.Where(i => i.InvoiceStatus == InvoiceStatus.Paid).Sum(i => i.InvoiceItems.Sum(j => j.Amount))
        },
        Pending = new InvoiceReportItemDto
        {
          Quantity = invoices.Where(i => i.InvoiceStatus == InvoiceStatus.Pending).Count(),
          Amount = invoices.Where(i => i.InvoiceStatus == InvoiceStatus.Pending).Sum(i => i.InvoiceItems.Sum(j => j.Amount))
        },
        Unpaid = new InvoiceReportItemDto
        {
          Quantity = invoices.Where(i => i.InvoiceStatus == InvoiceStatus.Unpaid).Count(),
          Amount = invoices.Where(i => i.InvoiceStatus == InvoiceStatus.Unpaid).Sum(i => i.InvoiceItems.Sum(j => j.Amount))
        },
      };

      return result;
    }

  }
}
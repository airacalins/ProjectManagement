using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ReportDto
    {
        public ReportDto()
        {
            Invoice = new InvoiceReportItemDto();
            Paid = new InvoiceReportItemDto();
            Unpaid = new InvoiceReportItemDto();
            Pending = new InvoiceReportItemDto();
        }

        public InvoiceReportItemDto Invoice { get; set; }
        public InvoiceReportItemDto Paid { get; set; }
        public InvoiceReportItemDto Unpaid { get; set; }
        public InvoiceReportItemDto Pending { get; set; }
    }
}
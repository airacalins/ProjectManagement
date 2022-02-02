using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class InvoiceReportItemDto
    {
        public int Quantity { get; set; }
        public double Amount { get; set; }
    }
}
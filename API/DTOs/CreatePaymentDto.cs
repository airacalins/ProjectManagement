using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.DTOs
{
    public class CreatePaymentDto
    {
        [FromForm(Name = "invoiceId")]
        public Guid InvoiceId { get; set; }
        [FromForm(Name = "modeOfPaymentId")]
        public Guid ModeOfPaymentId { get; set; }
        [FromForm(Name = "amount")]
        public double Amount { get; set; }
        public string? FileString { get; set; }
        [FromForm(Name = "file")]
        public FormFile File { get; set; }
    }
}
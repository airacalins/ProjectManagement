using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.DTOs
{
    public class CreatePaymentDto
    {
        public Guid InvoiceId { get; set; }
        public Guid ModeOfPaymentId { get; set; }
        public double Amount { get; set; }

        [FromForm(Name = "file")]        
        public IFormFile File { get; set; }
    }
}
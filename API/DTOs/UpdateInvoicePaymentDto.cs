using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateInvoicePaymentDto
    {
        public Guid Id { get; set; }
        public bool IsApproved { get; set; }
    }
}
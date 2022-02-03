using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PaymentReference
    {
        public DateTimeOffset DateCreated { get; set; }
        public double Amount { get; set; }
        public string ReferenceNumber { get; set; } = default!;
    }
}
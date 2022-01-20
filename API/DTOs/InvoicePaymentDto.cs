using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Enums;

namespace API.DTOs
{
    public class InvoicePaymentDto
    {
        public Guid Id { get; set; }
        public PaymentStatus Status { get; set; }
        public string BankName { get; set; }
        public string AccountName { get; set; }
        public string AccountNumber { get; set; }
        public DateTimeOffset DateCreated { get; set; }
    }
}
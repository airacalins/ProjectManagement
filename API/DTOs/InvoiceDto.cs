using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Enums;

namespace API.DTOs
{
    public class InvoiceDto
    {
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }
        public string TenantUniqueId { get; set; }
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Phone { get; set; } = default!;
        public string BusinessName { get; set; } = default!;
        public string SlotNumber { get; set; }
        public double Amount { get; set; }
        public IEnumerable<InvoicePaymentDto> Payments { get; set; }
        public IEnumerable<InvoiceItemDto> InvoiceItems { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public DateTimeOffset DueDate { get; set; }
        public string InvoiceNumber { get; set; } = default!;
        public InvoiceStatus InvoiceStatus { get; set; }
        public double AmountPaid { get { return Payments != null ? Payments.Where(i => i.Status == PaymentStatus.Approved).Sum(i => i.Amount) : 0; }}
        public double Balance { get { return Amount - AmountPaid; }}
    }
}
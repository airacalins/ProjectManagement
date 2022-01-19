using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class InvoiceDto
    {
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Phone { get; set; } = default!;
        public string BusinessName { get; set; } = default!;
        public string SlotNumber { get; set; }
        public double Amount { get; set; }
        public IEnumerable<InvoicePaymentDto> Payments { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public DateTimeOffset DueDate { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Enums;

namespace API.Entities
{
    public class Payment
    {
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }
        public Tenant Tenant { get; set; }
        public Guid InvoiceId { get; set; }
        public Invoice Invoice { get; set; }
        public Guid UnitId { get; set; }
        public Unit Unit { get; set; }
        public PaymentStatus Status { get; set; }
        public Guid? ModeOfPaymentId { get; set; }
        public ModeOfPayment? ModeOfPayment { get; set; }
    }
}
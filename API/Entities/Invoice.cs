using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Enums;

namespace API.Entities
{
    public class Invoice
    {
        
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }
        public Tenant Tenant { get; set; }
        public Guid TenantContractId { get; set; }
        public TenantContract TenantContract { get; set; }
        public Guid UnitId { get; set; }
        public Unit Unit { get; set; }
        public ICollection<InvoiceItem> InvoiceItems { get; set; }
        public InvoiceStatus Status { get; set; }
        public Guid? ModeOfPaymentId { get; set; }
        public ModeOfPayment? ModeOfPayment { get; set; }
    }
}
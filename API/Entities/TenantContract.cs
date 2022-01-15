using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Enums;

namespace API.Entities
{
    public class TenantContract
    {        
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }
        public Tenant Tenant { get; set; }
        public Guid UnitId { get; set; }
        public Unit Unit { get; set; }
        public DateTimeOffset NextPaymentDate { get; set; }
        public TenantContractStatus Status { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public double Price { get; set; }
        public int NumberOfDeposit { get; set; }
    }
}
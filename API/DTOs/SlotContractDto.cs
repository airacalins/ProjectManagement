using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Enums;

namespace API.DTOs
{
    public class SlotContractDto
    {
        public Guid Id { get; set; }
        public Guid SlotId { get; set; }
        public string SlotNumber { get; set; } 
        public double Size { get; set; } 
        public double Price { get; set; } 
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public DateTimeOffset NextBillingDate { get; set; }
        public TenantContractStatus Status { get; set; }
    }
}
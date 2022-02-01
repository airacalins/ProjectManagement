using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Enums;

namespace API.Entities
{
    public class Unit
    {
        
        public Guid Id { get; set; }
        public string SlotNumber { get; set; }
        public double Size { get; set; }
        public SlotStatus SlotStatus { get; set; }
        public double Price { get; set; }
        public ICollection<UnitPhoto> UnitPhotos { get; set; }
        public ICollection<TenantContract> TenantContracts { get; set; }
        public bool IsArchived { get; set; }
    }
}
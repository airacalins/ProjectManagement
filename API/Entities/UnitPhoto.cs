using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UnitPhoto
    {
        
        public Guid Id { get; set; }
        public Guid UnitId { get; set; }
        public Unit Unit { get; set; }
        public Guid PhotoId { get; set; }
        public Photo Photo { get; set; }
        public bool IsPrimary { get; set; }
    }
}
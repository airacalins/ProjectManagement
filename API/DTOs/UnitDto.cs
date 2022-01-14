using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UnitDto
    {
        public Guid Id { get; set; }
        public string SlotNumber { get; set; } 
        public double Size { get; set; } 
        public string RentalFee { get; set; } 
        public string Status { get; set; }
    }
}
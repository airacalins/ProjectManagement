using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateUnitDto
    {
        public string SlotNumber { get; set; } 
        public double Size { get; set; } 
        public double Price { get; set; } 
    }
}
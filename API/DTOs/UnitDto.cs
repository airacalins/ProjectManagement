using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace API.DTOs
{
    public class UnitDto
    {
        public Guid Id { get; set; }
        public string SlotNumber { get; set; } 
        public double Size { get; set; } 
        public double Price { get; set; } 
        public SlotStatus Status { get; set; }
    }
}
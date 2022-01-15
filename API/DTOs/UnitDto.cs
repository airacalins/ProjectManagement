using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using API.Enums;
using Newtonsoft.Json.Converters;

namespace API.DTOs
{
    public class UnitDto
    {
        public Guid Id { get; set; }
        public string SlotNumber { get; set; } 
        public double Size { get; set; } 
        public double Price { get; set; } 
        [JsonConverter(typeof(StringEnumConverter))]
        public SlotStatus Status { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UnitPrice
    {        
        public Guid Id { get; set; }
        public Guid UnitId { get; set; }
        public Unit Unit { get; set; }
        public double Price { get; set; }
        public DateTimeOffset DateImplemented { get; set; }
    }
}
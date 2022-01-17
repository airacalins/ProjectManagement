using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateTenantDto
    {
        public Guid SlotId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BusinessName {get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        
        
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
    }
}
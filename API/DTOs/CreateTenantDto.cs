using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public double AdvancePayment { get; set; }
        
        
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
    }
}
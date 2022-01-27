using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UpdateTenantDto
    {
        public Guid Id { get; set; }
        public Guid SlotId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BusinessName {get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        
        
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
    }
}
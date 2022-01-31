using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class TenantContractPhoto
    {
        public Guid Id { get; set; }
        public Guid TenantContractId { get; set; }
        public TenantContract TenantContract { get; set; }
        public Guid PhotoId { get; set; }
        public Photo Photo { get; set; }
        public DateTimeOffset DateCreated { get; set; }
    }
}
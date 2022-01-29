using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TenantContractPhotoDto
    {
        public string Id { get; set; }
        public IFormFile File { get; set; }
    }
}
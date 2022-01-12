using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; } = default!;
        public string Photo { get; set; } = default!;
        public string Token { get; set; } = default!;
    }
}
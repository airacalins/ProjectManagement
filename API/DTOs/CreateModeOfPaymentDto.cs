using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateModeOfPaymentDto
    {   
        public string BankName { get; set; }
        public string AccountName { get; set; }
        public string AccountNumber { get; set; }
    }
}
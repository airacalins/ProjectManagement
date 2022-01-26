using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ModeOfPayment
    {
        public Guid Id { get; set; }
        public string BankName { get; set; }
        public string AccountName { get; set; }
        public string AccountNumber { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsArchived { get; set; }
        public ICollection<Invoice> Invoices { get; set; }
    }
}
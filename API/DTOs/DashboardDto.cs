using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class DashboardDto
    {
        public int Slots { get; set; }
        public int AvailableSlots { get; set; }
        public int RentedSlots { get; set; }
        public int Tenants { get; set; }
        public int UnpaidInvoices { get; set; }
        public int LatePayments { get; set; }
        public int PendingPayments { get; set; }
    }
}
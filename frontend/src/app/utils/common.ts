import { PaymentStatus } from "../models/invoice";
import { SlotStatus } from "../models/slot";

export const getSlotStatusText = (slotStatus: SlotStatus) => {
  switch (slotStatus) {
    case SlotStatus.Available: return "Available";
    case SlotStatus.Rented: return "Rented";
    case SlotStatus.UnderMaintenance: return "Under Maintenance";
    case SlotStatus.Reserved: return "Reserved";
    default: return "NA";
  }
}

export const getPaymentStatusText = (paymentStatus: PaymentStatus) => {
  switch (paymentStatus) {
    case PaymentStatus.Unpaid: return "Unpaid";
    case PaymentStatus.Pending: return "Pending";
    case PaymentStatus.Approved: return "Approved";
    case PaymentStatus.Declined: return "Declined";
    default: return "NA";
  }
}
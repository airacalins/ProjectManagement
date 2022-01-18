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
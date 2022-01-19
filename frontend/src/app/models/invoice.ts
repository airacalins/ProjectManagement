export interface IInvoice {
  id: string,
  tenantId: string,
  firstName: string,
  lastName: string,
  phone: string,
  businessName: string,
  slotNumber: string,
  amount: number,
  payments: [
    {
      id: string,
      status: PaymentStatus,
      bankName: string,
      accountName: string,
      accountNumber: string
    }
  ],
  dateCreated: Date,
  dueDate: Date
}

export enum PaymentStatus {
  Unpaid,
  Pending,
  Approved,
  Declined
}
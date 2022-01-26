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
      dateCreated: Date,
      status: PaymentStatus,
      bankName: string,
      accountName: string,
      accountNumber: string,
      amount: number
    }
  ],
  dateCreated: Date,
  dueDate: Date
}

export interface IUpdatePaymentStatusModel {
  id: string,
  isApproved: boolean
}

export enum PaymentStatus {
  Unpaid,
  Pending,
  Approved,
  Declined
}
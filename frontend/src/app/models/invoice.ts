export interface IInvoice {
  id: string,
  tenantId: string,
  firstName: string,
  lastName: string,
  phone: string,
  businessName: string,
  slotNumber: string,
  amount: number,
  payments: IPayment[],
  invoiceItems: IInvoiceItem[],
  dateCreated: Date,
  dueDate: Date,
  invoiceNumber: string
}

export interface IPayment {
  id: string,
  status: number,
  bankName: string,
  accountName: string,
  accountNumber: string,
  dateCreated: Date,
  amount: number,
  referenceNumber: string
}

export interface IInvoiceItem {
  id: string,
  description: string,
  amount: number
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
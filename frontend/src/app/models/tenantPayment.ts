export interface ITenantPayment {
  id: string;
  billingDate: string;
  amount: number;
  tenantContractId: number;
  dateOfPayment: string;
  payentStatus: 'Pending';
  referenceNumber: string;
}

export interface ITenantPaymentFailed {
  payentStatus: 'Declined';
}

export interface ITenantPaymentSucceed {
  payentStatus: 'Success';
}

export interface TenantPayment {
  id: number;
  billingDate: string;
  amount: number;
  tenantContractId: number;
  dateOfPayment: string;
  payentStatus: 'Pending';
  referenceNumber: string;
}

export interface TenantPaymentFailed {
  payentStatus: 'Declined';
}

export interface TenantPaymentSucceed {
  payentStatus: 'Success';
}

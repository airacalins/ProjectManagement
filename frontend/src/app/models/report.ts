export interface IDateDurationInput {
    startDate: Date
    endDate: Date
}

export interface IInvoiceReportInput {
    reportType?: ReportType;
    date?: string;
}

export interface IInvoiceReport {
    invoice: IInvoiceReportItem,
    paid: IInvoiceReportItem,
    unpaid: IInvoiceReportItem,
    pending: IInvoiceReportItem
}

export interface IInvoiceReportItem {
    quantity: number;
    amount: number;
}

export enum ReportType {
    Daily = 0,
    Weekly = 1,
    Monthly = 2,
    Yearly = 3
}
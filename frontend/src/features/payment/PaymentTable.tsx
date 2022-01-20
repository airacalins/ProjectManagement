import moment from "moment";
import { Icon, Menu, Table } from "semantic-ui-react";
import SearchBar from "../../app/layouts/components/SearchBar";
import TableBody from "../../app/layouts/components/table/TableBody";
import TableComponent from "../../app/layouts/components/table/TableComponent";
import TableHeader from "../../app/layouts/components/table/TableHeader";
import { IInvoice, PaymentStatus } from "../../app/models/invoice";
import { getPaymentStatusText } from "../../app/utils/common";

interface Props {
    invoices: IInvoice[]
}

const PaymentTable = ({ invoices }: Props) => {
    const renderPaymentDetails = (invoice: IInvoice) => {
        if (invoice.payments != null && invoice.payments.length > 0 && invoice.payments.some(i => i.status === PaymentStatus.Approved)) {
            const approvedPayment = invoice.payments.filter(i => i.status === PaymentStatus.Approved)[0];
            return approvedPayment.bankName;
        }

        return "-----"
    };


    const renderPaymentStatusText = (invoice: IInvoice) => {
        if (invoice.payments != null && invoice.payments.length > 0 && invoice.payments.some(i => i.status === PaymentStatus.Approved)) {
            const approvedPayment = invoice.payments.filter(i => i.status === PaymentStatus.Approved)[0];
            return getPaymentStatusText(approvedPayment.status);
        }

        return "Unpaid"
    };


    return (
        <>
            <SearchBar isLoading={false} value="" />

            <TableComponent
                tableHeader={
                    <>
                        <TableHeader name="Tenant" />
                        <TableHeader name="Slot Number" />
                        <TableHeader name="Rental Fee" />
                        <TableHeader name="Due Date" />
                        <TableHeader name="Status" />
                        <TableHeader name="" />
                    </>
                }

                tableBody={
                    !invoices.length ?
                        <TableBody colSpan="5" content="No invoices..." />
                        :
                        invoices.map(s => (
                            <Table.Row key={s.id}>
                                <TableBody content={`${s.firstName} ${s.lastName}`} />
                                <TableBody content={s.slotNumber} />
                                <TableBody content={s.amount} />
                                <TableBody content={moment(s.dueDate).format("MMM Do YY")} />
                                <TableBody content={renderPaymentStatusText(s)} badgeColor="red" />
                                <TableBody content=">" navigateTo={`/payments/${s.id}/details`} />
                            </Table.Row>
                        ))
                }
            />
        </>
    );
}

export default PaymentTable;
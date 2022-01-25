import { IInvoice, PaymentStatus } from "../../app/models/invoice";
import { getPaymentStatusText } from "../../app/utils/common";
import { Label } from 'semantic-ui-react';
import history from '../../app/utils/history';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CustomTable from '../../app/layouts/components/table/CustomTable';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from "moment";

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

    const columns = [
        { title: 'Tenant' },
        { title: 'Slot Number' },
        { title: 'Rental Fee' },
        { title: 'Due Date' },
        { title: 'Status' },
        { title: '' },
    ]


    return (

        <CustomTable
            columns={columns}
            rows={invoices.map(i => <TableRow key={i.id}>

                <TableCell align="center">
                    {`${i.firstName} ${i.lastName}`}
                </TableCell>

                <TableCell align="center">
                    {i.slotNumber}
                </TableCell>

                <TableCell align="center">
                    {i.amount}
                </TableCell>

                <TableCell align="center">
                    {moment(i.dueDate).format("MMM Do YY")}
                </TableCell>

                <TableCell align="center">
                    <Label content={renderPaymentStatusText(i)} badgeColor="red" />
                </TableCell>

                <TableCell align="right">
                    <VisibilityIcon onClick={() => history.push(`/payments/${i.id}/details`)} />
                </TableCell>

            </TableRow>
            )}
        />
    );
}

export default PaymentTable;
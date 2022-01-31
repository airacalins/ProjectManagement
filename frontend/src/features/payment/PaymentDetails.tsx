import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchInvoiceDetailsAsync, updateInvoicePaymentStatusAsync } from "./invoiceSlice";
import { getPaymentStatusColor, getPaymentStatusText } from "../../app/utils/common";
import { currencyFormatter, dateFormatter } from "../../app/layouts/formatter/common";
import { Label } from "semantic-ui-react";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from "moment";

import CustomTable from "../../app/layouts/components/table/CustomTable";
import DetailItem from "../../app/layouts/components/items/DetailItem";
import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import UpdateButton from "../../app/layouts/components/buttons/UpdateButton";
import { PaymentStatus } from "../../app/models/invoice";

const PaymentDetails = () => {

    const { invoice, isFetchingDetails } = useAppSelecter(state => state.invoice);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) dispatch(fetchInvoiceDetailsAsync(id));
    }, [])

    const totalAmountPaid = useMemo(() => !!invoice && !!invoice.payments ? invoice.payments.reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0) : 0, [invoice]);

    if (isFetchingDetails || !invoice) return (<LoadingComponent content="Loading invoice details..." />)

    const {
        amount,
        businessName,
        dueDate,
        firstName,
        lastName,
        payments,
        phone,
        slotNumber,
    } = invoice

    const status = () => {
        if (!payments || !payments.length) {
            return <Label content="Unpaid" color="red" />
        }
        else
            return <Label content={getPaymentStatusText(payments[0].status)} color={getPaymentStatusColor(payments[0].status)} />
    }

    const updateStatus = async (id: string, isApproved: boolean) => {
        await dispatch(updateInvoicePaymentStatusAsync({ id, isApproved }))
    }


    const columns = [
        { title: 'Date' },
        { title: 'Mode of Payment' },
        { title: 'Account Name' },
        { title: 'Account Number' },
        { title: 'Amount Paid' },
        { title: 'Proof of Payment' },
        { title: 'Status' },
        { title: '' },
    ]

    return (
        <>
            <DetailsPage
                title="Invoice Details"
                backNavigationLink="/invoices"
                content={
                    <>
                        <DetailItem title="Status" value={status()} />
                        <DetailItem title="Slot Number" value={slotNumber} />
                        <DetailItem title="Name" value={`${firstName} ${lastName}`} />
                        <DetailItem title="Contact Number" value={phone} />
                        <DetailItem title="Business Name" value={businessName} />
                        <DetailItem title="Rental Fee" value={currencyFormatter(amount)} />
                        <DetailItem title="Due Date" value={moment(dueDate).format("MMM DD, YYYY")} />
                    </>
                }
            />

            <MainPage
                title="Payment"
                content={
                    <>
                        <div className="page__container px-5 py-4 mx-5 mt-4">
                            <DetailItem title="Total Amount Paid" value={totalAmountPaid} />
                            <DetailItem title="Balance" value={invoice.amount - totalAmountPaid} />
                        </div>

                        <CustomTable
                            // searchValue={searchKey}
                            // onSearch={(value: string) => setSearchKey(value)}
                            navigateTo="/invoices/create"
                            columns={columns}
                            rows={
                                !payments.length ?
                                    [
                                        <TableRow>
                                            <TableCell align="center" colSpan={columns.length}>
                                                No data
                                            </TableCell>
                                        </TableRow>
                                    ]
                                    :
                                    payments.map(payment =>
                                        <>
                                            <TableRow key={payment.id}>

                                                <TableCell align="center">
                                                    {moment(payment.dateCreated).format("MMM DD, YYYY")}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {payment.bankName}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {payment.accountName}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {payment.accountNumber}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {currencyFormatter(payment.amount)}
                                                </TableCell>

                                                <TableCell align="center">
                                                    <a>
                                                        <ImageOutlinedIcon sx={{ color: "#F2711C" }} />
                                                    </a>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Label content={getPaymentStatusText(payment.status)} color={getPaymentStatusColor(payment.status)} />
                                                </TableCell>

                                                <TableCell align="center">
                                                    {
                                                        !(payment.status === PaymentStatus.Approved || payment.status === PaymentStatus.Declined) &&
                                                        <>
                                                            <UpdateButton title="Approved" color="orange" onClick={() => updateStatus(payment.id, true)} />
                                                            <UpdateButton title="Declined" color="red" onClick={() => updateStatus(payment.id, false)} />
                                                        </>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                            }
                        />

                    </>
                }
            />
        </>
    );
}

export default PaymentDetails;
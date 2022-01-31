import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchInvoiceDetailsAsync, updateInvoicePaymentStatusAsync } from "./invoiceSlice";
import { getInvoiceStatusColor, getInvoiceStatusText, getPaymentStatusColor, getPaymentStatusText } from "../../app/utils/common";
import { currencyFormatter } from "../../app/layouts/formatter/common";
import { Label } from "semantic-ui-react";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TableRow from '@mui/material/TableRow';
import moment from "moment";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import CustomTable from "../../app/layouts/components/table/CustomTable";
import DetailItem from "../../app/layouts/components/items/DetailItem";
import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import UpdateButton from "../../app/layouts/components/buttons/UpdateButton";
import { PaymentStatus } from "../../app/models/invoice";
import { Paper, TableHead } from "@mui/material";

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
        invoiceItems,
        invoiceNumber,
        lastName,
        payments,
        phone,
        slotNumber,
    } = invoice

    const status = () => <Label content={getInvoiceStatusText(invoice.invoiceStatus)} color={getInvoiceStatusColor(invoice.invoiceStatus)} />
    const updateStatus = async (id: string, isApproved: boolean) => {
        await dispatch(updateInvoicePaymentStatusAsync({ id, isApproved }))
    }

    const paymentTableColumn = [
        { title: 'Date' },
        { title: 'Mode of Payment' },
        { title: 'Account Name' },
        { title: 'Account Number' },
        { title: 'Amount Paid' },
        { title: 'Proof of Payment' },
        { title: 'Status' },
        { title: '' },
    ]

    if (!invoice)
        return <LoadingComponent content="Loading invoice..." />

    return (
        <>
            <DetailsPage
                title="Invoice Details"
                backNavigationLink="/invoices"
                content={
                    <>
                        <DetailItem title="Invoice Number" value={invoiceNumber} />
                        <DetailItem title="Status" value={status()} />
                        <DetailItem title="Slot Number" value={slotNumber} />
                        <DetailItem title="Name" value={`${firstName} ${lastName}`} />
                        <DetailItem title="Contact Number" value={phone} />
                        <DetailItem title="Business Name" value={businessName} />
                        <DetailItem title="Due Date" value={moment(dueDate).format("MMM DD, YYYY")} />
                    </>
                }
            />

            <DetailsPage
                content=
                {
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{ fontSize: 14 }} >
                                        Description
                                    </TableCell>

                                    <TableCell align="right" style={{ fontSize: 14 }} >
                                        Amount
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    invoiceItems.map(i =>
                                        <TableRow>
                                            <TableCell>
                                                {i.description}
                                            </TableCell>

                                            <TableCell align="right">
                                                {currencyFormatter(i.amount)}
                                            </TableCell>
                                        </TableRow>
                                    )
                                }

                                <TableRow>
                                    <TableCell align="right">
                                        <p className="font__bold">Total</p>
                                    </TableCell>

                                    <TableCell align="right">
                                        <p className="font__bold">{currencyFormatter(amount)}</p>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                }

            // {
            //     <>
            //         <CustomTable
            //             noPagination
            //             columns={invoiceTableColumn}
            //             rows={
            //                 invoiceItems.map(i =>
            //                     <>
            //                         <TableRow key={id}>

            //                             <TableCell align="left">
            //                                 {i.description}
            //                             </TableCell>

            //                             <TableCell className="w-25" align="center">
            //                                 {currencyFormatter(i.amount)}
            //                             </TableCell>
            //                         </TableRow>
            //                     </>
            //                 )
            //             }
            //         />
            //         <DetailItem title="Total" value={amount} />
            //         <DetailItem title="Balance" value={"amount"} />
            //     </>
            // }
            />

            {/* <div className="page__container px-5 py-4 mt-4">
                {
                    invoiceItems && invoiceItems.map(i =>
                        <DetailItem title={`${i.description}:`} value={currencyFormatter(i.amount)} />
                    )
                }
                <DetailItem title="Total:" value={currencyFormatter(amount)} />

                <DetailItem title="Total Amount Paid:" value={currencyFormatter(totalAmountPaid)} />
                <DetailItem title="Balance:" value={currencyFormatter(invoice.amount - totalAmountPaid)} />
            </div> */}

            <MainPage
                title="Payment"
                content={
                    <>
                        <CustomTable
                            // searchValue={searchKey}
                            // onSearch={(value: string) => setSearchKey(value)}
                            navigateTo="/invoices/create"
                            columns={paymentTableColumn}
                            rows={
                                !payments.length ?
                                    [
                                        <TableRow>
                                            <TableCell align="center" colSpan={paymentTableColumn.length}>
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
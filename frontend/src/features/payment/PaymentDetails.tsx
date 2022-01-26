import { useEffect } from "react";
import { useParams } from "react-router-dom";
import history from "../../app/utils/history";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchInvoiceDetailsAsync } from "./invoiceSlice";
import { getPaymentStatusColor, getPaymentStatusText } from "../../app/utils/common";
import { currencyFormatter } from "../../app/layouts/formatter/common";
import { TableCell, TableRow } from "semantic-ui-react";

import CustomTable from "../../app/layouts/components/table/CustomTable";
import DetailItem from "../../app/layouts/components/items/DetailItem";
import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';


const PaymentDetails = () => {

    const { invoice, isFetchingDetails } = useAppSelecter(state => state.invoice);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(fetchInvoiceDetailsAsync(id));
    }, [])

    if (isFetchingDetails || !invoice) return (<LoadingComponent content="Loading invoice details..." />)

    const {
        amount,
        businessName,
        dateCreated,
        dueDate,
        firstName,
        lastName,
        payments,
        phone,
        slotNumber,
        tenantId
    } = invoice

    const status = () => {
        if (!payments || !payments.length) {
            return <a className="ui orange circular label" >Unpaid</a>
        }
        else
            return <a className={`ui ${getPaymentStatusColor(payments[0].status)} circular label`} >{getPaymentStatusText(payments[0].status)}</a>
    }

    const columns = [
        { title: 'Date' },
        { title: 'Amount Paid' },
        { title: 'Mode of Payment' },
        { title: 'Status' },
        { title: '' },
    ]

    return (
        <>

            <DetailsPage
                title="Invoice Details"
                backNavigationLink="/payments"
                content={
                    <>
                        <DetailItem title="Status" value={status()} />
                        <DetailItem title="Slot Number" value={slotNumber} />
                        <DetailItem title="Name" value={`${firstName} ${lastName}`} />
                        <DetailItem title="Contact Number" value={phone} />
                        <DetailItem title="Business Name" value={businessName} />
                        <DetailItem title="Rental Fee" value={currencyFormatter(amount)} />
                        <DetailItem title="Due Date" value={dueDate} />
                    </>
                }
            />

            <MainPage
                title="Payment"
                content={
                    <CustomTable
                        // searchValue={searchKey}
                        // onSearch={(value: string) => setSearchKey(value)}
                        navigateTo="/payments/create"
                        columns={columns}
                        rows=
                        {
                            payments.map(payment =>
                                <TableRow key={payment.id}>

                                    <TableCell align="center">
                                        {payment.bankName}
                                    </TableCell>

                                    <TableCell align="center">

                                    </TableCell>

                                    <TableCell align="center">

                                    </TableCell>

                                    <TableCell align="right">
                                        <NavigateNextOutlinedIcon onClick={() => history.push(`/payments/${payment.id}/details`)} />
                                    </TableCell>

                                </TableRow>
                            )
                        }
                    />
                }
            />
        </>
    );
}

export default PaymentDetails;
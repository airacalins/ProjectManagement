import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import Details from "../../app/layouts/components/common/Details";
import DetailsInput from "../../app/layouts/components/common/DetailsInput";
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";
import DetailItem from "../../app/layouts/components/items/DetailItem";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { getPaymentStatusColor, getPaymentStatusText } from "../../app/utils/common";
import { fetchInvoiceDetailsAsync } from "./invoiceSlice";

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
                        <DetailItem title="Rental Fee" value={amount} />
                        <DetailItem title="Due Date" value={dueDate} />
                    </>
                }
            />

            <DetailsPage
                title="Payment Details"
                content={
                    <>
                        <DetailItem title="Date of Payment" value="" />
                        <DetailItem title="Amount Paid" value="" />
                        <DetailItem title="Mode of Payment" value="" />
                        <DetailItem title="Reference Number" value="" />
                        <DetailItem title="Proof of Payment" value="" />
                        <FormButtonContainer>

                        </FormButtonContainer>

                    </>
                }
            />
        </>
    );
}

export default PaymentDetails;
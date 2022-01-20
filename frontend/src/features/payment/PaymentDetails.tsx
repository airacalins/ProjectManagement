import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import Details from "../../app/layouts/components/common/Details";
import DetailsInput from "../../app/layouts/components/common/DetailsInput";
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
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

    const { amount, businessName, dateCreated, dueDate, firstName, lastName, payments, phone, slotNumber, tenantId } = invoice

    const status = () => {
        if (!payments || !payments.length) {
            return <a className="ui orange circular label" >Unpaid</a>
        }
        else
            return <a className={`ui ${getPaymentStatusColor(payments[0].status)} circular label`} >{getPaymentStatusText(payments[0].status)}</a>
    }

    return (
        <>
            <ContainerDetails>
                <Details
                    title="Invoice Details"
                    detailsInput={
                        <>
                            <DetailsInput label="Status" input={status()} />
                            <DetailsInput label="Slot Number" input={slotNumber} />
                            <DetailsInput label="Name" input={`${firstName} ${lastName}`} />
                            <DetailsInput label="Contact Number" input={phone} />
                            <DetailsInput label="Business Name" input={businessName} />
                            <DetailsInput label="Rental Fee" input={amount} />
                            <DetailsInput label="Due Date" input={dueDate} />
                        </>
                    }
                />
            </ContainerDetails >

            <ContainerDetails>
                <Details
                    title="Payment Details"
                    detailsInput={
                        <>
                            <DetailsInput label="Date of Payment" input="" />
                            <DetailsInput label="Amount Paid" input="" />
                            <DetailsInput label="Mode of Payment" input="" />
                            <DetailsInput label="Reference Number" input="" />
                            <DetailsInput label="Proof of Payment" input={<Image className="ui medium rounded image" src='https://images.pexels.com/photos/9461290/pexels-photo-9461290.jpeg?cs=srgb&dl=pexels-mike-jones-9461290.jpg&fm=jpg' fluid />} />

                        </>
                    }
                    detailsButton={
                        <Button.Group vertical >
                            <Button content="Approved" color="green" />
                            <Button content="Declined" color="red" />
                        </Button.Group>
                    }
                />
            </ContainerDetails>
        </>
    );
}

export default PaymentDetails;
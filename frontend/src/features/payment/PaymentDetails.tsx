import { Button } from "semantic-ui-react";
import Details from "../../app/layouts/components/common/Details";
import DetailsInput from "../../app/layouts/components/common/DetailsInput";
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails";

const PaymentDetails = () => {
    return (
        <ContainerDetails>
            <Details
                title="Payment Details"
                detailsInput={
                    <>
                        <DetailsInput label="Business Name" input="input" />
                        <DetailsInput label="Slot Number" input="input" />
                        <DetailsInput label="Rental Fee" input="input" />
                        <DetailsInput label="Date of Payment" input="input" />
                        <DetailsInput label="Mode of Payment" input="input" />
                        <DetailsInput label="Reference Number" input="input" />
                        <DetailsInput label="Amount Paid" input="input" />
                    </>
                }
                detailsButton={
                    <Button.Group vertical>
                        <Button content="Approved" color="green" />
                        <Button content="Declined" color="red" />
                    </Button.Group>
                }
            />
        </ContainerDetails >
    );
}

export default PaymentDetails;
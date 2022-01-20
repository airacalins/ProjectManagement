import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "../../app/layouts/components/common/Details";
import DetailsAction from "../../app/layouts/components/common/DetailsAction";
import DetailsInput from "../../app/layouts/components/common/DetailsInput";
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchModeOfPaymentDetailsAsync } from "./modeOfPaymentSlice";

const ModeOfPaymentDetails = () => {

    const { modeOfPayment, isFetchingDetails } = useAppSelecter(state => state.modeOfPayment);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(fetchModeOfPaymentDetailsAsync(id));
    }, [])

    if (isFetchingDetails || !modeOfPayment) return (<LoadingComponent content="Loading mode of payment details..." />)

    const { bankName, accountName, accountNumber } = modeOfPayment

    return (
        <ContainerDetails>

            <Details
                title="Payment Details"
                detailsInput={
                    <>
                        <DetailsInput label="Bank Name" input={bankName} />
                        <DetailsInput label="Account Name" input={accountName} />
                        <DetailsInput label="Account Number" input={accountNumber} />
                    </>
                }
                detailsButton={
                    <>
                        <DetailsAction name="Edit" icon="pencil" color="yellow" />
                        <DetailsAction name="Delete" icon="trash" color="red" />
                    </>
                }
            />

        </ContainerDetails >
    );
}

export default ModeOfPaymentDetails;
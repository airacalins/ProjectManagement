import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { deleteModeOfPaymentDetailsAsync, fetchModeOfPaymentDetailsAsync } from "./modeOfPaymentSlice";
import history from "../../app/utils/history";

import DeleteButton from "../../app/layouts/components/buttons/DeleteButton";
import DetailItem from "../../app/layouts/components/items/DetailItem";
import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";
import NavigationButton from "../../app/layouts/components/buttons/NavigationButton";

const ModeOfPaymentDetails = () => {

    const { modeOfPayment, isFetchingDetails, isSaving } = useAppSelecter(state => state.modeOfPayment);
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(id) dispatch(fetchModeOfPaymentDetailsAsync(id));
    }, [])

    const handleDelete = async () => {
        if(id) { 
            await dispatch(deleteModeOfPaymentDetailsAsync(id));
            history.push('/mode-of-payments')
        }
    }

    if (isFetchingDetails || !modeOfPayment) return (<LoadingComponent content="Loading mode of payment details..." />)

    const { bankName, accountName, accountNumber } = modeOfPayment

    return (
        <DetailsPage
            title="Mode of Payment Details"
            backNavigationLink={`/mode-of-payments`}
            content={
                <>
                    <DetailItem title="Bank Name" value={bankName} />
                    <DetailItem title="Account Name" value={accountName} />
                    <DetailItem title="Account Number" value={accountNumber} />
                    <FormButtonContainer>
                        <NavigationButton title="Edit" navigateTo={`/mode-of-payments/${id}/manage`} />
                        <DeleteButton onClick={handleDelete} loading={isSaving} />
                    </FormButtonContainer>
                </>
            }
        />
    );
}

export default ModeOfPaymentDetails;
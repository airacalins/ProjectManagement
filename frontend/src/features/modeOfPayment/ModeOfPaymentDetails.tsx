import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "../../app/layouts/components/common/Details";
import DetailsAction from "../../app/layouts/components/common/DetailsAction";
import DetailsInput from "../../app/layouts/components/common/DetailsInput";
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { useStore } from "../../app/stores/store";

const ModeOfPaymentDetails = () => {

    const { modeOfPaymentStore } = useStore()
    const { initialLoading, modeOfPayments, loadModeOfPayment, selectModeOfPayment, selectedModeOfPayment: modeOfPayment } = modeOfPaymentStore
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!modeOfPayments) selectModeOfPayment(+id)
        if (!modeOfPayment) loadModeOfPayment(+id)
    }, [id, modeOfPayments, selectModeOfPayment, modeOfPayment, loadModeOfPayment])

    if (initialLoading || !modeOfPayment) return (<LoadingComponent content="Loading mode of payment details..." />)

    return (
        <ContainerDetails>

            <Details
                title="Payment Details"
                detailsInput={
                    <>
                        <DetailsInput label="Bank Name" input={modeOfPayment.bankName} />
                        <DetailsInput label="Account Name" input={modeOfPayment.accountName} />
                        <DetailsInput label="Account Number" input={modeOfPayment.accountNumber} />
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

export default observer(ModeOfPaymentDetails);
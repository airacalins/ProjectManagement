import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabButton from "../../app/layouts/components/tabs/TabButton";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import ModeOfPaymentTable from "./ModeOfPaymentTable";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { observer } from "mobx-react-lite";

const ModeOfPayment = () => {


    const { modeOfPaymentStore } = useStore();
    const { initialLoading, loadModeOfPayments, modeOfPayments } = modeOfPaymentStore

    useEffect(() => {
        loadModeOfPayments()
    }, [loadModeOfPayments])

    if (initialLoading) return <LoadingComponent content="Loading Mode of Payments..." />

    return (
        <ContainerPage children={
            <>
                <Tab>
                    <TabItem name="All" navigateTo="/mode-of-payments" />
                    <TabItem name="Disabled" navigateTo="./mode-of-payments/disabled" />
                    <TabButton name="Add Mode of Payment" navigateTo="/mode-of-payments/create" />
                </Tab>

                <ModeOfPaymentTable modeOfPayments={modeOfPayments} />
            </>
        } />
    );
}

export default observer(ModeOfPayment);
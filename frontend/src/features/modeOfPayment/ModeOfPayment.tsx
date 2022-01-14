import { useEffect } from "react";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabButton from "../../app/layouts/components/tabs/TabButton";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import ModeOfPaymentTable from "./ModeOfPaymentTable";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchModeOfPaymentsAsync } from "./modeOfPaymentSlice";

const ModeOfPayment = () => {

    const {modeOfPayments, isFetching } = useAppSelecter(state => state.modeOfPayment);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(fetchModeOfPaymentsAsync());
    }, [])
    
    if (isFetching) return <LoadingComponent content="Loading Mode of Payments..." />

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

export default ModeOfPayment;
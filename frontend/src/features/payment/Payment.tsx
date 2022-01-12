import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import PaymentTable from "./PaymentTable";

const Payment = () => {

    const { tenantPaymantStore } = useStore();
    const { initialLoading, loadTenantPayments } = tenantPaymantStore;

    useEffect(() => {
        loadTenantPayments()
    }, [loadTenantPayments])

    if (initialLoading) return <LoadingComponent content="Loading payments..." />

    return (
        <ContainerPage
            children={
                <>
                    <Tab>
                        <TabItem name="All" navigateTo="./tenant" />
                        <TabItem name="Updated" navigateTo="./slot/updated" />
                        <TabItem name="Delayed" navigateTo="./slot/delayed" />
                    </Tab>

                    <PaymentTable />
                </>
            } />
    );
}

export default Payment;
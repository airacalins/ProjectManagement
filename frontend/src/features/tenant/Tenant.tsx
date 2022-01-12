import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabButton from "../../app/layouts/components/tabs/TabButton";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import { useStore } from "../../app/stores/store";
import TenantTable from "./TenantTable";

const Tenant = () => {
    const { tenantStore } = useStore();
    const { initialLoading, loadTenants, tenants } = tenantStore

    useEffect(() => {
        loadTenants()
    }, [loadTenants])

    if (initialLoading) return <LoadingComponent content="Loading Tenants..." />

    return (
        <ContainerPage
            children={
                <>
                    <Tab>
                        <TabItem name="All" navigateTo="/tenants" />
                        <TabItem name="Ending Soon" navigateTo="./tenants/ending-contract" />
                        <TabButton name="Add Tenant" navigateTo="/tenants/create" />
                    </Tab>

                    <TenantTable tenants={tenants} />
                </>
            } />
    );
}

export default observer(Tenant);
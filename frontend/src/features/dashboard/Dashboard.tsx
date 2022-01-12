import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"
import { useStore } from "../../app/stores/store"
import DashboardBodyItem from "./DashbboardBodyItem"
import DashboardBody from "./DashboardBody"
import DashboardHeader from "./DashboardHeader"
import DashboardHeaderCard from "./DashboardHeaderCard"

const Dashboard = () => {

    const { slotStore, tenantStore } = useStore();
    const { initialLoading: initialLoadingSlot, availableSlots, loadSlots } = slotStore;
    const { initialLoading: initialLoadingTenant, tenants, loadTenants } = tenantStore;

    useEffect(() => {
        if (!availableSlots.length) loadSlots()
    }, [availableSlots.length, loadSlots])

    useEffect(() => {
        if (!tenants.length) loadTenants()
    }, [tenants.length, loadTenants])

    // useEffect(() => {
    //     if (!availableSlots.length) loadSlots()
    //     if (!tenants.length) loadTenants()
    // }, [availableSlots.length, loadSlots, tenants.length, loadTenants])

    if (initialLoadingSlot && initialLoadingTenant) return (<LoadingComponent content="Loading dashboard..." />)


    return (
        <>
            <DashboardHeader>
                <DashboardHeaderCard title="Slot" subtitle={`${availableSlots.length} available slots`} icon="location arrow" iconColor="pink" />
                <DashboardHeaderCard title="Tenant" subtitle={`${tenants.length} tenants`} icon="users" iconColor="green" />
                <DashboardHeaderCard title="Payment" subtitle="1 new payment" icon="credit card" iconColor="olive" />
                <DashboardHeaderCard title="Late Payment" subtitle="1 late payment" icon="times" iconColor="purple" />
            </DashboardHeader>

            <DashboardBody>
                <DashboardBodyItem iconName="credit card" iconColor="orange" title="ABC Enterprise" description="Made a payment amounting of P400.00" />
                <DashboardBodyItem iconName="credit card" iconColor="orange" title="ABC Enterprise" description="Made a payment amounting of P400.00" />
                <DashboardBodyItem iconName="credit card" iconColor="orange" title="ABC Enterprise" description="Made a payment amounting of P400.00" />
            </DashboardBody>
        </>
    )
}

export default observer(Dashboard)
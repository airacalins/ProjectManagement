import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { fetchSlotsAsync } from "../slot/slotSlice"
import { fetchTenantsAsync } from "../tenant/tenantSlice"

import DashboardBody from "./DashboardBody"
import DashboardBodyItem from "./DashbboardBodyItem"
import DashboardHeader from "./DashboardHeader"
import DashboardHeaderCard from "./DashboardHeaderCard"
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"

const Dashboard = () => {
    const { slots, isFetching: isFetchingSlots } = useAppSelecter(state => state.slot);
    const { tenants, isFetching: isFetchingTenants } = useAppSelecter(state => state.tenant);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTenantsAsync());
        dispatch(fetchSlotsAsync());
    }, [])

    if (isFetchingTenants || isFetchingSlots) return (<LoadingComponent content="Loading dashboard..." />)

    return (
        <>
            <DashboardHeader>
                <DashboardHeaderCard title="Slot" subtitle={`${slots.filter(s => !s.tenantContract).length} available slots`} icon="location arrow" iconColor="pink" />
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

export default Dashboard
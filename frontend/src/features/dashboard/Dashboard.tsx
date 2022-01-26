import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { fetchSlotsAsync } from "../slot/slotSlice"
import { fetchTenantsAsync } from "../tenant/tenantSlice"
import "./dashboard.scss"
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"
import MainPage from "../../app/layouts/components/pages/MainPage"
import DashboardCard from "../../app/layouts/components/cards/DashboardCard"
import { Col, Row } from "react-bootstrap"


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
        <div>
            <MainPage
                title="Dashboard"
                content={
                    <Row className="mx-3">
                        <Col lg={6}>
                            <DashboardCard
                                title={`${slots.filter(s => !s.tenantContract).length} / ${slots.length}`}
                                subtitle="SLOTS"
                                icon={<StorefrontOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />}
                            />
                        </Col>

                        <Col lg={6}>
                            <DashboardCard
                                title={tenants.length}
                                subtitle="TENANTS"
                                icon={<GroupOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />}
                            />
                        </Col>

                        <Col lg={6}>
                            <DashboardCard
                                title="-"
                                subtitle="PENDING PAYMENTS"
                                icon={<PendingActionsOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />}
                            />
                        </Col>

                        <Col lg={6}>
                            <DashboardCard
                                title="-"
                                subtitle="LATE PAYMENTS"
                                icon={<AssignmentLateOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />}
                            />
                        </Col>
                    </Row>
                }
            />
        </div>
    )
}

export default Dashboard
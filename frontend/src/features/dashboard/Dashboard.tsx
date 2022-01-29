import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { Col, Row } from "react-bootstrap"
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import "./dashboard.scss"

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"
import MainPage from "../../app/layouts/components/pages/MainPage"
import DashboardCard from "../../app/layouts/components/cards/DashboardCard"
import { fetchDashboardAsync } from "./DashboardSlice"


const Dashboard = () => {
    const { dashboard: dashboardData, isFetching: isFetchingDashboard } = useAppSelecter(state => state.dashboard);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchDashboardAsync());
    }, [])

    // const { slots, availableSlots, rentedSlots, tenants, unpaidInvoices, latePayments, pendingPayments } = dashboardData

    if (isFetchingDashboard) return (<LoadingComponent content="Loading dashboard..." />)

    return (
        <div>
            <MainPage
                title="Dashboard"
                content={
                    <Row className="mx-3">
                        <Col lg={6}>
                            <DashboardCard
                                title={""}
                                subtitle="SLOTS"
                                icon={<StorefrontOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />}
                                navigateTo="/slots"
                            />
                        </Col>

                        <Col lg={6}>
                            <DashboardCard
                                title={""}
                                subtitle="TENANTS"
                                icon={<GroupOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />}
                                navigateTo="/tenants"
                            />
                        </Col>

                        <Col lg={6}>
                            <DashboardCard
                                title={""}
                                subtitle="PENDING PAYMENTS"
                                icon={<PendingActionsOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />}
                                navigateTo="/payments"
                            />
                        </Col>

                        <Col lg={6}>
                            <DashboardCard
                                title={""}
                                subtitle="LATE PAYMENTS"
                                icon={<AssignmentLateOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />}
                                navigateTo="/payments"
                            />
                        </Col>
                    </Row>
                }
            />
        </div>
    )
}

export default Dashboard
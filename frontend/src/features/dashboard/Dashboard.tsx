import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { Col, Row } from "react-bootstrap"
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import DoDisturbOffOutlinedIcon from '@mui/icons-material/DoDisturbOffOutlined';
import "./dashboard.scss"

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"
import MainPage from "../../app/layouts/components/pages/MainPage"
import DashboardCard from "../../app/layouts/components/cards/DashboardCard"
import { fetchDashboardAsync } from "./DashboardSlice"
import AccessibilityIcon from '@mui/icons-material/Accessibility';

const Dashboard = () => {
    const { dashboard: dashboardData, isFetching: isFetchingDashboard } = useAppSelecter(state => state.dashboard);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!dashboardData)
            dispatch(fetchDashboardAsync());
    }, [])

    const dashboardCardInfos = [
        {
            name: "AVAILABLE SLOTS",
            total: `${dashboardData?.availableSlots} / ${dashboardData?.slots}`,
            icon: <StorefrontOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />,
            navigateTo: "/slots/available"
        },
        {
            name: "RENTED SLOTS",
            total: dashboardData?.rentedSlots,
            icon: <DoDisturbOffOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />,
            navigateTo: "/slots/rented"
        },
        {
            name: "TENANTS",
            total: dashboardData?.tenants,
            icon: <AccessibilityIcon sx={{ fontSize: "80px", color: "#234F5B" }} />,
            navigateTo: "/tenants"
        },
        {
            name: "UNPAID INVOICES",
            total: dashboardData?.unpaidInvoices,
            icon: <MoneyOffIcon sx={{ fontSize: "80px", color: "#234F5B" }} />,
            navigateTo: "/invoices/unpaid"
        },
        {
            name: "PENDING PAYMENTS",
            total: dashboardData?.pendingPayments,
            icon: <PendingActionsOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />,
            navigateTo: "/invoices/pending"
        },
        {
            name: "LATE PAYMENTS",
            total: dashboardData?.latePayments,
            icon: <AssignmentLateOutlinedIcon sx={{ fontSize: "80px", color: "#234F5B" }} />,
            navigateTo: "/invoices/unpaid"
        },
    ]

    if (isFetchingDashboard) return (<LoadingComponent content="Loading dashboard..." />)

    return (
        <div>
            <MainPage
                title="Dashboard"
                content={
                    <Row className="mx-3">
                        {
                            dashboardCardInfos.map(i =>
                                <Col lg={4}>
                                    <DashboardCard
                                        title={i.total}
                                        subtitle={i.name}
                                        icon={i.icon}
                                        navigateTo={i.navigateTo}
                                    />
                                </Col>
                            )
                        }
                    </Row>
                }
            />
        </div>
    )
}

export default Dashboard
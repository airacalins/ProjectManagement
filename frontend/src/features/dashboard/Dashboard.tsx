import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { fetchSlotsAsync } from "../slot/slotSlice"
import { fetchTenantsAsync } from "../tenant/tenantSlice"

import "./dashboard.scss"

import DashboardBody from "./DashboardBody"
import DashboardBodyItem from "./DashbboardBodyItem"
import DashboardHeader from "./DashboardHeader"
import DashboardHeaderCard from "./DashboardHeaderCard"
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"
import { Button, Col, Form, Row } from "react-bootstrap"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

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
            <h4 className="page__title d-flex align-items-center px-4">Dashboard</h4>

            <div className="px-5">
                <Row className="d-flex align-items-center justify-content-between py-4" md={4}>
                    <Col className="d-flex align-items-center p-0" >
                        <Form.Control className="page__form" type="email" placeholder="Search..." />
                    </Col>

                    <Col className="d-flex justify-content-end" md={{ span: 2, offset: 6 }}>
                        <Button className="w-50">Add Slot</Button>
                    </Col>
                </Row>
            </div>


            {/* <DashboardHeader>
                <DashboardHeaderCard title="Slot" subtitle={`${slots.filter(s => !s.tenantContract).length} available slots`} icon="location arrow" iconColor="pink" />
                <DashboardHeaderCard title="Tenant" subtitle={`${tenants.length} tenants`} icon="users" iconColor="green" />
                <DashboardHeaderCard title="Payment" subtitle="1 new payment" icon="credit card" iconColor="olive" />
                <DashboardHeaderCard title="Late Payment" subtitle="1 late payment" icon="times" iconColor="purple" />
            </DashboardHeader>

            <DashboardBody>
                <DashboardBodyItem iconName="credit card" iconColor="orange" title="ABC Enterprise" description="Made a payment amounting of P400.00" />
                <DashboardBodyItem iconName="credit card" iconColor="orange" title="ABC Enterprise" description="Made a payment amounting of P400.00" />
                <DashboardBodyItem iconName="credit card" iconColor="orange" title="ABC Enterprise" description="Made a payment amounting of P400.00" />
            </DashboardBody> */}
        </div>
    )
}

export default Dashboard
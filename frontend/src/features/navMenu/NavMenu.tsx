import { Nav } from "react-bootstrap";

import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

import NavMenuItem from "./NavMenuItem";
import "./navMenu.scss"

const NavMenu = () => {

    return (
        <Nav className="navMenu flex-column" defaultActiveKey="/home">

            <Nav.Link className="navMenu__title text-light px-4 d-flex align-items-center" href="/">MaxiMarket</Nav.Link>

            <NavMenuItem
                name="Dashboard"
                icon={<DashboardCustomizeOutlinedIcon className="me-2" />}
                navigateTo="/dashboard"
            />

            <NavMenuItem
                name="Users"
                icon={<PersonOutlinedIcon className="me-2" />}
                navigateTo="/users"
            />

            <NavMenuItem
                name="Locator"
                icon={<LocationOnOutlinedIcon className="me-2" />}
                navigateTo="/map"
            />

            <NavMenuItem
                name="Slots"
                icon={<StorefrontOutlinedIcon className="me-2" />}
                navigateTo="/slots"
            />

            <NavMenuItem
                name="Tenants"
                icon={<AccessibilityNewOutlinedIcon className="me-2" />}
                navigateTo="/tenants"
            />

            <NavMenuItem
                name="Payments"
                icon={<PointOfSaleOutlinedIcon className="me-2" />}
                navigateTo="/payments"
            />

            <NavMenuItem
                name="Mode of Payments"
                icon={<PaymentOutlinedIcon className="me-2" />}
                navigateTo="/mode-of-payments"
            />

            <NavMenuItem
                name="Announcements"
                icon={<CampaignOutlinedIcon className="me-2" />}
                navigateTo="/announcements"
            />

            <NavMenuItem
                name="Reports"
                icon={<AssessmentOutlinedIcon className="me-2" />}
                navigateTo="/reports"
            />

        </Nav>
    );
}

export default NavMenu;
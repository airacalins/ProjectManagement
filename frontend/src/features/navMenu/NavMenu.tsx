import { Nav } from "react-bootstrap";

import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';

import NavMenuItem from "./NavMenuItem";
import "./navMenu.scss"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { signOut } from "../account/accountSlice";

const NavMenu = () => {

    const account = useAppSelecter(state => state.account);
    const dispatch = useAppDispatch();
    return (
        <Nav className="navMenu flex-column vh-100" defaultActiveKey="/home">

            <Nav.Link className="navMenu__title text-light px-4 d-flex align-items-center" href="/">MaxiMarket</Nav.Link>

            <NavMenuItem
                name="Dashboard"
                icon={<DashboardCustomizeOutlinedIcon className="me-2" />}
                navigateTo="/"
            />
            {
                !!account.user && !!account.user?.roles && account.user?.roles.every(i => i.toLowerCase() !== "admin") &&
                <NavMenuItem
                    name="Staff"
                    icon={<PersonOutlinedIcon className="me-2" />}
                    navigateTo="/users"
                />
            }
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
                name="Invoices"
                icon={<PointOfSaleOutlinedIcon className="me-2" />}
                navigateTo="/invoices"
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

            <div style={{ position: "absolute", bottom: 0 }}>
                <NavMenuItem
                    name="Account"
                    icon={<AccountBoxOutlinedIcon className="me-2" />}
                    navigateTo="/account"
                />

                <NavMenuItem
                    name="Logout"
                    onClick={() => dispatch(signOut())}
                    icon={<LogoutOutlinedIcon className="me-2" />}
                    navigateTo="/"
                />
            </div>


        </Nav>
    );
}

export default NavMenu;
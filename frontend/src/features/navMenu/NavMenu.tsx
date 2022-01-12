import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import NavbarItem from "./NavMenuItem";

const NavMenu = () => {

    return (
        <Menu vertical fluid borderless size="massive">

            <Menu.Item as={Link} to="/" className="navbar navbar__bg--primary">
                MaxiMarket
            </Menu.Item>

            <NavbarItem name="Dashboard" icon="dashboard" navigateTo="/dashboard" />

            <NavbarItem name="Locator" icon="map" navigateTo="/map" />

            <NavbarItem name="Slots" icon="location arrow" navigateTo="/slots" />

            <NavbarItem name="Tenants" icon="user" navigateTo="/tenants" />

            <NavbarItem name="Payments" icon="money" navigateTo="/payments" />

            <NavbarItem name="Mode of Payments" icon="credit card" navigateTo="/mode-of-payments" />

            <NavbarItem name="Announcements" icon="bullhorn" navigateTo="/announcements" />

            <NavbarItem name="Reports" icon="chart bar" navigateTo="/reports" />

        </Menu>
    );
}

export default NavMenu;
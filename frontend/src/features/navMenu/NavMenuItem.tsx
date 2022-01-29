import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
    name: string
    icon: React.ReactNode
    navigateTo: string
}

const NavMenuItem = ({ name, icon, navigateTo }: Props) => {
    return (
        <Nav.Link className="navMenu__text navMenu__text--hover d-flex text-light align-items-center px-4 w-100 my-1" as={Link} to={navigateTo}>
            {icon}
            {name}
        </Nav.Link>
    )
}

export default NavMenuItem;
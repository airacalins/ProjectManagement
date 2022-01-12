import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

interface Props {
    name: string
    navigateTo: string
}

const TabItem = ({ name, navigateTo }: Props) => {
    return (
        <Menu.Item as={NavLink} to={navigateTo} name={name} />
    );
}

export default TabItem;
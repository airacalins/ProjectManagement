import { Link } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";

interface Props {
    name: string,
    navigateTo: string
}

const TabButton = ({ name, navigateTo }: Props) => {
    return (
        <Menu.Menu position='right'>
            <Menu.Item>
                <Button color="orange" as={Link} to={navigateTo} >{name}</Button>
            </Menu.Item>
        </Menu.Menu>
    );
}

export default TabButton;
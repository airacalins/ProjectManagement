import { NavLink } from "react-router-dom";
import { Grid, Icon, Menu } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

interface Props {
    name: string
    icon: SemanticICONS
    navigateTo: string
}

const NavMenuItem = ({ name, icon, navigateTo }: Props) => {
    return (
        <Menu.Item as={NavLink} to={navigateTo}>
            <Grid verticalAlign="middle">
                <Grid.Column width="3">
                    <Icon circular inverted name={icon} color="grey" ></Icon>
                </Grid.Column>

                <Grid.Column width="13">
                    {name}
                </Grid.Column>
            </Grid>
        </Menu.Item>
    )
}

export default NavMenuItem;
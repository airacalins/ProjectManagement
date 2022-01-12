import { Menu } from "semantic-ui-react";

interface Props {
    children: any
}

const Tab = ({ children }: Props) => {
    return (
        <Menu tabular style={{ marginBottom: 0 }}>
            {children}
        </Menu>
    );
}

export default Tab;
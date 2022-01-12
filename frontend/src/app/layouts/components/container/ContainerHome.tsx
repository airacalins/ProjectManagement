import { Grid } from "semantic-ui-react";

interface Props {
    children: any
}


const ContainerHome = ({ children }: Props) => {
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                {children}
            </Grid.Column>
        </Grid>
    );
}

export default ContainerHome;
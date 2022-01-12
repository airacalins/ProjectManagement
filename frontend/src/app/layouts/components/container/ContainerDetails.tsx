import { Link } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";

interface Props {
    children: any
    goBackTo?: any
}
const ContainerDetails = ({ children, goBackTo }: Props) => {
    return (
        <div style={{ marginTop: "75px", marginBottom: "25px" }}>

            <Grid textAlign='center' >
                <Grid.Column width="14">
                    {children}
                </Grid.Column>
            </Grid>

            <Grid textAlign='center' style={{ marginTop: "25px", }} >
                <Grid.Column width="14">
                    <Button as={Link} to={goBackTo} content="Go back" />
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default ContainerDetails;
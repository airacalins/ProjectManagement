import { Grid } from "semantic-ui-react";

interface Props {
    children: any
}


const ContainerForm = ({ children }: Props) => {
    return (
        <Grid centered >
            <Grid.Column width="8" style={{ marginTop: "100px" }} >
                {children}
            </Grid.Column>
        </Grid>
    );
}

export default ContainerForm;
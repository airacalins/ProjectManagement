import { Grid } from "semantic-ui-react";

interface Props {
    children: any
}
const ContainerPage = ({ children }: Props) => {
    return (
        <div style={{ marginTop: "50px", marginBottom: "50px" }}>

            <Grid textAlign='center' >
                <Grid.Column width="14">
                    {children}
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default ContainerPage;
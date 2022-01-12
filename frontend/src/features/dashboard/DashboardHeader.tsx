import { Grid } from "semantic-ui-react";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";

interface Props {
    children: any
}

const DashboardHeader = ({ children }: Props) => {
    return (
        <ContainerPage>
            <Grid columns={4}>
                <Grid.Row>

                    {children}

                </Grid.Row>
            </Grid>
        </ContainerPage >
    )
}
export default DashboardHeader;
import { Header, List, Segment } from "semantic-ui-react"
import ContainerPage from "../../app/layouts/components/container/ContainerPage";

interface Props {
    children: any
}
const DashboardBody = ({ children }: Props) => {
    return (
        <ContainerPage>
            <Segment textAlign="left">
                <Header content="Tenant Updates" />
                <List relaxed="very">

                    {children}

                </List>
            </Segment>
        </ContainerPage>
    )
}

export default DashboardBody;
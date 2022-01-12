import { Grid, Segment, Header, Icon, SemanticICONS, SemanticCOLORS } from "semantic-ui-react";

interface Props {
    title: string,
    subtitle: string,
    icon: SemanticICONS,
    iconColor: SemanticCOLORS
}

const DashboardHeaderCard = ({ title, subtitle, icon, iconColor }: Props) => {
    return (
        <Grid.Column>
            <Segment>
                <Header as='h2'>
                    <Icon name={icon} circular color={iconColor} inverted />
                    <Header.Content>
                        {title}
                        <Header.Subheader>{subtitle}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Segment>
        </Grid.Column>
    )
}
export default DashboardHeaderCard;
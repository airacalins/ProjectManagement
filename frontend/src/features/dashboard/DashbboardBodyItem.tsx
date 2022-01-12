import { List, Icon } from "semantic-ui-react"
import { SemanticCOLORS, SemanticICONS } from "semantic-ui-react/dist/commonjs/generic"

interface Props {
    iconName: SemanticICONS
    iconColor: SemanticCOLORS
    title: string
    description: string
}

const DashboardBodyItem = ({ iconName, iconColor, title, description }: Props) => {
    return (
        <List.Item style={{ marginBottom: "5px" }}>
            <Icon name={iconName} color={iconColor} />
            <List.Content>
                <List.Header as='a'>{title}</List.Header>

                <List.Description>
                    {description}
                </List.Description>

                <List.Description>
                    July 15, 2021
                </List.Description>
            </List.Content>
        </List.Item>
    )
}

export default DashboardBodyItem
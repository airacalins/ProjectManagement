import { Link } from "react-router-dom";
import { Table, Label, SemanticCOLORS } from "semantic-ui-react";

interface Props {
    content: any
    navigateTo?: string
    badgeColor?: SemanticCOLORS
    singleLine?: boolean
    colSpan?: string
}

const TableBody = ({ content, navigateTo, badgeColor, singleLine, colSpan }: Props) => {

    if (badgeColor) return (
        <Table.Cell singleLine={singleLine}>
            <Label content={content} color={badgeColor}></Label>
        </Table.Cell>
    )

    if (navigateTo) return (
        <td>
            <Table.Cell singleLine={singleLine} as={Link} to={navigateTo}>
                {content}
            </Table.Cell>
        </td>
    )

    if (colSpan) return (
        <Table.Row >
            <Table.Cell colSpan={colSpan} textAlign="center">
                <i>{content}</i>
            </Table.Cell>
        </Table.Row>
    )

    return (
        <Table.Cell singleLine={singleLine}>{content}</Table.Cell>
    )

}

export default TableBody;
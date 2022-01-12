import { Table } from "semantic-ui-react";

interface Props {
    tableHeader: any,
    tableBody: any
}

const TableComponent = ({ tableHeader, tableBody }: Props) => {
    return (
        <Table color="black" padded="very" style={{ marginTop: 0 }}>
            <Table.Header>
                <Table.Row>
                    {tableHeader}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {tableBody}
            </Table.Body>
        </Table>
    );
}

export default TableComponent;
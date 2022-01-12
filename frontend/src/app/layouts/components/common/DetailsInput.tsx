import { Table } from "semantic-ui-react";

interface Props {
    label: string,
    input: any
}

const DetailsInput = ({ label, input }: Props) => {
    return (
        <Table.Row>
            <Table.Cell width={4} >{label}</Table.Cell>
            <Table.Cell>{input}</Table.Cell>
        </Table.Row>
    );
}

export default DetailsInput;
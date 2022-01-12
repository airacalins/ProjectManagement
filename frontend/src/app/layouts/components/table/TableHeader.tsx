import { Table } from "semantic-ui-react";

interface Props {
    name: string
}

const TableHeader = ({ name }: Props) => {
    return (
        <Table.HeaderCell singleLine>{name}</Table.HeaderCell>
    );
}

export default TableHeader;
import { Table } from "semantic-ui-react";
import TableBody from "../../app/layouts/components/table/TableBody";
import TableComponent from "../../app/layouts/components/table/TableComponent";
import TableHeader from "../../app/layouts/components/table/TableHeader";
import { ITenant } from "../../app/models/tenant";

interface Props {
    tenants: ITenant[]
}

const TenantTable = ({ tenants }: Props) => {
    return (
        <TableComponent
            tableHeader={
                <>
                    <TableHeader name="Full Name" />
                    <TableHeader name="Business Name" />
                    <TableHeader name="Contact Number" />
                    <TableHeader name="Rented Slot" />
                    <TableHeader name="" />
                </>
            }

            tableBody={
                !tenants.length ?
                    <TableBody colSpan="5" content="No tenants..." />
                    :
                    tenants.map(t => (
                        <Table.Row key={t.id}>
                            <TableBody content={`${t.firstName} ${t.lastName}`} />
                            <TableBody content={t.companyName} />
                            <TableBody content={t.phone} />
                            <TableBody content={t.slotContract?.slot.slotNumber} />
                            <TableBody content=">" navigateTo={`/tenants/${t.id}/details`} />
                        </Table.Row>
                    ))

            } />
    )
}

export default TenantTable;
import { Table } from "semantic-ui-react";
import TableBody from "../../app/layouts/components/table/TableBody";
import TableComponent from "../../app/layouts/components/table/TableComponent";
import TableHeader from "../../app/layouts/components/table/TableHeader";
import { currencyFormatter } from "../../app/layouts/formatter/common";
import { ISlot } from "../../app/models/slot";

interface Props {
    slots: ISlot[]
}

const SlotTable = ({ slots }: Props) => {

    return (
        <TableComponent
            tableHeader={
                <>
                    <TableHeader name="Slot Number" />
                    <TableHeader name="Size" />
                    <TableHeader name="Rental Fee" />
                    <TableHeader name="Status" />
                    <TableHeader name="" />
                </>
            }

            tableBody={
                !slots.length ?
                    <TableBody colSpan="5" content="No slots..." />
                    :
                    slots.map(s => (
                        <Table.Row key={s.id}>
                            <TableBody content={s.slotNumber} />
                            <TableBody content={`${s.size} sqm.`} />
                            <TableBody content={`${currencyFormatter(s.price)} / monthly`} />
                            <TableBody content={s.tenantContract ? "Rented" : "Available"} badgeColor={s.tenantContract ? "blue" : "green"} />
                            <TableBody content=">" navigateTo={`/slots/${s.id}/details`} />
                        </Table.Row>
                    ))
            }
        />
    );
}

export default SlotTable;
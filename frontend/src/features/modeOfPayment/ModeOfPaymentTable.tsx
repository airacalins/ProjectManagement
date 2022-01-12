import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import { ModeOfPayment } from "../../app/models/modeOfPayment";
import TableBody from "../../app/layouts/components/table/TableBody";
import TableComponent from "../../app/layouts/components/table/TableComponent";
import TableHeader from "../../app/layouts/components/table/TableHeader";

interface Props {
    modeOfPayments: ModeOfPayment[]
}

const ModeOfPaymentTable = ({ modeOfPayments }: Props) => {
    return (
        <TableComponent
            tableHeader={
                <>
                    <TableHeader name="Bank Name" />
                    <TableHeader name="Account Name" />
                    <TableHeader name="Account Number" />
                    <TableHeader name="Show" />
                    <TableHeader name="" />
                </>
            }

            tableBody={
                !modeOfPayments.length ?
                    <TableBody colSpan="5" content="No mode of payments..." />
                    :
                    modeOfPayments.map(mop => (
                        <>
                            <TableBody content={mop.bankName} />
                            <TableBody content={mop.accountName} />
                            <TableBody content={mop.accountNumber} />
                            <TableBody content={<Icon name="toggle on" color="blue" size="large"></Icon>} />
                            <TableBody content=">" navigateTo={`/mode-of-payments/${mop.id}/details`} />
                        </>
                    ))
            } />)
}

export default observer(ModeOfPaymentTable);
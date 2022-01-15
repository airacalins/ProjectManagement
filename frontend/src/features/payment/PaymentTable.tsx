import SearchBar from "../../app/layouts/components/SearchBar";
import TableBody from "../../app/layouts/components/table/TableBody";
import TableComponent from "../../app/layouts/components/table/TableComponent";
import TableHeader from "../../app/layouts/components/table/TableHeader";

const PaymentTable = () => {
    return (
        <>
            <SearchBar isLoading={false} value="" />

            <TableComponent
                tableHeader={
                    <>
                        <TableHeader name="Slot Number" />
                        <TableHeader name="Rental Fee" />
                        <TableHeader name="Date of Payment" />
                        <TableHeader name="Mode of Payment" />
                        <TableHeader name="Status" />
                        <TableHeader name="" />
                    </>
                }

                tableBody={
                    <>
                        <TableBody content="A-001" />
                        <TableBody content="P 12,000" />
                        <TableBody content="July 14, 2021" />
                        <TableBody content="BDO - Bank Transfer" />
                        <TableBody content="Status" badgeColor="red" />
                        <TableBody content=">" navigateTo="/payment/1/details" />
                    </>
                } />
        </>
    );
}

export default PaymentTable;
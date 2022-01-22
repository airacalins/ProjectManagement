import { Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridValueGetterParams } from "@mui/x-data-grid";
import { Label, Table } from "semantic-ui-react";
import SearchBar from "../../app/layouts/components/SearchBar";
import TableBody from "../../app/layouts/components/table/TableBody";
import TableComponent from "../../app/layouts/components/table/TableComponent";
import TableHeader from "../../app/layouts/components/table/TableHeader";
import { currencyFormatter } from "../../app/layouts/formatter/common";
import { ISlot } from "../../app/models/slot";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import history from '../../app/utils/history';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
  slots: ISlot[]
}

// const SlotTable = ({ slots }: Props) => {

//     return (
//         <>
//             <SearchBar isLoading={false} value="" />

//             <TableComponent
//                 tableHeader={
//                     <>
//                         <TableHeader name="Slot Number" />
//                         <TableHeader name="Size" />
//                         <TableHeader name="Rental Fee" />
//                         <TableHeader name="Status" />
//                         <TableHeader name="" />
//                     </>
//                 }

//                 tableBody={
//                     !slots.length ?
//                         <TableBody colSpan="5" content="No slots..." />
//                         :
//                         slots.map(s => (
//                             <Table.Row key={s.id}>
//                                 <TableBody content={s.slotNumber} />
//                                 <TableBody content={`${s.size} sqm.`} />
//                                 <TableBody content={!!s.price ? `${currencyFormatter(s.price)} / monthly` : 'Not Configured'} />
//                                 <TableBody content={s.tenantContract ? "Rented" : "Available"} badgeColor={s.tenantContract ? "blue" : "green"} />
//                                 <TableBody content=">" navigateTo={`/slots/${s.id}/details`} />
//                             </Table.Row>
//                         ))
//                 }
//             />
//         </>
//     );
// }

const SlotTable = ({ slots }: Props) => {
  const columns = [
    { field: 'slotNumber', headerName: 'Slot Number', minWidth: 130 },
    { field: 'size', headerName: 'Size', minWidth: 130 },
    { field: 'price', headerName: 'Rental Fee', minWidth: 130 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      renderCell: (params: GridValueGetterParams) => <Label content={params.row.tenantContract ? "Rented" : "Available"} color={params.row.tenantContract ? "blue" : "green"}></Label>,
      // valueGetter: (params: GridValueGetterParams) => `${params.row.tenantContract ? "Rented" : "Available"}`
    },
    {
      field: 'id',
      type: 'actions',
      width: 100,
      getActions: (params: GridValueGetterParams) => [
        <GridActionsCellItem icon={<VisibilityIcon />} label="Edit" onClick={() => history.push(`/slots/${params.row.id}/details`)}/>
      ],
    },
  ]
  return (
    <Paper>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={slots}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </Paper>
  );
}

export default SlotTable;
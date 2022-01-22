import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { ISlot } from '../../app/models/slot';
import CustomTablePagination from '../../app/layouts/ui/tablePagination/CustomTablePagination';
import CustomTable from '../../app/layouts/ui/table/CustomTable';
import { GridActionsCellItem, GridValueGetterParams } from '@mui/x-data-grid';
import { Label } from 'semantic-ui-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import history from '../../app/utils/history';
import './slot.scss';

interface Props {
  slots: ISlot[]
}

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const SlotTable = ({ slots }: Props) => {
    const columns = [
    { title: 'Slot Number'},
    { title: 'Size'},
    { title: 'Rental Fee' },
    { title: 'Status' },
    { title: '' },
  ]

  return (
    <CustomTable
      columns={columns}
      rows={slots.map(slot => <TableRow key={slot.id}>
        <TableCell component="td" scope="row">
          {slot.slotNumber}
        </TableCell>
        <TableCell style={{ width: 50 }} align="right">
          {slot.size}
        </TableCell>
        <TableCell style={{ width: 100 }} align="right">
          {slot.price}
        </TableCell>
        <TableCell style={{ width: 160 }} align="left">
          <Label content={slot.tenantContract ? "Rented" : "Available"} color={slot.tenantContract ? "blue" : "green"}></Label>
        </TableCell>
        <TableCell style={{ width: 50 }} align="right">
          <VisibilityIcon onClick={() => history.push(`/slots/${slot.id}/details`)} />
        </TableCell>
      </TableRow>)}
    />
  );
}

export default SlotTable;
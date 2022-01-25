import { ISlot } from '../../app/models/slot';
import { Label } from 'semantic-ui-react';
import history from '../../app/utils/history';
import CustomTable from '../../app/layouts/ui/table/CustomTable';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    { title: 'Slot Number' },
    { title: 'Size' },
    { title: 'Rental Fee' },
    { title: 'Status' },
    { title: '' },
  ]

  return (
    <CustomTable
      columns={columns}
      rows={slots.map(slot => <TableRow key={slot.id}>

        <TableCell align="center">
          {slot.slotNumber}
        </TableCell>

        <TableCell align="center">
          {slot.size}
        </TableCell>

        <TableCell align="center">
          {slot.price}
        </TableCell>

        <TableCell align="center">
          <Label content={slot.tenantContract ? "Rented" : "Available"} color={slot.tenantContract ? "blue" : "green"}></Label>
        </TableCell>

        <TableCell align="right">
          <VisibilityIcon onClick={() => history.push(`/slots/${slot.id}/details`)} />
        </TableCell>

      </TableRow>)}
    />
  );
}

export default SlotTable;
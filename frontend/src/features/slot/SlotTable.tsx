import { ISlot } from '../../app/models/slot';
import { Label } from 'semantic-ui-react';
import history from '../../app/utils/history';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CustomTable from '../../app/layouts/components/table/CustomTable';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
  slots: ISlot[]
}

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

      </TableRow>
      )}
    />
  );
}

export default SlotTable;
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotsAsync } from "./slotSlice";
import history from '../../app/utils/history';

import { Label } from 'semantic-ui-react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import CustomTable from "../../app/layouts/components/table/CustomTable";

const Slot = () => {
  const [searchKey, setSearchKey] = useState('');
  const { slots, isFetching: isFetchingSlots } = useAppSelecter(state => state.slot);

  const dispatch = useAppDispatch();

  const data = useMemo(() => {
    if (!!searchKey) {
      return slots.filter(i => i.slotNumber.toLowerCase().includes(searchKey.toLowerCase()));
    }
    return slots;
  }, [slots, searchKey])

  useEffect(() => {
    dispatch(fetchSlotsAsync());
  }, [])

  const columns = [
    { title: 'Slot Number' },
    { title: 'Size' },
    { title: 'Rental Fee' },
    { title: 'Status' },
    { title: '' },
  ]

  if (isFetchingSlots) return <LoadingComponent content="Loading Slots..." />

  return (
    <MainPage
      title="Slots"
      content={
        <CustomTable
          columns={columns}
          rows=
          {
            slots.map(slot =>
              <TableRow key={slot.id}>

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
            )
          }
          searchValue={searchKey}
          onSearch={(value: string) => setSearchKey(value)}
          buttonTitle="Create Slot"
          navigateTo="/slots/create" />
      }
    />
  )
}


export default Slot;
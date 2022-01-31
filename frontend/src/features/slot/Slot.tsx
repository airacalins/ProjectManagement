import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotsAsync } from "./slotSlice";
import history from '../../app/utils/history';

import { Label, Select } from 'semantic-ui-react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import CustomTable from "../../app/layouts/components/table/CustomTable";
import { currencyFormatter } from "../../app/layouts/formatter/common";
import { getSlotStatusColor, getSlotStatusText } from "../../app/utils/common";
import { SlotStatus } from "../../app/models/slot";

const Slot = () => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<SlotStatus | undefined>(undefined);
  const { slots, isFetching: isFetchingSlots } = useAppSelecter(state => state.slot);

  const dispatch = useAppDispatch();

  const data = useMemo(() => {
    let searchResult = slots;
    if (!!searchKey) {
      searchResult = searchResult.filter(i => i.slotNumber.toLowerCase().includes(searchKey.toLowerCase()));
    }

    if (!!selectedStatus) {
      searchResult = searchResult.filter(i => i.status === selectedStatus);
    }

    return searchResult;
  }, [slots, searchKey, selectedStatus])

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

  const slotStatusOptions = [
    { text: 'All', value: undefined },
    { text: getSlotStatusText(SlotStatus.Available), value: SlotStatus.Available },
    { text: getSlotStatusText(SlotStatus.Rented), value: SlotStatus.Rented },
    { text: getSlotStatusText(SlotStatus.Reserved), value: SlotStatus.Reserved },
    { text: getSlotStatusText(SlotStatus.UnderMaintenance), value: SlotStatus.UnderMaintenance },
    { text: getSlotStatusText(SlotStatus.Archived), value: SlotStatus.Archived }
  ]

  if (isFetchingSlots) return <LoadingComponent content="Loading Slots..." />

  return (
    <MainPage
      title="Slots"
      content={
        <CustomTable
          searchValue={searchKey}
          onSearch={(value: string) => setSearchKey(value)}
          buttonTitle="Add Slot"
          navigateTo="/slots/create"
          columns={columns}
          tableControls={
            <Select
              options={slotStatusOptions}
              value={selectedStatus}
              onChange={(e, d) => setSelectedStatus(!!d.value ? d.value as SlotStatus : undefined)}
              name="slotId"
              placeholder="Slot Number"
              label="Slot Number"
            />
          }
          rows=
          {
            !data.length ?
              [
                <TableRow>
                  <TableCell align="center" colSpan={columns.length}>
                    No data
                  </TableCell>
                </TableRow>
              ]
              :
              data.map(slot =>
                <TableRow key={slot.id}>

                  <TableCell align="center">
                    {slot.slotNumber}
                  </TableCell>

                  <TableCell align="center">
                    {slot.size}
                  </TableCell>

                  <TableCell align="center">
                    {currencyFormatter(slot.price!)}
                  </TableCell>

                  <TableCell align="center">
                    <Label content={getSlotStatusText(slot.status)} color={getSlotStatusColor(slot.status)}></Label>
                  </TableCell>

                  <TableCell align="right">
                    <NavigateNextOutlinedIcon onClick={() => history.push(`/slots/${slot.id}/details`)} />
                  </TableCell>

                </TableRow>
              )
          }
        />
      }
    />
  )
}


export default Slot;
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../app/layouts/formatter/common";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { deleteSlotDetailsAsync, fetchSlotDetailsAsync, fetchSlotTanantsAsync } from "./slotSlice";
import { getSlotStatusColor, getSlotStatusText } from "../../app/utils/common";

import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import DetailItem from "../../app/layouts/components/items/DetailItem";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import NavigationButton from "../../app/layouts/components/buttons/NavigationButton";
import { Label, Select } from "semantic-ui-react";
import DeleteButton from "../../app/layouts/components/buttons/DeleteButton";
import history from "../../app/utils/history";
import { SlotStatus } from "../../app/models/slot";
import CustomTable from "../../app/layouts/components/table/CustomTable";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

const SlotDetails = () => {

  const [searchKey, setSearchKey] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<boolean | undefined>(true);

  const { id } = useParams<{ id: string }>();

  const { slot, isFetchingDetails, isSaving, tenants } = useAppSelecter(state => state.slot);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchSlotDetailsAsync(id));
      dispatch(fetchSlotTanantsAsync(id))
    }
  }, [])


  const data = useMemo(() => {
    let searchResult = tenants;
    if (!!searchKey) {
      searchResult = tenants.filter(i => i.firstName.toLowerCase().includes(searchKey.toLowerCase())
        || i.lastName.toLowerCase().includes(searchKey.toLowerCase())
        || i.businessName.toLowerCase().includes(searchKey.toLowerCase())
        || i.phone.toLowerCase().includes(searchKey.toLowerCase())
        || (!!i.contract && i.contract?.slotNumber.toLowerCase().includes(searchKey.toLowerCase())));
    }

    if (!!selectedStatus) {
      searchResult = searchResult.filter(i => i.isActive === selectedStatus)
    }

    return searchResult;
  }, [tenants, searchKey, selectedStatus])

  if (isFetchingDetails || !slot) return (<LoadingComponent content="Loading slot details..." />)

  const handleDelete = () => {
    if (id) dispatch(deleteSlotDetailsAsync(id));
    history.push('/slots')
  }
  const columns = [
    { title: 'Account Number' },
    { title: 'Full Name' },
    { title: 'Business Name' },
    { title: 'Contact Number' },
    { title: 'Slot' },
    { title: 'Status' },
    { title: '' },
  ]

  const tenantStatusOptions = [
    { text: "All", value: undefined },
    { text: "Active", value: true },
    { text: "Not active", value: false }
  ]
  return (
    <>

      <DetailsPage
        title="Slot Details"
        backNavigationLink="/slots"
        content={
          <>
            <DetailItem title="Status" value={<Label content={getSlotStatusText(slot.status)} color={getSlotStatusColor(slot.status)}></Label>} />
            <DetailItem title="Slot Number" value={slot.slotNumber} />
            <DetailItem title="Size" value={`${slot.size} sqm.`} />
            <DetailItem title="Rental Fee" value={slot.price ? currencyFormatter(slot.price) : "Not Configured"} />
            <FormButtonContainer>
              <NavigationButton title="Edit" navigateTo={`/slots/${id}/manage`} />
              {
                slot.status == SlotStatus.Available &&
                <DeleteButton onClick={handleDelete} loading={isSaving} />
              }
            </FormButtonContainer>
          </>
        }
      />

      <DetailsPage
        title="Tenants history"
        content={<>
          <CustomTable
            buttonTitle={slot.status == SlotStatus.Available ? "Add Tenant" : undefined}
            navigateTo={`/tenants/${slot.id}/create`}
            columns={columns}
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
                data.map(tenant => <TableRow key={tenant.id}>
                  <TableCell align="center">
                    {tenant.tenantUniqueId}
                  </TableCell>

                  <TableCell align="center">
                    {`${tenant.firstName} ${tenant.lastName}`}
                  </TableCell>

                  <TableCell align="center">
                    {tenant.businessName}
                  </TableCell>

                  <TableCell align="center">
                    {tenant.phone}
                  </TableCell>

                  <TableCell align="center">
                    {tenant.contract?.slotNumber}
                  </TableCell>

                  <TableCell align="center">
                    {
                      tenant.isActive ?
                        <Label color="orange" content="Active" /> :
                        <Label color="red" content="Not Active" />
                    }
                  </TableCell>

                  <TableCell align="right">
                    <NavigateNextOutlinedIcon onClick={() => history.push(`/tenants/${tenant.id}/details`)} />
                  </TableCell>

                </TableRow>
                )
            }
          />
        </>
        }
      />
    </>
  );
}

export default SlotDetails;
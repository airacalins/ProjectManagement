import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Button, Message } from "semantic-ui-react";
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails"
import Details from "../../app/layouts/components/common/Details";
import DetailsInput from "../../app/layouts/components/common/DetailsInput";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { currencyFormatter, dateFormatter } from "../../app/layouts/formatter/common";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { deleteSlotDetailsAsync, fetchSlotDetailsAsync } from "./slotSlice";
import { getSlotStatusText } from "../../app/utils/common";
import { SlotStatus } from "../../app/models/slot";
import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import DetailItem from "../../app/layouts/components/items/DetailItem";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";
import NavigationButton from "../../app/layouts/components/buttons/NavigationButton";

const SlotDetails = () => {

  const { id } = useParams<{ id: string }>();

  const { slot, isFetchingDetails, isSaving } = useAppSelecter(state => state.slot);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSlotDetailsAsync(id));
  }, [])

  if (isFetchingDetails || !slot) return (<LoadingComponent content="Loading slot details..." />)

  const onDelete = () => {
    if (id) dispatch(deleteSlotDetailsAsync(id));
  }

  return (
    <>

      <DetailsPage
        title="Slot Details"
        backNavigationLink="/slots"
        content={
          <>
            <DetailItem title="Slot Number" value={slot.slotNumber} />
            <DetailItem title="Size" value={`${slot.size} sqm.`} />
            <DetailItem title="Rental Fee" value={slot.price ? currencyFormatter(slot.price) : "Not Configured"} />
            <DetailItem title="Next Billing Date" value={getSlotStatusText(slot.status)} />
            <FormButtonContainer>
              <NavigationButton title="Edit" navigateTo={`/slots/${id}/manage`} />
            </FormButtonContainer>
          </>
        }
      />

      <DetailsPage
        title="Tenant"
        content={
          slot.tenantContract ?
            <>
              <DetailItem title="Business Name" value={slot.tenantContract?.tenant.companyName} />
              <DetailItem title="First Name" value={slot.tenantContract?.tenant.firstName} />
              <DetailItem title="Last Name" value={slot.tenantContract?.tenant.lastName} />
              <DetailItem title="Address" value={slot.tenantContract?.tenant.address} />
              <DetailItem title="Contact Number" value={slot.tenantContract?.tenant.phone} />
            </> :
            <NavigationButton title="Add Tenant" navigateTo="/tenants/create" />
        }
      />

      {
        slot.tenantContract &&
        <DetailsPage
          title="Contract"
          content={
            <>
              {/* <DetailItem title="Advance Payment" value={currencyFormatter(slot.tenantContract?.advance)} />
              <DetailItem title="Deposit" value={currencyFormatter(slot.tenantContract?.deposit)} />
              <DetailItem title="Contract Price" value={currencyFormatter(slot.tenantContract?.contractPrice)} />
              <DetailItem title="Contract Start Date" value={dateFormatter(slot.tenantContract?.contractStartDate)} />
              <DetailItem title="Contract End Date" value={dateFormatter(slot.tenantContract?.contractEndDate)} /> */}
            </>
          }
        />
      }

    </>
  );
}

export default SlotDetails;
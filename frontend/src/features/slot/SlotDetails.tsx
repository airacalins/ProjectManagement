import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../app/layouts/formatter/common";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { deleteSlotDetailsAsync, fetchSlotDetailsAsync } from "./slotSlice";
import { getSlotStatusColor, getSlotStatusText } from "../../app/utils/common";

import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import DetailItem from "../../app/layouts/components/items/DetailItem";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import NavigationButton from "../../app/layouts/components/buttons/NavigationButton";
import { Label } from "semantic-ui-react";

const SlotDetails = () => {

  const { id } = useParams<{ id: string }>();

  const { slot, isFetchingDetails, isSaving } = useAppSelecter(state => state.slot);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchSlotDetailsAsync(id));
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
            <DetailItem title="Next Billing Date" value={<Label content={getSlotStatusText(slot.status)} color={getSlotStatusColor(slot.status)}></Label>} />
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
              <DetailItem title="Business Name" value={slot.tenantContract?.tenant.businessName} />
              <DetailItem title="First Name" value={slot.tenantContract?.tenant.firstName} />
              <DetailItem title="Last Name" value={slot.tenantContract?.tenant.lastName} />
              <DetailItem title="Address" value={slot.tenantContract?.tenant.address} />
              <DetailItem title="Contact Number" value={slot.tenantContract?.tenant.phone} />
            </> :
            <NavigationButton title="Add Tenant" navigateTo={`/tenants/${slot.id}/create`} />
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
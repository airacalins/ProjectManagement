import { useEffect } from "react";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabButton from "../../app/layouts/components/tabs/TabButton";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import SlotTable from "./SlotTable";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotsAsync } from "./slotSlice";

const Slot = () => {

  const { slots, isFetching: isFetchingSlots } = useAppSelecter(state => state.slot);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSlotsAsync());
  }, [])


  if (isFetchingSlots) return <LoadingComponent content="Loading Slots..." />

  return (
    <ContainerPage
      children={
        <>
          <Tab>
            <TabItem name="All" navigateTo="/slots" />
            <TabItem name="Rented" navigateTo="/slots/rented" />
            <TabItem name="Available" navigateTo="/slots/available" />
            <TabButton name="Add Slot" navigateTo="/slots/create" />
          </Tab>

          <SlotTable slots={slots} />
        </>
      } />
  );
}

export default Slot;
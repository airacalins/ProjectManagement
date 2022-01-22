import { useEffect } from "react";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabButton from "../../app/layouts/components/tabs/TabButton";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import SlotTable from "./SlotTable";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotsAsync } from "./slotSlice";
import { Card } from "semantic-ui-react";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardHeaderCard from "../dashboard/DashboardHeaderCard";
import SearchBar from "../../app/layouts/components/SearchBar";

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
          <SlotTable slots={slots} />
        </>
      } />
  );
}

export default Slot;
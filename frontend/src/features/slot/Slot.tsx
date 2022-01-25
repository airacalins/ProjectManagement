import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotsAsync } from "./slotSlice";

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import SlotTable from "./SlotTable";
import MainPage from "../../app/layouts/components/pages/MainPage";

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

  if (isFetchingSlots) return <LoadingComponent content="Loading Slots..." />

  return (
    <MainPage
      title="Slots"
      content={<SlotTable slots={data} />}
      searchValue={searchKey}
      onSearch={(value: string) => setSearchKey(value)}
      buttonTitle="Add Slot"
      navigateTo="/slots/create"
    />
  );
}

export default Slot;
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotsAsync } from "./slotSlice";

import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import SearchBar from "../../app/layouts/components/SearchBar";
import SlotTable from "./SlotTable";
import TabButton from "../../app/layouts/components/tabs/TabButton";
import { Grid } from "semantic-ui-react";
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
      searchValue={searchKey}
      onSearch={(value: string) => setSearchKey(value)}
      title="Slots"
      buttonTitle="Add Slot"
      content={<SlotTable slots={data} />}
    />

    // <ContainerPage
    //   children={
    //     <>


    //       <Grid>
    //         <Grid.Column floated='left' width={5}>
    //           <SearchBar />
    //         </Grid.Column>

    //         <Grid.Column floated='right' width={5}>
    //           <TabButton name="Add Slot" navigateTo="/slots/create" />
    //         </Grid.Column>
    //       </Grid>

    //       <SlotTable slots={slots} />
    //     </>
    //   } />
  );
}

export default Slot;
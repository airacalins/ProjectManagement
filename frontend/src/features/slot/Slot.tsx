import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabButton from "../../app/layouts/components/tabs/TabButton";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import SlotTable from "./SlotTable";

const Slot = () => {

    const { slotStore } = useStore();
    const { initialLoading, loadSlots, slots } = slotStore;

    useEffect(() => {
        loadSlots()
    }, [loadSlots])

    if (initialLoading) return <LoadingComponent content="Loading Slots..." />

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

export default observer(Slot);
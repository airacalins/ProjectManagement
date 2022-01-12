import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabButton from "../../app/layouts/components/tabs/TabButton";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import { useStore } from "../../app/stores/store";
import AnnouncementTable from "./AnnouncementTable";

const Announcement = () => {

    const { announcementStore } = useStore();
    const { initialLoading, loadAnnouncements, announcements } = announcementStore;

    useEffect(() => {
        loadAnnouncements()
    }, [loadAnnouncements])

    if (initialLoading) return <LoadingComponent content="Loading Announcements..." />

    return (
        <ContainerPage
            children={
                <>
                    <Tab>
                        <TabItem name="All" navigateTo="./announcements" />
                        <TabButton name="Add Announcement" navigateTo="/announcements/create" />
                    </Tab>

                    <AnnouncementTable announcements={announcements} />
                </>
            } />);
}

export default observer(Announcement);
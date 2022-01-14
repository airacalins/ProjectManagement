import { useEffect } from "react";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabButton from "../../app/layouts/components/tabs/TabButton";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchTenantsAsync } from "../tenant/tenantSlice";
import { fetchAnnouncementsAsync } from "./announcementSlice";
import AnnouncementTable from "./AnnouncementTable";

const Announcement = () => {

    const {announcements, isFetching} = useAppSelecter(state => state.announcement);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(fetchAnnouncementsAsync());
    }, [])
  

    if (isFetching) return <LoadingComponent content="Loading Announcements..." />

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

export default Announcement;
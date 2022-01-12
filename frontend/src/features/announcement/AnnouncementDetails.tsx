import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Details from "../../app/layouts/components/common/Details"
import DetailsAction from "../../app/layouts/components/common/DetailsAction"
import DetailsInput from "../../app/layouts/components/common/DetailsInput"
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails"
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"
import { dateFormatter } from "../../app/layouts/formatter/common"
import { useStore } from "../../app/stores/store"

const AnnouncementDetails = () => {

    const { announcementStore } = useStore()
    const { initialLoading, announcements, loadAnnouncement, selectAnnouncement, selectedAnnouncement: announcement } = announcementStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!announcements) selectAnnouncement(+id)
        if (!announcement) loadAnnouncement(+id)
    }, [id, announcements, selectAnnouncement, announcement, loadAnnouncement])

    if (initialLoading || !announcement) return (<LoadingComponent content="Loading announcement details..." />)

    return (
        <ContainerDetails goBackTo={"/announcements"} >

            <Details
                title="Announcement Details"
                detailsInput={
                    <>
                        <DetailsInput label="Date Created" input={dateFormatter(announcement?.dateCreated)} />
                        <DetailsInput label="Subject" input={announcement?.subject} />
                        <DetailsInput label="Message" input={announcement?.message} />
                    </>
                }
                detailsButton={
                    <>
                        <DetailsAction name="Edit" icon="pencil" color="yellow" />
                        <DetailsAction name="Delete" icon="trash" color="red" />
                    </>
                }
            />

        </ContainerDetails >
    )
}

export default observer(AnnouncementDetails)
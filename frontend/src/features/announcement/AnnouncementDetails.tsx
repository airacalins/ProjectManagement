import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Details from "../../app/layouts/components/common/Details"
import DetailsAction from "../../app/layouts/components/common/DetailsAction"
import DetailsInput from "../../app/layouts/components/common/DetailsInput"
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails"
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"
import { dateFormatter } from "../../app/layouts/formatter/common"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { fetchAnnouncementDetailsAsync } from "./announcementSlice"

const AnnouncementDetails = () => {
    
    const {announcement, isFetchingDetails} = useAppSelecter(state => state.announcement);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();
  
    useEffect(() => {
      dispatch(fetchAnnouncementDetailsAsync(id));
    }, [])

    if (isFetchingDetails || !announcement) return (<LoadingComponent content="Loading announcement details..." />)

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

export default AnnouncementDetails
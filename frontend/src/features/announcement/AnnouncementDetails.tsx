import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { dateFormatter } from "../../app/layouts/formatter/common"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { fetchAnnouncementDetailsAsync } from "./announcementSlice"

import DeleteButton from "../../app/layouts/components/buttons/DeleteButton"
import DetailItem from "../../app/layouts/components/items/DetailItem"
import DetailsPage from "../../app/layouts/components/pages/DetailsPage"
import EditButton from "../../app/layouts/components/buttons/EditButton"
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer"
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"

const AnnouncementDetails = () => {

    const { announcement, isFetchingDetails } = useAppSelecter(state => state.announcement);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(fetchAnnouncementDetailsAsync(id));
    }, [])

    if (isFetchingDetails || !announcement) return (<LoadingComponent content="Loading announcement details..." />)

    const { dateCreated, title, message } = announcement

    return (

        <DetailsPage
            title="Announcement Details"
            backNavigationLink={`/announcements`}
            content={
                <>
                    <DetailItem title="Date Created" value={dateFormatter(dateCreated)} />
                    <DetailItem title="Subject" value={title} />
                    <DetailItem title="Message" value={message} />
                    <FormButtonContainer>
                        <EditButton navigateTo={`/announcements/${id}/manage`} />
                        <DeleteButton navigateTo="" />
                    </FormButtonContainer>
                </>
            }
        />

    )
}

export default AnnouncementDetails
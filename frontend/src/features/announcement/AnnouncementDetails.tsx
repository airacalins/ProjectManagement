import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { dateFormatter } from "../../app/layouts/formatter/common"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { fetchAnnouncementDetailsAsync, updateAnnouncementDetailsAsync } from "./announcementSlice"

import DetailItem from "../../app/layouts/components/items/DetailItem"
import DetailsPage from "../../app/layouts/components/pages/DetailsPage"
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer"
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"
import NavigationButton from "../../app/layouts/components/buttons/NavigationButton"
import DeleteButton from "../../app/layouts/components/buttons/DeleteButton"

const AnnouncementDetails = () => {

    const { announcement, isFetchingDetails } = useAppSelecter(state => state.announcement);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(fetchAnnouncementDetailsAsync(id));
    }, [])

    if (isFetchingDetails || !announcement) return (<LoadingComponent content="Loading announcement details..." />)

    // const handleDelete = (announcementId) => {
    //     dispatch(updateAnnouncementDetailsAsync(announcementId));
    // }

    const { id: announcementId, dateCreated, title, message } = announcement;

    return (

        <DetailsPage
            title="Announcement Details"
            backNavigationLink="/announcements"
            content={
                <>
                    <DetailItem title="Date Created" value={dateFormatter(dateCreated)} />
                    <DetailItem title="Subject" value={title} />
                    <DetailItem title="Message" value={message} />
                    <FormButtonContainer>
                        <NavigationButton title="Edit" navigateTo={`/announcements/${id}/manage`} />
                        {/* <DeleteButton onClick={handleDelete(announcementId)} /> */}
                    </FormButtonContainer>
                </>
            }
        />

    )
}

export default AnnouncementDetails
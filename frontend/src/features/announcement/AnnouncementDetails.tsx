import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { dateFormatter } from "../../app/layouts/formatter/common"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { deleteAnnouncementDetailsAsync, fetchAnnouncementDetailsAsync, updateAnnouncementDetailsAsync } from "./announcementSlice"
import history from "../../app/utils/history"

import DetailItem from "../../app/layouts/components/items/DetailItem"
import DetailsPage from "../../app/layouts/components/pages/DetailsPage"
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer"
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent"
import NavigationButton from "../../app/layouts/components/buttons/NavigationButton"
import DeleteButton from "../../app/layouts/components/buttons/DeleteButton"

const AnnouncementDetails = () => {
    const { announcement, isFetchingDetails, isSaving } = useAppSelecter(state => state.announcement);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if(id) dispatch(fetchAnnouncementDetailsAsync(id));
    }, [])

    const handleDelete = async () => {
        if(id) {
            await dispatch(deleteAnnouncementDetailsAsync(id));
            history.push('/announcements')
        }
    }

    if (isFetchingDetails || !announcement) return (<LoadingComponent content="Loading announcement details..." />)

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
                        <NavigationButton title="Edit" navigateTo={`/announcements/${announcementId}/manage`} />
                        <DeleteButton onClick={handleDelete} loading={isSaving} />
                    </FormButtonContainer>
                </>
            }
        />
    )
}

export default AnnouncementDetails
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import history from '../../app/utils/history';
import { IAnnouncement } from "../../app/models/announcement";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { createAnnouncementAsync, fetchAnnouncementDetailsAsync, updateAnnouncementDetailsAsync } from "./announcementSlice";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Form } from "semantic-ui-react";
import FormPage from "../../app/layouts/components/pages/FormPage";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import FormTextArea from "../../app/layouts/components/form/FormTextArea";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import AddButton from "../../app/layouts/components/buttons/AddButton";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";

const AnnouncementForm = () => {

    const [announcement, setAnnouncement] = useState<IAnnouncement>(
        { id: "", title: "", message: "", dateCreated: "" }
    )

    const { announcement: announcementData, isFetchingDetails, isSaving } = useAppSelecter(state => state.announcement);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!!id) dispatch(fetchAnnouncementDetailsAsync(id));
    }, [])

    useEffect(() => {
        if (id && announcementData) setAnnouncement(announcementData)
    }, [id, announcementData])

    const validationSchema = Yup.object(
        {
            title: Yup.string().required("Subject is required."),
            message: Yup.string().required("Message is required."),
        }
    )

    const handleResult = (data: any) => {
        if (!!data.error) {
            console.log('error')
        } else {
            history.push(`/announcements/${!!id ? id : (data.payload as any).id}/details`)
        }
    }

    const onSubmit = async (values: any) => {
        if (id) {
            await dispatch(updateAnnouncementDetailsAsync(values)).then(handleResult);
        }
        else await dispatch(createAnnouncementAsync(values)).then(handleResult);
    }

    if (isFetchingDetails) return (<LoadingComponent content="Loading announcements..." />)

    return (
        <FormPage
            title={id ? "Update Announcement" : "Add Announcement"}
            backNavigationLink={id ? `/announcements/${id}/details` : "/announcements"}
            form={
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={announcement}
                    onSubmit={values => onSubmit(values)}>
                    {
                        ({ handleSubmit, isValid }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                <FormTextInput label="Subject" name="title" placeholder="Subject" />
                                <FormTextArea label="Message" name="message" placeholder="Message" rows={3} />
                                <FormButtonContainer>
                                    <AddButton loading={isSaving} disabled={!isValid} />
                                </FormButtonContainer>
                            </Form>
                        )
                    }
                </Formik>
            }
        />
    )
}

export default AnnouncementForm;
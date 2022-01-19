import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import FormContainer from "../../app/layouts/components/form/FormContainer";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import * as Yup from 'yup';
import { IAnnouncement } from "../../app/models/announcement";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { createAnnouncementAsync, fetchAnnouncementDetailsAsync } from "./announcementSlice";
import FormTextArea from "../../app/layouts/components/form/FormTextArea";
import history from '../../app/utils/history';

const AnnouncementForm = () => {

    const [announcement, setAnnouncement] = useState<IAnnouncement>({ id: "", title: "", message: "", dateCreated: "" })

    const { announcement: announcementData, isFetchingDetails, isSaving } = useAppSelecter(state => state.announcement);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id && announcementData) setAnnouncement(announcementData)
    }, [id, announcement])

    const validationSchema = Yup.object({
        title: Yup.string().required("Subject is required."),
        message: Yup.string().required("Message is required."),
    })

    const onSubmit = async (values: any) => {
        if (!!values.message) {
            await dispatch(createAnnouncementAsync(values));
            history.push('/announcements')
        }
    }

    if (isFetchingDetails) return (<LoadingComponent content="Loading announcements..." />)

    return (
        <FormContainer
            title="Announcement"
            children={
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

                                <div>
                                    <Button type="submit" content="Submit" color="orange" loading={isSaving} disabled={!isValid} />
                                    <Button type="button" as={Link} to={id ? `/announcements/${announcementData?.id}/details` : "/announcements"} content="Cancel" />
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            }
        />
    )
}

export default AnnouncementForm;
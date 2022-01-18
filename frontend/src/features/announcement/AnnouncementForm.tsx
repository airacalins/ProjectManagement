import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, FormTextArea, Button } from "semantic-ui-react";
import FormContainer from "../../app/layouts/components/form/FormContainer";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import * as Yup from 'yup';
import { IAnnouncement } from "../../app/models/announcement";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchAnnouncementDetailsAsync } from "./announcementSlice";

interface IAnnouncementInput {
    id: string,
    subject: string,
    message: string,
}

const AnnouncementForm = () => {

    const { id } = useParams<{ id: string }>();

    const { announcement: announcementData, isFetchingDetails } = useAppSelecter(state => state.announcement);
    const dispatch = useAppDispatch();

    const [announcement, setAnnouncement] = useState<IAnnouncement>({ id: "", subject: "", message: "", dateCreated: "" })


    useEffect(() => {
        if (id) dispatch(fetchAnnouncementDetailsAsync(id));
    }, [id])

    useEffect(() => {
        announcementData && setAnnouncement(announcementData);
    }, [announcementData])

    const validationSchema = Yup.object({
        subject: Yup.string().required("Subject is required."),
        message: Yup.number().required("Message is required."),
    })

    if (isFetchingDetails) return (<LoadingComponent content="Loading announcements..." />)

    return (
        <FormContainer
            title="Announcement"
            children={
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={announcement}
                    onSubmit={values => console.log(values)}>
                    {
                        ({ handleSubmit }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                <FormTextInput label="Subject" name="subject" placeholder="Subject" />
                                <FormTextArea label="Message" name="message" placeholder="Message" />

                                <div>
                                    <Button type="submit" content="Submit" color="orange" />
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
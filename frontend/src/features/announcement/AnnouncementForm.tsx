import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, FormTextArea, Button } from "semantic-ui-react";
import FormContainer from "../../app/layouts/components/form/FormContainer";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import * as Yup from 'yup';
import { Announcement } from "../../app/models/announcement";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";

const AnnouncementForm = () => {

    const { announcementStore } = useStore();
    const { loadAnnouncement, initialLoading, selectedAnnouncement } = announcementStore;
    const { id } = useParams<{ id: string }>();
    const [announcement, setAnnouncement] = useState<Announcement>({ id: 0, subject: "", message: "", dateCreated: "" })

    const validationSchema = Yup.object({
        subject: Yup.string().required("Subject is required."),
        message: Yup.number().required("Message is required."),
    })

    useEffect(() => {
        if (id) loadAnnouncement(+id).then(() => setAnnouncement(selectedAnnouncement!))
    }, [id, loadAnnouncement, selectedAnnouncement])

    if (initialLoading) return (<LoadingComponent content="Loading announcements..." />)

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
                                <FormTextInput name="subject" placeholder="Subject" />
                                <FormTextArea name="message" placeholder="Message" />

                                <div>
                                    <Button type="submit" content="Submit" color="orange" />
                                    <Button type="button" as={Link} to={id ? `/announcements/${selectedAnnouncement?.id}/details` : "/announcements"} content="Cancel" />
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
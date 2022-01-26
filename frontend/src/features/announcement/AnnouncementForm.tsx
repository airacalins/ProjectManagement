import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import history from '../../app/utils/history';
import { IAnnouncement } from "../../app/models/announcement";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { createAnnouncementAsync } from "./announcementSlice";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Form } from "semantic-ui-react";

import FormButton from "../../app/layouts/components/form/FormButton";
import FormContainer from "../../app/layouts/components/form/FormContainer";
import FormPage from "../../app/layouts/components/pages/FormPage";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import FormTextArea from "../../app/layouts/components/form/FormTextArea";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";

const AnnouncementForm = () => {

    const [announcement, setAnnouncement] = useState<IAnnouncement>({
        id: "",
        title: "",
        message: "",
        dateCreated: ""
    })

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
        <FormPage
            backNavigationLink="/announcements"
            form={
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
                                        <FormButton loading={isSaving} disabled={!isValid} />
                                    </Form>
                                )
                            }
                        </Formik>
                    }
                />
            } >
        </FormPage>
    )
}

export default AnnouncementForm;
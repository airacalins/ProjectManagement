import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddButton from '../../app/layouts/components/buttons/AddButton';
import FormButtonContainer from '../../app/layouts/components/form/FormButtonContainer';
import FormTextInput from '../../app/layouts/components/form/FormTextInput';
import DetailItem from '../../app/layouts/components/items/DetailItem';
import DetailsPage from '../../app/layouts/components/pages/DetailsPage';
import FormPage from '../../app/layouts/components/pages/FormPage';
import { useAppDispatch, useAppSelecter } from '../../app/store/configureStore';
import { fetchUserDetailsAsync, updateUserPasswordAsync } from '../user/UserSlice';
import * as Yup from 'yup';
import LoadingComponent from '../../app/layouts/components/loading/LoadingComponent';
import { Message } from 'semantic-ui-react';
import history from '../../app/utils/history';


const Account = () => {
    const [password, setPassword] = useState(
        { newPassword: "", verifyPassword: "" }
    )

    const [showPasswordNotMatchError, setShowPasswordNotMatchError] = useState(false);

    const { user: userData, isFetchingDetails, isSaving } = useAppSelecter(state => state.user);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!!id) dispatch(fetchUserDetailsAsync(id));
    }, [])

    const validationSchema = Yup.object(
        {
            newPassword: Yup.string().min(6).required("New password is required."),
            verifyPassword: Yup.string().min(6).required("Verify password is required."),
        }
    )

    const onSubmit = async (values: any) => {
        const { newPassword, verifyPassword } = values

        if (newPassword != verifyPassword) {
            setShowPasswordNotMatchError(true);
            return;
        }

        await dispatch(updateUserPasswordAsync({ id: id!, password: newPassword }));
        history.push(`/users/${id}/details`)

    }

    if (isFetchingDetails) return (<LoadingComponent content="Loading announcements..." />)


    return (
        <>
            <DetailsPage
                title='Account'
                content={
                    <>
                        <DetailItem title="First Name" value="Hardcoded" />
                        <DetailItem title="Last Name" value="Hardcoded" />
                        <DetailItem title="Address" value="Hardcoded" />
                        <DetailItem title="Contact Number" value="Hardcoded" />
                    </>
                }
            />

            <FormPage
                title="Change Password"
                form={
                    <>
                        {showPasswordNotMatchError && <Message>Password and new password must be the same.</Message>}
                        <Formik
                            validationSchema={validationSchema}
                            enableReinitialize
                            initialValues={password}
                            onSubmit={values => onSubmit(values)}>
                            {
                                ({ handleSubmit, isValid }) => (
                                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                        <FormTextInput label="New Password" name="newPassword" placeholder="Subject" />
                                        <FormTextInput label="Verify Password" name="verifyPassword" placeholder="Verify Password" />
                                        <FormButtonContainer>
                                            <AddButton loading={isSaving} disabled={!isValid} />
                                        </FormButtonContainer>
                                    </Form>
                                )
                            }
                        </Formik>
                    </>
                }
            />
        </>

    );
}

export default Account;
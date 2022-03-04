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
import { fetchCurrentUserAsync } from './accountSlice';
import { previousDay } from 'date-fns';
import responseHandler from '../../app/utils/reponseHandler';
import { toast } from 'react-toastify';

const Account = () => {
    const [password, setPassword] = useState(
        { newPassword: "", verifyPassword: "" }
    )
    const [showPasswordNotMatchError, setShowPasswordNotMatchError] = useState(false);
    const { user } = useAppSelecter(state => state.account);
    const { user: userData, isFetchingDetails, isSaving } = useAppSelecter(state => state.user);
    const dispatch = useAppDispatch();

    const getCurrentUser = async () => {
        if (!!user && !!user.id) await dispatch(fetchUserDetailsAsync(user.id))
    }

    useEffect(() => {
        getCurrentUser()
    }, [user?.id])

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

        const response = await dispatch(updateUserPasswordAsync({ id: userData?.id!, password: newPassword }));
        responseHandler({response, callback: () => toast.success("Password successfully changed.")})
        setPassword({ newPassword: "", verifyPassword: "" })
    }

    if (isFetchingDetails && !userData) return (<LoadingComponent content="Loading announcements..." />)

    return (
        <>
            <DetailsPage
                title='Account'
                content={
                    <>
                        <DetailItem title="Username" value={userData?.username} />
                        <DetailItem title="First Name" value={userData?.firstName} />
                        <DetailItem title="Last Name" value={userData?.lastName} />
                        <DetailItem title="Contact Number" value={userData?.phone} />
                        <DetailItem title="Address" value={userData?.address} />
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
                            initialValues={password}
                            enableReinitialize={true}
                            onSubmit={values => onSubmit(values)}>
                            {
                                ({ handleSubmit, isValid }) => (
                                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                        <FormTextInput type="password" label="New Password" name="newPassword" placeholder="Password" />
                                        <FormTextInput type="password" label="Verify Password" name="verifyPassword" placeholder="Verify Password" />
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
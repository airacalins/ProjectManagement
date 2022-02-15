import { useEffect, useState } from 'react';
import { IApplicationUser, ICreateUserInput, IUpdateUserInput, IUser } from '../../app/models/user';
import { useAppDispatch, useAppSelecter } from '../../app/store/configureStore';
import * as Yup from 'yup';
import { createUserAsync, fetchUserDetailsAsync, updateUserDetailsAsync } from './UserSlice';
import history from '../../app/utils/history';
import FormPage from '../../app/layouts/components/pages/FormPage';
import { Formik } from 'formik';
import { Form } from 'semantic-ui-react';
import FormTextInput from '../../app/layouts/components/form/FormTextInput';
import FormButtonContainer from '../../app/layouts/components/form/FormButtonContainer';
import AddButton from '../../app/layouts/components/buttons/AddButton';
import { useParams } from 'react-router-dom';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

const UserForm = () => {
    const { id } = useParams<{ id: string }>();

    const [user, setUser] = useState<ICreateUserInput>(
        { username: "", password: "", firstName: "", lastName: "", phone: "", address: "" }
    )

    const { user: userData, isSaving } = useAppSelecter(state => state.user);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!!id) dispatch(fetchUserDetailsAsync(id))
    }, [])

    useEffect(() => {
        if (userData) setUser(prev => {
            return {
                ...prev,
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                email: userData.email,
                address: userData.address
            }
        })
    }, [userData])

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        phone: Yup.string().required("Contact Number is required"),
        address: Yup.string().required("Address is required"),
    })

    const updtEvalidationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        phone: Yup.string().required("Contact Number is required"),
        address: Yup.string().required("Address is required"),
    })

    const handleResult = (data: any) => {
        if (!!data.error) {
            console.log('error')
        } else {
            history.push(`/users/${!!id ? id : (data.payload as IApplicationUser).id}/details`)
        }
    }

    const onSubmit = async (values: any) => {
        if (!!userData) {
            await dispatch(updateUserDetailsAsync(values)).then(handleResult);
        } else {
            await dispatch(createUserAsync(values)).then(handleResult);
        }
    }

    return (
        <FormPage
            title={userData ? "Update Staff" : "Add Staff"}
            backNavigationLink="/users"
            form={
                <Formik
                    validationSchema={!userData ? validationSchema : updtEvalidationSchema}
                    enableReinitialize
                    initialValues={user}
                    onSubmit={values => onSubmit(values)}>
                    {
                        ({ handleSubmit, isValid }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                {!userData && <FormTextInput label="Username" name="username" placeholder="Username" />}
                                {!userData && <FormTextInput type='password' label="Password" name="password" placeholder="Password" />}
                                <FormTextInput label="First Name" name="firstName" placeholder="First Name" />
                                <FormTextInput label="Last Name" name="lastName" placeholder="Last Name" />
                                <FormTextInput label="Contact Number" name="phone" placeholder="Contact Number" />
                                <FormTextInput label="Address" name="address" placeholder="Address" />

                                <FormButtonContainer>
                                    <AddButton loading={isSaving} disabled={!isValid} />
                                </FormButtonContainer>
                            </Form>
                        )
                    }
                </Formik>
            }
        />
    );
}

export default UserForm;
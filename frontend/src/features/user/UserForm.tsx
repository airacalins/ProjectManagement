import { useState } from 'react';
import { ICreateUserInput } from '../../app/models/user';
import { useAppDispatch, useAppSelecter } from '../../app/store/configureStore';
import * as Yup from 'yup';
import { createUserAsync } from './UserSlice';
import history from '../../app/utils/history';
import FormPage from '../../app/layouts/components/pages/FormPage';
import { Formik } from 'formik';
import { Form } from 'semantic-ui-react';
import FormTextInput from '../../app/layouts/components/form/FormTextInput';
import FormButtonContainer from '../../app/layouts/components/form/FormButtonContainer';
import AddButton from '../../app/layouts/components/buttons/AddButton';

const UserForm = () => {

    const [user, setUser] = useState<ICreateUserInput>({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
    })

    const { user: userData, isSaving } = useAppSelecter(state => state.user);

    const dispatch = useAppDispatch();

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        phone: Yup.string().required("Contact Number is required"),
    })

    const onSubmit = async (values: any) => {
        await dispatch(createUserAsync(values));
        history.push('/users')
    }

    return (
        <FormPage
            title="User"
            backNavigationLink="/users"
            form={
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={user}
                    onSubmit={values => onSubmit(values)}>
                    {
                        ({ handleSubmit, isValid }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                <FormTextInput label="Username" name="username" placeholder="Username" />
                                <FormTextInput label="Password" name="password" placeholder="Password" />
                                <FormTextInput label="First Name" name="firstName" placeholder="First Name" />
                                <FormTextInput label="Last Name" name="last Name" placeholder="Last Name" />
                                <FormTextInput label="Contact Number" name="Contact Number" placeholder="Contact Number" />

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
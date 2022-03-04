import { Formik } from 'formik';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { Button, Form, Header, Image, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../app/layouts/components/loading/LoadingComponent';
import FormPage from '../../app/layouts/components/pages/FormPage';
import { IAccount } from '../../app/models/account';
import { useAppDispatch, useAppSelecter } from '../../app/store/configureStore';
import history from '../../app/utils/history';
import { fetchCurrentUserAsync, signInUserAsync } from './accountSlice';
import * as Yup from 'yup';
import FormTextInput from '../../app/layouts/components/form/FormTextInput';
import FormButtonContainer from '../../app/layouts/components/form/FormButtonContainer';
import AddButton from '../../app/layouts/components/buttons/AddButton';
import { fetchDashboardAsync } from '../dashboard/DashboardSlice';
import { Container } from 'react-bootstrap';
import BackgroundImage from '/login-bg.jpg';

const LoginForm = () => {
    const [account, setAccount] = useState<IAccount>(
        { username: "", password: "" }
    )

    const { user } = useAppSelecter(state => state.account)

    const dispatch = useAppDispatch();

    const validationSchema = Yup.object(
        {
            username: Yup.string().required('Username is required.'),
            password: Yup.string().required('Password is required.'),
        }
    )

    const onSubmit = async (data: FieldValues) => {
        await dispatch(signInUserAsync(data));
        await dispatch(fetchCurrentUserAsync());
        await dispatch(fetchDashboardAsync())
        history.push('/');
    }

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center" fluid style={{ backgroundImage: `url(/login-bg.jpg)` }} >
            <div className='w-50 text-center p-5' style={{backgroundColor: "white"}}>
                <h1 className='font__burnt-sienna py-5'>Login your account</h1>

                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={account}
                    onSubmit={values => onSubmit(values)}>
                    {
                        ({ handleSubmit, isValid }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                <FormTextInput inputFullWidth  label="Username" name="username" placeholder="Username" />
                                <FormTextInput inputFullWidth type="password" label="Password" name="password" placeholder="Password" />
                                <FormButtonContainer>
                                    <AddButton fullWidth title="Login" disabled={!isValid} />
                                </FormButtonContainer>
                            </Form>
                        )
                    }
                </Formik>

            </div>

        </Container >
    )
};

export default LoginForm
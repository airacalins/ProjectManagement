import { FieldValues } from 'react-hook-form';
import { Button, Form, Header, Image, Segment } from 'semantic-ui-react'
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUserAsync } from './accountSlice';
// import ContainerHome from '../../app/layouts/components/container/ContainerHome'

const LoginForm = () => {
    
    const dispatch = useAppDispatch();
    const submitForm = async (data: FieldValues) => {
      await dispatch(signInUserAsync(data));
    }
  
    return (
        <div>
            <>
                <Segment stacked padded="very">
                    <Form size='large'>

                        <Header as='h2' color='orange' textAlign='center'>
                            <Image src='/logo.png' /> Log-in to your account
                        </Header>

                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />

                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Button color='orange' fluid size='large'>
                            Login
                        </Button>

                    </Form>
                </Segment>

                {/* <Message>
                    New to us? <a href='#'>Sign Up</a>
                </Message> */}
            </>
        </div >
    )
};

export default LoginForm
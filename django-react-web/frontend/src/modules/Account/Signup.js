import * as React from 'react';
import {
    Message, Header, Form, Grid,
    Container, Segment
} from 'semantic-ui-react';
import { observer } from 'mobx-react';
import SignupStore from './SignupStore';
import SigninStore from './SigninStore';
import UserAuthApi from '../../api/UserAuthApi';

@observer
export default class Signup extends React.Component {

    state = { loading: false }

    /* Event handler for sign up*/

    handleSignup = () => {
        this.setState({ loading: true });
        UserAuthApi.register(SignupStore.credentials)
            .then(res => {


                const credentials = {
                    email: SignupStore.credentials.email,
                    password: SignupStore.credentials.password
                }

                UserAuthApi.login(credentials).then(res => {

                    // store on state manager
                    SigninStore.updateTokenProperty('refresh', res.data.refresh);
                    SigninStore.updateTokenProperty('access', res.data.access);

                    // store on local storage
                    localStorage.setItem('refresh', res.data.refresh);
                    localStorage.setItem('access', res.data.access);

                    // store user ID
                    UserAuthApi.getUserID().then(res => {
                        SigninStore.setUserID(res.data.userId);
                    });

                    this.props.history.push('/')
                });

            }).catch(err => {
                SignupStore.setMessage(err.response.data.error)
                this.setState({ loading: false})
            });
    }



    /* Redirect to sign in page */
    handleRedirectSignin = () => {
        this.props.history.push('/signin')
    }

    /* Update information information */
    handleInformationChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        SignupStore.updateInformationProperty(key, value);
    }

    /* Update credential information */
    handleCredentialChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        SignupStore.updateCredentialProperty(key, value);
    }

    getMessage = () => {
        if (SignupStore.visible) {
            return (<Message
                negative
                content={SignupStore.message ? SignupStore.message 
                    : "Unspecified signup error occured, please try again."}
                onDismiss={SignupStore.clearMessage}
            />)
        } else {
            return (<div></div>)
        }
    }

    render() {

        const message = this.getMessage();

        return (
            <Container className='text-left' >

                {message}

                <Grid divided='vertically' >
                    <Grid.Row columns={2}>
                        <Grid.Column >

                            <Header as='h1'>Your free account includes </Header>
                            <p> Upload HRMS data </p>
                            <p> Upload suspect data to suspect database </p>
                            <p> Upload HRMS data and suspect list</p>
                            <p> Subscribe to early warning CEC alert </p>
                            <p> Global report of CEC locations </p>
                            <p> Search for a CEC </p>
                            <p> Reports of CEC </p>

                        </Grid.Column>

                        <Grid.Column>
                            <Segment className='p-5'>
                                <Header as='h1'>Create your account! </Header>
                                <Form onSubmit={this.handleSignup} loading={this.state.loading}> 
                                    <Form.Input
                                        name='email' placeholder='Email'
                                        onChange={this.handleCredentialChange}
                                    />
                                    <Form.Input
                                        name='username' placeholder='Username'
                                        onChange={this.handleCredentialChange}
                                    />
                                    <Form.Input
                                        name='password' type='password' 
                                        placeholder='Password'
                                        onChange={this.handleCredentialChange}
                                    />

                                    <Form.Input
                                        name='firstname' 
                                        placeholder='First Name'
                                        onChange={this.handleCredentialChange}
                                    />
                                    <Form.Input
                                        name='lastname' 
                                        placeholder='Last Name'
                                        onChange={this.handleCredentialChange}
                                    />

                                    <Form.Input
                                        name='affiliation' 
                                        placeholder='Affiliation'
                                        onChange={this.handleInformationChange}
                                    />
                                    <Form.Input
                                        name='position' 
                                        placeholder='Position'
                                        onChange={this.handleInformationChange}
                                    />


                                    <Form.Button
                                        style={{ backgroundColor: '#27d3ff' }}
                                        fluid type="submit"
                                        content='Sign me up!'
                                    />

                                </Form>
                                <span className='p-5'>
                                    Already have an account?
                                    <a onClick={this.handleRedirectSignin}>
                                        <u>Sign in here!</u>
                                    </a>
                                </span>
                            </Segment>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

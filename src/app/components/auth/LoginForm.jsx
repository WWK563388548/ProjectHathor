import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../form/TextInput';
import { login, socialLogin } from './authActions';
import SocialLogin from './SocialLogin';

const actions = {
    login,
    socialLogin
}

const LoginForm = (props) => {
    console.log("login form props: ", props);
    const styleOfLabel = {
        backgroundColor: '#fff',
    };
    const {handleSubmit} = props;
    const {login} = props;
    const {error} = props;
    const {socialLogin} = props;
    return (
        <Form size="large" onSubmit={handleSubmit(login)}>
            <Segment>
                <Field
                name="email"
                component={TextInput}
                type="text"
                placeholder="电子邮件地址"
                />
                <Field
                name="password"
                component={TextInput}
                type="password"
                placeholder="密码"
                />
                {error &&
                    <Label style={styleOfLabel} pointing color='red' >{error}</Label>
                }
                <Button fluid size="large" color="teal">
                登陆
                </Button>
                <Divider horizontal>
                  Or
                </Divider>
                <SocialLogin socialLogin={socialLogin} />
            </Segment>
        </Form>
    );
};

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));
import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../form/TextInput';
import { login } from './authActions';

const actions = {
    login
}

const LoginForm = (props) => {
    console.log("login form props: ", props);
    const {handleSubmit} = props;
    const {login} = props;
    return (
        <Form error size="large" onSubmit={handleSubmit(login)}>
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
                <Button fluid size="large" color="teal">
                登陆
                </Button>
            </Segment>
        </Form>
    );
};

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));
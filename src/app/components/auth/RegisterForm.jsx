import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../form/TextInput';
import { connect } from 'react-redux';
import { registerUser } from '../auth/authActions';

const actions = {
  registerUser
};

const RegisterForm = ({ handleSubmit, registerUser }) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="用户名/昵称"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="电子邮件地址"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="密码"
          />
          <Button fluid size="large" color="teal">
            注册
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(null, actions)(reduxForm({form: 'registerForm'})(RegisterForm));
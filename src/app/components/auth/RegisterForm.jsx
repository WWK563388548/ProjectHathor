import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../form/TextInput';

const RegisterForm = () => {
  return (
    <div>
      <Form size="large">
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

export default reduxForm({form: 'registerForm'})(RegisterForm);
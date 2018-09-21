import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../form/TextInput';

const LoginForm = () => {
  return (
    <Form error size="large">
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

export default reduxForm({form: 'loginForm'})(LoginForm);
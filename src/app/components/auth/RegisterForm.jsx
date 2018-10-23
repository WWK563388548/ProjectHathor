import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../form/TextInput';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { registerUser } from '../auth/authActions';
import SocialLogin from './SocialLogin';

const actions = {
  registerUser
};

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password'),
});

const RegisterForm = ({ handleSubmit, registerUser, error, invalid, submitting }) => {
  const styleOfLabel = {
    backgroundColor: '#fff',
  };
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
          {error &&
            <Label style={styleOfLabel} pointing color='red' >{error}</Label>
          }
          <Button disabled={invalid || submitting} fluid size="large" color="teal">
            注册
          </Button>
          <Divider horizontal>
            Or
          </Divider>
          <SocialLogin />
        </Segment>
      </Form>
    </div>
  );
};

export default connect(null, actions)(reduxForm({form: 'registerForm', validate})(RegisterForm));
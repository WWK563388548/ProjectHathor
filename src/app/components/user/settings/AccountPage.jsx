import React from 'react';
import { Segment, Header, Form, Divider, Label, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, matchesField, isRequired, composeValidators } from 'revalidate';
import TextInput from '../../form/TextInput';

const validate = combineValidators({
    newPassword1: isRequired({message: '请输入密码'}),
    newPassword2: composeValidators(
        isRequired({message: '请确认你的新密码'}),
        matchesField('newPassword1')({message: '输入的密码不匹配'}),
    )(),
});

const AccountPage = (props) => {

    const styleOfLabel = {
        backgroundColor: '#fff',
    };
    console.log(props);
    const {handleSubmit} = props;
    const {updatePassword} = props;
    return (
        <Segment>
            <Header dividing size="large" content="我的账户" />
            <div>
                <Header color="teal" sub content="修改密码" />
                <Form onSubmit={handleSubmit(updatePassword)}>
                    <Field
                        width={8}
                        name="newPassword1"
                        type="password"
                        pointing="left"
                        inline={true}
                        component={TextInput}
                        basic={true}
                        placeholder="New Password"
                    />
                    <Field
                        width={8}
                        name="newPassword2"
                        type="password"
                        inline={true}
                        basic={true}
                        pointing="left"
                        component={TextInput}
                        placeholder="Confirm Password"
                    />
                    {props.error && (
                        <Label style={styleOfLabel} color="red">
                            {props.error}
                        </Label>
                    )}
                    <Divider />
                    <Button disabled={props.invalid || props.submitting} size="large" positive content="Update Password" />
                </Form>
            </div>
            <div style={{
                marginTop: '20px',
            }}>
                <Header color="teal" sub content="升级您的Facebook账户" />
                <Button type="button" color="facebook" style={{
                    marginTop: '5px',
                }}>
                    <Icon name="facebook" />
                    前往Facebook
                </Button>
            </div>

            <div style={{
                marginTop: '20px',
            }}>
                <Header color="teal" sub content="升级您的Google账户" />
                <Button type="button" color="google plus" style={{
                    marginTop: '5px',
                }}>
                    <Icon name="google plus" />
                    前往Google
                </Button>
            </div>
        </Segment>
    );
};

export default reduxForm({ form: 'account', validate })(AccountPage);
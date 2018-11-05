import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button, Select, Label} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import DateInput from "../../form/DateInput";
import PlaceInput from "../../form/PlaceInput";
import TextInput from "../../form/TextInput";
import RadioInput from "../../form/RadioInput";
import moment from 'moment';

class BasicsPage extends Component {

    render() {
        const {pristine, submitting, handleSubmit, updateProfile} = this.props;
        console.log(this.props);
        return (
            <Segment>
                <Header dividing size='large' content='个人信息' />
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='昵称'
                    />
                    <Form.Group inline>
                        <Label style={{
                            backgroundColor: "#fff",
                        }}>性别: </Label>
                        <Field
                            label='男性'
                            name='gender'
                            type='radio'
                            value='male'
                            component={RadioInput}
                        />
                        <Field
                            label='女性'
                            name='gender'
                            type='radio'
                            value='female'
                            component={RadioInput}
                        />
                    </Form.Group>
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={DateInput}
                        placeholder='生日'
                        dateFormat='YYYY-MM-DD'
                        showYearDropdown={true}
                        showMonthDropdown={true}
                        dropdownMode="select"
                        maxDate={moment().subtract(18, 'years')}
                    />
                    <Field
                        name='city'
                        placeholder='所在地'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={PlaceInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({
    form: 'userProfile', 
    enableReinitialize: true, 
    destroyOnUnmount: false
})(BasicsPage);
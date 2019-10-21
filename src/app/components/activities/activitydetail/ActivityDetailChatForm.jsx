import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextArea from '../../form/TextArea';


class ActivityDetailChatForm extends Component {

    handleCommentSubmit = values => {
        const { addActivityComment, reset, activityId } = this.props;
        addActivityComment(activityId, values);
        reset();
    }

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
                <Field 
                    name='comment'
                    type='text'
                    component={TextArea}
                    rows={3}
                />
                <Button
                    content="发表内容"
                    labelPosition="left"
                    icon="edit"
                    primary
                />
            </Form>
        );
    }
}

export default reduxForm({ form: 'activityChat' })(ActivityDetailChatForm);

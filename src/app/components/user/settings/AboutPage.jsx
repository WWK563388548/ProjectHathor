import React from 'react';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import RadioInput from '../../form/RadioInput';
import TextInput from '../../form/TextInput';
import TextArea from '../../form/TextArea';
// import PlaceInput from '../../form/PlaceInput';
import SelectInput from '../../form/SelectInput';

const interests = [
  { key: 'party', text: '派对/聚会', value: '派对/聚会' },
  { key: 'culture', text: '文化', value: '文化' },
  { key: 'movie', text: '电影', value: '电影' },
  { key: 'food', text: '美食', value: '美食' },
  { key: 'music', text: '音乐', value: '音乐' },
  { key: 'travel', text: '旅行', value: '旅行' },
  { key: 'knowledge', text: '知识', value: '知识' }
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
        <Segment>
            <Header dividing size="large" content="关于我" />
            <p>完整的自我介绍会帮助你认识更多兴趣相同的人</p>
            <Form onSubmit={handleSubmit(updateProfile)}>
                <Form.Group inline>
                    <label>关于你的现状: </label>
                    <Field name="status" component={RadioInput} type="radio" value="single" label="单身" />
                    <Field
                        name="status"
                        component={RadioInput}
                        type="radio"
                        value="relationship"
                        label="恋爱中"
                    />
                    <Field
                        name="status"
                        component={RadioInput}
                        type="radio"
                        value="married"
                        label="已婚"
                    />
                </Form.Group>
                <Divider />
                <label>告诉我们更多关于你的事: </label>
                <Field name="about" component={TextArea} placeholder="自我介绍" />
                <Field
                    name="interests"
                    component={SelectInput}
                    options={interests}
                    value="interests"
                    multiple={true}
                    placeholder="选择你的爱好"
                />
                <Field
                    width={8}
                    name="occupation"
                    type="text"
                    component={TextInput}
                    placeholder="职业"
                />
                <Divider />
                <Button disabled={pristine || submitting} size="large" positive content="更新你的档案" />
            </Form>
        </Segment>
    );
};

export default reduxForm({ 
    form: 'userProfile', 
    enableReinitialize: true, 
    destroyOnUnmount: false
})(AboutPage);
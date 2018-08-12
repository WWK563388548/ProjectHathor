import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class ActivityForm extends React.Component {

  state = {
    event: {
      title: '',
      date: '',
      city: '',
      location: '',
      hostedBy: '',
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.event);
    this.props.createActivity(this.state.event);
  }

  onInputChange = (event) => {
    const newEvent = this.state.event;
    newEvent[event.target.name] = event.target.value;
    this.setState({
      event: newEvent
    });
  }
  
  render() {
    const handleClose = this.props.onClick;
    // 使用'ref'获取值，代表uncontroled form
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>活动主题</label>
            <input name='title' onChange={this.onInputChange} value={this.state.event.title} placeholder="活动的主题" />
          </Form.Field>
          <Form.Field>
            <label>活动日期</label>
            <input name='date' onChange={this.onInputChange} value={this.state.event.date} type="date" placeholder="YYYY-MM-DD" />
          </Form.Field>
          <Form.Field>
            <label>城市</label>
            <input name='city' onChange={this.onInputChange} value={this.state.event.city} placeholder="活动所在城市" />
          </Form.Field>
          <Form.Field>
            <label>地点</label>
            <input name='location' onChange={this.onInputChange} value={this.state.event.location} placeholder="活动举办地点" />
          </Form.Field>
          <Form.Field>
            <label>组织者</label>
            <input name='hostedBy' onChange={this.onInputChange} value={this.state.event.hostedBy} placeholder="输入活动组织者的名字" />
          </Form.Field>
          <Button positive type="submit">
            提交
          </Button>
          <Button onClick={handleClose} type="button">取消</Button>
        </Form>
      </Segment>
    );
  }
}

export default ActivityForm;
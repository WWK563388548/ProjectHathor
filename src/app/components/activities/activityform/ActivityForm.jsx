import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createActivity, updateActivity } from '../activityActions';
import cuid from 'cuid';

const mapState = (state, ownProps) => {
  const activityId = ownProps.match.params.id;
  let activity = {
    title: '',
    date: '',
    city: '',
    location: '',
    hostedBy: '',
  }

  if(activityId && state.activities.length > 0) {
    activity = state.activities.filter(item => item.id === activityId)[0];
  }

  return {
    activity
  };
}

// actions 中的方法会加入到组件的props中
const actions = {
  createActivity,
  updateActivity,
}

class ActivityForm extends React.Component {
  
  state = {
    event: Object.assign({}, this.props.activity),
  }
  
  /**
   * componentDidMount(){}: 
   * 在组件安装(Mount)好后立即执行，在这里设置state将
   * 开始重写渲染组件(之后不会再被调用，哪怕是属性改变)
   */
  // componentDidMount() {
    
  // }

  /**
   * 当组件可能收到新props时调用此方法。
   * React在props没有改变的情况下依然会调用此方法，
   * 如果想去处理改变，可以去比较新的props和现存的props。
   * （在componentDidMount()中调用setState不会引发此方法）
   */
  // componentWillReceiveProps(newProps) {
    
  // }

  onFormSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.event);
    if(this.state.event.id){
      this.props.updateActivity(this.state.event);
      // 返回上一个路径
      this.props.history.goBack();
    } else {
      // 为新建的活动添加头像和id
      const newActivity = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createActivity(newActivity);
      // 创建新活动后，进行重定向到‘活动列表界面’
      this.props.history.push('/activities');
    }
  }

  onInputChange = (event) => {
    const newEvent = this.state.event;
    newEvent[event.target.name] = event.target.value;
    this.setState({
      event: newEvent
    });
  }
  
  render() {
    console.log(this.props);
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
          <Button onClick={this.props.history.goBack} type="button">取消</Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(ActivityForm);
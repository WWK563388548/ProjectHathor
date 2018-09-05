import React from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createActivity, updateActivity } from '../activityActions';
import cuid from 'cuid';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../form/TextInput';
import TextArea from '../../form/TextArea';
import SelectInput from '../../form/SelectInput';

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

const category = [
  {key: 'party', text: 'Party', value: 'party'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'movie', text: 'Movie', value: 'movie'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'},
  {key: 'knowledge', text: 'Knowledge', value: 'knowledge'},
];

class ActivityForm extends React.Component {
  
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
    // 使用'ref'获取值，代表uncontroled form
    return (
      <Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="活动信息" />
            <Form onSubmit={this.onFormSubmit}>
              <Field name='title' type='text' component={TextInput} placeholder="活动主题" />
              <Field name='category' type='text' component={SelectInput} options={category} placeholder="选择活动的类型" />
              <Field name='description' type='text' rows={6} component={TextArea} placeholder="活动介绍" />
              <Header sub color="teal" content="活动位置信息" />
              <Field name='city' type='text' component={TextInput} placeholder="所在地区" />
              <Field name='location' type='text' component={TextInput} placeholder="具体地址" />
              <Field name='date' type='text' component={TextInput} placeholder="日期" />
              <Button positive type="submit">
                提交
              </Button>
              <Button onClick={this.props.history.goBack} type="button">取消</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Column>
    );
  }
}

export default connect(mapState, actions)(reduxForm({form: 'activityForm'})(ActivityForm));
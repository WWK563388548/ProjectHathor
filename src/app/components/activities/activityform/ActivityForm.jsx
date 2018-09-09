import React from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createActivity, updateActivity } from '../activityActions';
import cuid from 'cuid';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../form/TextInput';
import TextArea from '../../form/TextArea';
import SelectInput from '../../form/SelectInput';
import DateInput from '../../form/DateInput';

const mapState = (state, ownProps) => {
  const activityId = ownProps.match.params.id;
  let activity = {};

  if(activityId && state.activities.length > 0) {
    activity = state.activities.filter(item => item.id === activityId)[0];
  }

  return {
    initialValues: activity
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

// 对每一个field设置确认(validation)
const validate = combineValidators({
  title: isRequired({message: '请设置活动主题/名称'}),
  category: isRequired({message: '请设置活动类型'}),
  // 这里要设置两个确认项
  description: composeValidators(
    isRequired({message: '请输入活动简介/描述'}),
    hasLengthGreaterThan(10)({
      message: '活动的简介/描述至少必须有10个字'
    })
  )(),
  city: isRequired({message: '设置举办活动的地区'}),
  location: isRequired({message: '设置具体的活动地址'}),
});

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

  onFormSubmit = (values) => {
    console.log(values);
    // console.log(this.state.event);
    if(this.props.initialValues.id){
      this.props.updateActivity(values);
      // 返回上一个路径
      this.props.history.goBack();
    } else {
      // 为新建的活动添加头像和id
      const newActivity = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Ken'
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
    const {invalid} = this.props;
    const {submitting} = this.props;
    const {pristine} = this.props;
    // 使用'ref'获取值，代表uncontroled form
    return (
      <Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="活动信息" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name='title' type='text' component={TextInput} placeholder="活动主题" />
              <Field name='category' type='text' component={SelectInput} options={category} placeholder="选择活动的类型" />
              <Field name='description' type='text' rows={6} component={TextArea} placeholder="活动介绍" />
              <Header sub color="teal" content="活动位置信息" />
              <Field name='city' type='text' component={TextInput} placeholder="所在地区" />
              <Field name='location' type='text' component={TextInput} placeholder="具体地址" />
              <Field name='date'
                type='text'
                component={DateInput}
                dateFormat="YYYY/MM/DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="活动开始的日期与时间" />
              <Button disabled={invalid || submitting || pristine} positive type="submit">
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
// "enableReinitialize" 允许我们在props发生改变后，重新初始化
export default connect(mapState, actions)(
  reduxForm({form: 'activityForm', enableReinitialize: true, validate })(ActivityForm)
);
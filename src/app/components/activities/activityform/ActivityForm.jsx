/* global google */
import React from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { createActivity, updateActivity, cancelToggle } from '../activityActions';
import cuid from 'cuid';
import moment from 'moment';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../form/TextInput';
import TextArea from '../../form/TextArea';
import SelectInput from '../../form/SelectInput';
import DateInput from '../../form/DateInput';
import PlaceInput from '../../form/PlaceInput';
import { toastr } from 'react-redux-toastr';

const mapState = (state, ownProps) => {
  // console.log("check firestore for update form state 1", state);
  // console.log("check firestore for update form state 2", ownProps);
  const activityId = ownProps.match.params.id;
  let activity = {};

  if(state.firestore.ordered.activities && state.firestore.ordered.activities[0]) {
      activity = state.firestore.ordered.activities.filter(item => item.id === activityId)[0];
      // activity.date = activity.date.toDate();
  }

  console.log("check firestore for update form activity", activity);
  return {
    initialValues: activity,
    activity,
  };
}

// actions 中的方法会加入到组件的props中
const actions = {
  createActivity,
  updateActivity,
  cancelToggle,
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
  date: isRequired({message: '请输入活动的日期与时间'})
});

class ActivityForm extends React.Component {

  state = {
    cityLatLng: {},
    locationLatLng: {},
    scriptLoaded: false, 
  };

  async componentDidMount() {
    // console.log("check firestore for update form 1", this.props);
    const {firestore, match} = this.props;
    await firestore.setListener(`activities/${match.params.id}`);
    /* let activity = await firestore.get(`activities/${match.params.id}`);
    console.log("check firestore for update form 2", activity);
    if(!activity.exists){
      this.props.history.push("/activities");
      toastr.error("抱歉", "这个活动似乎不存在");
    } else {
      this.setState({
        locationLatLng: activity.data().locationLatLng
      });
    } */
  }

  async componentWillUnmount(){
    const {firestore, match} = this.props;
    await firestore.unsetListener(`activities/${match.params.id}`);
  }

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(results => {
        // console.log(results);
        console.log(results[0]);
        return getLatLng(results[0]);
      })
      .then(latLng => {
        console.log(latLng);
        this.setState({
          cityLatLng: latLng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity);
      });
  }

  handleLocationSelect = (selectedLocation) => {
    geocodeByAddress(selectedLocation)
      .then(results => {
        // console.log(results);
        console.log(results[0]);
        return getLatLng(results[0]);
      })
      .then(latLng => {
        console.log(latLng);
        this.setState({
          locationLatLng: latLng
        });
      })
      .then(() => {
        this.props.change('location', selectedLocation);
      });
  }

  handleScriptLoaded = () => {
    this.setState({scriptLoaded: true});
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

  onFormSubmit = (values) => {
    console.log(this.props.initialValues);
    // console.log(this.state.event);
    // values.date = moment(values.date).format();
    values.locationLatLng = this.state.locationLatLng;
    if(this.props.match.path.indexOf("createActivity") < 0){
      console.log("this.props.location.pathname", this.props.location.pathname);
      if(Object.keys(values.locationLatLng).length === 0){
        values.locationLatLng = this.props.activity.locationLatLng;
      }
      this.props.updateActivity(values);
      // 返回上一个路径
      this.props.history.goBack();
    } else {
      this.props.createActivity(values);
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
    console.log("activity form", this.props);
    const {invalid} = this.props;
    const {submitting} = this.props;
    const {pristine} = this.props;
    // 使用'ref'获取值，代表uncontroled form
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="活动信息" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name='title' type='text' component={TextInput} placeholder="活动主题" />
              <Field name='category' type='text' component={SelectInput} options={category} placeholder="选择活动的类型" />
              <Field name='description' type='text' rows={6} component={TextArea} placeholder="活动介绍" />
              <Header sub color="teal" content="活动位置信息" />
              <Field
                name='city'
                type='text'
                component={PlaceInput}
                options={{types: ['(cities)']}}
                placeholder="所在地区" 
                onSelect={this.handleCitySelect}
              />
              { this.state.scriptLoaded && 
              <Field
                name='location'
                type='text'
                component={PlaceInput}
                onSelect={this.handleLocationSelect}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 10000,
                  types: ['establishment']
                }}
                placeholder="具体地址" /> }

              <Field name='date'
                type='text'
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="活动开始的日期与时间" />
              <Button disabled={invalid || submitting || pristine} positive type="submit">
                提交
              </Button>
              <Button 
                onClick={
                  this.props.initialValues
                  ? () => this.props.history.push(`/activities/${this.props.initialValues.id }`)
                  : () => this.props.history.push(`/activities`)
                } 
                type="button">
                关闭
              </Button>
              {Object.keys(this.props.activity).length > 0 &&
                <Button 
                  floated="right"
                  content={this.props.activity.cancelled ? "重新开启活动" : "取消活动"}
                  color={this.props.activity.cancelled ? 'green' : 'red'}
                  onClick={() => this.props.cancelToggle(!this.props.activity.cancelled, this.props.activity.id)}
                  type="button" />
              }
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
// "enableReinitialize" 允许我们在props发生改变后，重新初始化
export default withFirestore(connect(mapState, actions)(
  reduxForm({form: 'activityForm', enableReinitialize: true, validate })(ActivityForm)
));
import React from 'react';
import { connect } from 'react-redux';
import ActivityList from '../activitylist/ActivityList';
import { Grid, Button } from 'semantic-ui-react';
import { getActivityForDashBoard } from '../activityActions'
import LoadingComponent from '../../util/loadingComponent';
import RecentActivity from './RecentActivity';
import { firestoreConnect } from 'react-redux-firebase';

const mapState = (state) => ({
  activities: state.activities,
  // activities: state.firestore.ordered.activities,
  loading: state.async.loading,
});

const actions = {
  getActivityForDashBoard,
}

class DashBoard extends React.Component {

  state = {
    moreActivity: false,
    loadingInitial: true,
    loadedActivities: [],
  }

  async componentDidMount(){
    console.log("check loadingInitial 1");
    let next = await this.props.getActivityForDashBoard();
    console.log("check loadingInitial 1.5", next);
    if(next && next.docs && next.docs.length > 1){
      console.log("check loadingInitial 2");
      this.setState({
        moreActivity: true,
        loadingInitial: false,
      });
    }
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.activities !== prevProps.activities){
      this.setState({
        loadedActivities: [...this.state.loadedActivities, ...this.props.activities],
      });
    }
  }

  getNextActivities = async() => {
    const {activities} = this.props;
    let lastActivity = activities && activities[activities.length - 1];
    let next = await this.props.getActivityForDashBoard(lastActivity);
    if(next && next.docs && next.docs.length <= 1){
      this.setState({
        moreActivity: false,
      });
    }

  }

  render() {
    const { activities, loading } = this.props;
    if(this.state.loadingInitial){
      return <LoadingComponent inverted={true} />
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            activities={this.state.loadedActivities} />
          <Button 
            loading={loading}
            onClick={this.getNextActivities}
            disabled={!this.state.moreActivity}
            content="更多活动" 
            color="green" 
            floated="right" />
        </Grid.Column>
        <Grid.Column width={6}>
          <RecentActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(firestoreConnect([{collection: 'activities'}])(DashBoard));
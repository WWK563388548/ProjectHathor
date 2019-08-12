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
  }

  async componentDidMount(){
    let next = await this.props.getActivityForDashBoard();
    if(next && next.docs && next.docs.length > 1){
      this.setState({
        moreActivity: true,
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
    const { activities } = this.props;
    if(this.props.loading){
      return <LoadingComponent inverted={true} />
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            activities={activities} />
          <Button 
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
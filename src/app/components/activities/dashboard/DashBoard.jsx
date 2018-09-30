import React from 'react';
import { connect } from 'react-redux';
import ActivityList from '../activitylist/ActivityList';
import { Grid } from 'semantic-ui-react';
import { deleteActivity } from '../activityActions'
import LoadingComponent from '../../util/loadingComponent';
import RecentActivity from './RecentActivity';

const mapState = (state) => ({
  activities: state.activities,
  loading: state.async.loading,
});

const actions = {
  deleteActivity,
}

class DashBoard extends React.Component {

  handleDeleteActivity = (activityId) => () => {
    this.props.deleteActivity(activityId);
  }

  render() {

    if(this.props.loading){
      return <LoadingComponent inverted={true} />
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
          deleteActivity={this.handleDeleteActivity}
          activities={this.props.activities} />
        </Grid.Column>
        <Grid.Column width={6}>
          <RecentActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(DashBoard);
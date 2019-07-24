import React from 'react';
import { connect } from 'react-redux';
import ActivityList from '../activitylist/ActivityList';
import { Grid } from 'semantic-ui-react';
import { deleteActivity } from '../activityActions'
import LoadingComponent from '../../util/loadingComponent';
import RecentActivity from './RecentActivity';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const mapState = (state) => ({
  // activities: state.activities,
  activities: state.firestore.ordered.activities,
  // loading: state.async.loading,
});

const actions = {
  deleteActivity,
}

class DashBoard extends React.Component {

  handleDeleteActivity = (activityId) => () => {
    this.props.deleteActivity(activityId);
  }

  render() {
    const { activities } = this.props;
    if(!isLoaded(activities)){
      return <LoadingComponent inverted={true} />
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
          deleteActivity={this.handleDeleteActivity}
          activities={activities} />
        </Grid.Column>
        <Grid.Column width={6}>
          <RecentActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(firestoreConnect([{collection: 'activities'}])(DashBoard));
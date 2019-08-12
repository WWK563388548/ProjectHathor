import React from 'react';
import { connect } from 'react-redux';
import ActivityList from '../activitylist/ActivityList';
import { Grid } from 'semantic-ui-react';
import { getActivityForDashBoard } from '../activityActions'
import LoadingComponent from '../../util/loadingComponent';
import RecentActivity from './RecentActivity';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const mapState = (state) => ({
  activities: state.activities,
  // activities: state.firestore.ordered.activities,
  loading: state.async.loading,
});

const actions = {
  getActivityForDashBoard,
}

class DashBoard extends React.Component {

  componentDidMount(){
    this.props.getActivityForDashBoard();
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
        </Grid.Column>
        <Grid.Column width={6}>
          <RecentActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(firestoreConnect([{collection: 'activities'}])(DashBoard));
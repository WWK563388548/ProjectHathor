import React from 'react';
import { connect } from 'react-redux';
import ActivityList from '../activitylist/ActivityList';
import { Grid } from 'semantic-ui-react';
import { deleteActivity } from '../activityActions'

const mapState = (state) => ({
  activities: state.activities
});

const actions = {
  deleteActivity,
}

class DashBoard extends React.Component {

  handleDeleteActivity = (activityId) => () => {
    this.props.deleteActivity(activityId);
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
          deleteActivity={this.handleDeleteActivity}
          activities={this.props.activities} />
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(DashBoard);
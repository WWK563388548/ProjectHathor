import React from 'react';
import { connect } from 'react-redux';
import ActivityList from '../activitylist/ActivityList';
import ActivityForm from '../activityform/ActivityForm';
import { Grid, Button } from 'semantic-ui-react';
import { createActivity, updateActivity, deleteActivity } from '../activityActions'
import cuid from 'cuid';

const mapState = (state) => ({
  activities: state.activities
});

const actions = {
  createActivity,
  updateActivity,
  deleteActivity,
}

class DashBoard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedActivity: null,
    };

    // 这种函数绑定方法不好，但能用
    // this.handleFormOpen = this.handleFormOpen.bind(this);
    // this.handleClose = this.handleClose.bind(this);
  }

  handleEditActivity = (activityToEvent) => () => {
    this.setState({
      selectedActivity: activityToEvent,
      isOpen: true
    });
  }

  handleUpdateActivity = (updatedActivity) => {
    this.props.updateActivity(updatedActivity);
    this.setState({
      isOpen: false,
      selectedActivity: null,
    });
  }

  handleFormOpen = () => {
    this.setState({
      selectedActivity: null,
      isOpen: true,
    });
  }

  // 更好的函数绑定方法2
  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  }

  handleCreateActivity = (newActivity) => {
    // Generate a random Ids for us
    newActivity.id = cuid();
    newActivity.hostPhotoURL = 'assets/user.png';
    this.props.createActivity(newActivity);
    this.setState({
      isOpen: false,
    });
  }

  handleDeleteActivity = (activityId) => () => {
    this.props.deleteActivity(activityId);
  }

  render() {
    const selectedActivity = this.state.selectedActivity;
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
          deleteActivity={this.handleDeleteActivity}
          onActivityEdit={this.handleEditActivity}
          activities={this.props.activities} />
        </Grid.Column>
        <Grid.Column width={6}>
          {
            // 更好的函数绑定方法1
          }
          <Button 
          onClick={() => {this.handleFormOpen()}} 
          positive content="创建新活动" />
            {this.state.isOpen && 
              <ActivityForm
              updateActivity={this.handleUpdateActivity}
              selectedActivity={selectedActivity} 
              createActivity={this.handleCreateActivity}
              onClick={this.handleClose} />
            }
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(DashBoard);
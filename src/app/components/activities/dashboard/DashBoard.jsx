import React from 'react';
import ActivityList from '../activitylist/ActivityList';
import ActivityForm from '../activityform/ActivityForm';
import { Grid, Button } from 'semantic-ui-react';

class DashBoard extends React.Component {
    render() {
        return (
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button positive content="创建活动" />
                    <ActivityForm />
                </Grid.Column>
            </Grid>
        );
    }
}

export default DashBoard;
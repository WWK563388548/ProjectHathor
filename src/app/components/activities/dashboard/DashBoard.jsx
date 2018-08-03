import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from '../activitylist/ActivityList';

class DashBoard extends React.Component {
    render() {
        return (
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList />
                </Grid.Column>
                <Grid.Column width={6}>
                    <h2>The Right Part</h2>
                </Grid.Column>
            </Grid>
        );
    }
}

export default DashBoard;
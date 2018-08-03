import React from 'react';
import ActivityList from '../activitylist/ActivityList';
import { Grid } from 'semantic-ui-react';

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
import React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import ActivityDetailMap from './ActivityDetailMap';

class ActiivityDetailInfo extends React.Component {

    state = {
        showMap: false,
    }

    showMapHandler = () => {
        this.setState(preState => ({
            showMap: !preState.showMap,
        }));
    }
    
    render() {
        const activity = this.props.activity;
        return (
            <Segment.Group>
                <Segment attached="top">
                    <Grid>
                        <Grid.Column width={1}>
                            <Icon size="large" color="teal" name="info" />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <p>{activity.description}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={1}>
                            <Icon name="calendar" size="large" color="teal" />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <span>{activity.date}</span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={1}>
                            <Icon name="marker" size="large" color="teal" />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <span>{activity.location}</span>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button 
                            onClick={this.showMapHandler} 
                            color="teal" size="tiny" 
                            content={this.state.showMap ? "隐藏地图" : "显示地图"} />
                        </Grid.Column>
                    </Grid>
                </Segment>
                {this.state.showMap && (
                    <ActivityDetailMap lat={activity.locationLatLng.lat} lng={activity.locationLatLng.lng}/>
                )}
            </Segment.Group>
        );
    }
}

export default ActiivityDetailInfo;
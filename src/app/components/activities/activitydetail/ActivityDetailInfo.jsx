import React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import ActivityDetailMap from './ActivityDetailMap';
import format from 'date-fns/format';
import chineseLocale from 'date-fns/locale/zh_cn';

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
        let activityDate;
        let year, month, day, hours, minutes, seconds;
        if(activity.date){
            activityDate = activity.date.toDate();
            // date.getFullYear()
            year = activityDate.getFullYear();
            month = activityDate.getMonth() + 1;
            day = activityDate.getDate();
            hours = activityDate.getHours();
            minutes = activityDate.getMinutes();
            console.log("What is activityDate", activityDate);
            console.log("What is activityDate 2", activityDate.getFullYear());
            console.log("What is activityDate 2", activityDate.getMinutes());
            console.log("What is activityDate 2", activityDate.getHours());
        }
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
                            <span>{`${year} 年 ${month} 月 ${day} 日 - ${hours} 时 ${minutes} 分`}</span>
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
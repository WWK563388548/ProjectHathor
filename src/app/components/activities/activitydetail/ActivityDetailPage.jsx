import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DetailHeader from './ActivityDetailHeader';
import DetailInfo from './ActivityDetailInfo';
import DetailChat from './ActivityDetailChat';
import DetailSideBar from './ActivityDetailSideBar';

const  mapState = (state, ownProps) => {
    // console.log(ownProps);
    // console.log(state);
    const activityId = ownProps.match.params.id;
    let activity = {};

    if(activityId && state.activities.length > 0) {
        activity = state.activities.filter(item => 
            item.id === activityId
        )[0];
    }

    // console.log(activity);
    return {
        activity
    };
}

// This is stateless functional component
// activity = this.props.activity
const ActivityDetailPage = ({activity}) => {
    console.log(this.props);
    return (
        <Grid>
            <Grid.Column width={10}>
                <DetailHeader activity={activity}/>
                <DetailInfo activity={activity}/>
                <DetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <DetailSideBar participants={activity.participants}/>
            </Grid.Column>
        </Grid>
    );
}

export default connect(mapState)(ActivityDetailPage);
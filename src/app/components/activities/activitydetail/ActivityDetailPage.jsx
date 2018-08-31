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
    return activity;
}

// This is stateless functional component
const ActivityDetailPage = (props) => {
    // console.log(props);
    return (
        <Grid>
            <Grid.Column width={10}>
                <DetailHeader activity={props}/>
                <DetailInfo activity={props}/>
                <DetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <DetailSideBar participants={props.participants}/>
            </Grid.Column>
        </Grid>
    );
}

export default connect(mapState)(ActivityDetailPage);
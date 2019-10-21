import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DetailHeader from './ActivityDetailHeader';
import DetailInfo from './ActivityDetailInfo';
import DetailChat from './ActivityDetailChat';
import DetailSideBar from './ActivityDetailSideBar';
import { withFirestore, firebaseConnect } from 'react-redux-firebase';
import { objectToArray, addActivityComment } from '../activityActions';
import { goingToActivity, cancelGoingToActivity } from '../../user/userAction';

const  mapState = (state) => {
    console.log("the detail page 1", state);
    let activity = {};

    if(state.firestore.ordered.activities && state.firestore.ordered.activities[0]) {
        activity = state.firestore.ordered.activities.filter(a => location.href.indexOf(a.id) > 0)[0]; // eslint-disable-line
    }

    // console.log(activity);
    return {
        activity,
        auth: state.firebase.auth,
    };
}

const action = {
    goingToActivity,
    cancelGoingToActivity,
    addActivityComment
};

class ActivityDetailPage extends Component {


    async componentDidMount() {
        // console.log("firestore props", this.props);
        const {firestore, match} = this.props;
        await firestore.setListener(`/activities/${match.params.id}`);
        // console.log("detail page firestore activity", activity);

    }

    async componentWillUnmount() {
        const {firestore, match} = this.props;
        await firestore.unsetListener(`/activities/${match.params.id}`);
    }

    render() {
        console.log("DetailPage", this.props);
        const {activity, auth, goingToActivity, cancelGoingToActivity, addActivityComment} = this.props;
        const participants = activity && activity.participants && objectToArray(activity.participants);
        const isHost = activity.hostUid === auth.uid;
        const isGoing = participants && participants.some(participant => participant.id === auth.uid);
        return (
            <Grid>
                <Grid.Column width={10}>
                    <DetailHeader 
                        activity={activity}
                        isGoing={isGoing}
                        isHost={isHost}
                        goingToActivity={goingToActivity}
                        cancelGoingToActivity={cancelGoingToActivity}
                    />
                    <DetailInfo 
                        activity={activity}
                    />
                    <DetailChat 
                        addActivityComment={addActivityComment}
                        activityId={activity.id}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <DetailSideBar 
                        isHost={isHost}
                        participants={participants}
                    />
                </Grid.Column>
            </Grid>
        );
    }
}

export default compose(
    withFirestore,
    connect(mapState, action),
    firebaseConnect((props) => ([`activity_chat/${props.match.params.id}`]))
)(ActivityDetailPage);
import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DetailHeader from './ActivityDetailHeader';
import DetailInfo from './ActivityDetailInfo';
import DetailChat from './ActivityDetailChat';
import DetailSideBar from './ActivityDetailSideBar';
import { withFirestore } from 'react-redux-firebase';

const  mapState = (state, ownProps) => {
    console.log(ownProps);
    console.log(state);
    const activityId = ownProps.match.params.id;
    let activity = {};

    if(activityId && state.activities.length > 0) {
        activity = state.activities.filter(item => 
            item.id === activityId
        )[0];
    }

    console.log(activity);
    return {
        activity
    };
}

class ActivityDetailPage extends Component {


    async componentDidMount() {
        console.log("firestore props", this.props);
        const {firestore, match} = this.props;
        let activity = await firestore.get(`activities/${match.params.id}`);
        console.log("detail page firestore activity", activity);
    }

    render() {
        console.log("DetailPage", this.props);
        const {activity} = this.props;
        return (
            <Grid>
            {/*
                <Grid.Column width={10}>
                    <DetailHeader 
                        // activity={activity}
                    />
                    <DetailInfo 
                        // activity={activity}
                    />
                    <DetailChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <DetailSideBar 
                        // participants={activity.participants}
                    />
                </Grid.Column>
            */}
            </Grid>
        );
    }
}

export default withFirestore(connect(mapState)(ActivityDetailPage));
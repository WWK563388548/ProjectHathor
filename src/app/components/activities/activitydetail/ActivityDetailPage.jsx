import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DetailHeader from './ActivityDetailHeader';
import DetailInfo from './ActivityDetailInfo';
import DetailChat from './ActivityDetailChat';
import DetailSideBar from './ActivityDetailSideBar';
import { withFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

const  mapState = (state) => {
    // console.log(state);
    let activity = {};

    if(state.firestore.ordered.activities && state.firestore.ordered.activities[0]) {
        activity = state.firestore.ordered.activities[0]
    }

    // console.log(activity);
    return {
        activity
    };
}

class ActivityDetailPage extends Component {


    async componentDidMount() {
        // console.log("firestore props", this.props);
        const {firestore, match, history} = this.props;
        let activity = await firestore.get(`activities/${match.params.id}`);
        console.log("detail page firestore activity", activity);
        if(!activity.exists){
            history.push('/activities');
            toastr.error("此活动不存在!");
        }
    }

    render() {
        console.log("DetailPage", this.props);
        const {activity} = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <DetailHeader 
                        activity={activity}
                    />
                    <DetailInfo 
                        activity={activity}
                    />
                    <DetailChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <DetailSideBar 
                        participants={activity.participants}
                    />
                </Grid.Column>
            </Grid>
        );
    }
}

export default withFirestore(connect(mapState)(ActivityDetailPage));
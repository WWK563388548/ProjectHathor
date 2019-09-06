import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import UserDetailHeader from './UserDetailHeader';
import UserDetailDescription from './UserDetailDescription';
import UserDetailSidebar from './UserDetailSidebar';
import UserDetailPhotos from './UserDetailPhotos';
import UserDetailActivities from './UserDetailActivities';
import { userDetailedQuery } from '../userQueries';
import LoadingComponent from "../../util/loadingComponent";
import { getUserActivities } from '../userAction';

const mapState = (state, ownProp) => {
    let userUid = null;
    let profile = {};
    let authUid = null;
    // console.log("state.firebase.profile userDetailPage -1", state);
    // console.log("state.firebase.profile userDetailPage 0", ownProp.match.params.id);
    // console.log("state.firebase.profile userDetailPage 1", state.auth.uid);
    if(state.auth.uid){
        authUid = state.auth.uid;
    } else {
        authUid = state.firebase.auth.uid;
    }
    if(ownProp.match.params.id === authUid){
        // console.log("state.firebase.profile userDetailPage", state.firebase.profile);
        profile = state.firebase.profile;
        userUid = ownProp.match.params.id;
    } else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
        userUid = ownProp.match.params.id;
    }

    return {
        profile,
        userUid,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos,
        requesting: state.firestore.status.requesting,
    };
};

const actions = {
    getUserActivities,
}

class UserDetailedPage extends Component {

    async componentDidMount(){
        console.log("UserDetailedPage-getUserActivities 1", this.props.userUid);
        let activities  = await this.props.getUserActivities(this.props.userUid);
        console.log("UserDetailedPage-getUserActivities 2", activities);
    }

    render(){
        const {profile, photos, auth, match, requesting} = this.props;
        const isCurrentUser = auth.uid === match.params.id;
        const loading = Object.values(requesting).some(a => a === true);
        // console.log("UserDetailedPage", this.props);
        if(loading){
            return (
                <LoadingComponent inverted={true} />
            );
        }

        return (
            <Grid>
                <UserDetailHeader profile={profile}/>
                <UserDetailDescription auth={auth} profile={profile}/>
                <UserDetailSidebar isCurrentUser={isCurrentUser} />
                {photos && photos.length > 0 &&
                    <UserDetailPhotos photos={photos} />
                }
                <UserDetailActivities/>
            </Grid>
        );
    }

}

export default compose(
    connect(mapState, actions),
    firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
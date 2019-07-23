import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import UserDetailHeader from './UserDetailHeader';
import UserDetailDescription from './UserDetailDescription';
import UserDetailSidebar from './UserDetailSidebar';
import UserDetailPhotos from './UserDetailPhotos';
import { userDetailedQuery } from '../userQueries';

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
    } else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
        userUid = ownProp.match.params.id;
    }

    return {
        profile,
        userUid,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos,
    };
};

class UserDetailedPage extends Component {
    render(){
        const {profile, photos, auth, match} = this.props;
        const isCurrentUser = auth.uid === match.params.id;
        console.log("UserDetailedPage", this.props);
        return (
            <Grid>
                <UserDetailHeader profile={profile}/>
                <UserDetailDescription auth={auth} profile={profile}/>
                <UserDetailSidebar isCurrentUser={isCurrentUser} />
                {photos && photos.length > 0 &&
                    <UserDetailPhotos photos={photos} />
                }
            </Grid>
        );
    }

}

export default compose(
    connect(mapState),
    firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
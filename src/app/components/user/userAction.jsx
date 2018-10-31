import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const {isLoaded, isEmpty, ...updateUser} = user;
        console.log("user", user);
        if(updateUser.dateOfBirth) {
            updateUser.dateOfBirth = moment(updateUser.dateOfBirth).toDate();
        }

        try {
            await firebase.updateProfile(updateUser);
            console.log("updateUser", updateUser);
            await firestore.set(`users/${user.uid}`, {...updateUser});
            // console.log("newFirebaseUser", newFirebaseUser);
            toastr.success('Success', '个人信息修改成功');
        } catch(error) {
            console.log(error);
        }
    }

import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        console.log("user", user);
        if(user.dateOfBirth) {
            user.dateOfBirth = moment(user.dateOfBirth).toDate();
        }

        try {
            await firebase.updateProfile(user);
            toastr.success('Success', '个人信息修改成功');
        } catch(error) {
            console.log(error);
        }
    }

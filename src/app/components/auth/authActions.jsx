import { SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';
import { SubmissionError } from 'redux-form';

export const login = (creds) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(closeModal());
        } catch (error) {
            console.log("Login Error: ", error);
            throw new SubmissionError({
                _error: '登陆失败，请检查您输入的邮件地址与密码'
            });
        }
    };
};

export const signout = () => {
    return {
        type: SIGN_OUT_USER,
    };
};
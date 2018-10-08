import { createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebase from '../../config/firebase';

const reactReduxFirebaseConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    userFirestoreForProfile: true,
}

 export const configureStore = (preloadedState) => {
    const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancers = [middlewareEnhancer];
    const composedEnhancer = composeWithDevTools(
        ...storeEnhancers, 
        reactReduxFirebase(firebase, reactReduxFirebaseConfig),
        reduxFirestore(firebase)
    );
    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer
    );
     return store;
} 

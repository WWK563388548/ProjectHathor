import { createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

 export const configureStore = (preloadedState) => {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancers = [middlewareEnhancer];
    const composedEnhancer = composeWithDevTools(...storeEnhancers);
    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer
    );
     return store;
} 

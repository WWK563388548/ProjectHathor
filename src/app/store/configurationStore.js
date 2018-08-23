import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/rootReducer';

export const configureStore = (preloadedState) => {
    const middlewares = [];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancers = [middlewareEnhancer];
    const composedEnhancer = compose(...storeEnhancers);
    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer
    );

    return store;
}
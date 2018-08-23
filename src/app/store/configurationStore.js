import { createStore, applyMiddleware, compose } from 'redux';

export const configureStore = (preloadedState) => {
    const middlewares = [];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancers = [middlewareEnhancer];
    const composedEnhancer = compose(...storeEnhancers);
    const store = createStore(
        // Has not create this reducer yet
        rootReducer,
        preloadedState,
        composedEnhancer
    );

    return store;
}
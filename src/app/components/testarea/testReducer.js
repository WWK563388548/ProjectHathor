import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "../testConstants";
// 导入 boilerplate code of reducer
import { createReducer } from '../util/reducerUtil';

const initialState = {
    data: 100
};

export const incrementCounter = (state, payload) => {
    return {...state, data: state.data + 899};
}

export const decrementCounter = (state, payload) => {
    return {...state, data: state.data - 1};
}

// const testReducer = (state = initialState, action) => {
//    switch(action.type) {
//        // 我们不直接修改state，而是复制和修改state，并返回复制修改后的state
//        case INCREMENT_COUNTER:
//            return {...state, data: state.data + 899};
//        case DECREMENT_COUNTER:
//            return {...state, data: state.data - 1};
//        default:
//            return state;
//    }
// }

export default createReducer(initialState, {
    [INCREMENT_COUNTER]: incrementCounter,
    [DECREMENT_COUNTER]: decrementCounter
});
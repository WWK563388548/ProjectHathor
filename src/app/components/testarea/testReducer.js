import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "../testConstants";

const initialState = {
    data: 100
}

const testReducer = (state = initialState, action) => {
    switch(action.type) {
        // 我们不直接修改state，而是复制和修改state，并返回复制修改后的state
        case INCREMENT_COUNTER:
            return {...state, data: state.data + 899};
        case DECREMENT_COUNTER:
            return {...state, data: state.data - 1};
        default:
            return state;
    }
}

export default testReducer;
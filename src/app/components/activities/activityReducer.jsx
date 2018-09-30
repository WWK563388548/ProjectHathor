import { CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY, FETCH_ACTIVITY } from './activityConstants';

// Fake data
const initialState = [];

  const activityReducer = (state = initialState, action) => {
      switch(action.type) {
        case CREATE_ACTIVITY:
            return [...state, Object.assign({}, action.payload.activity)];
        case UPDATE_ACTIVITY:
            return [
                ...state.filter(event => event.id !== action.payload.activity.id),
                 Object.assign({}, action.payload.activity)
            ];
        case DELETE_ACTIVITY:
            return [
                ...state.filter(event => event.id !== action.payload.activityId)
            ];
        case FETCH_ACTIVITY: 
            return action.payload.activities;
        default:
            return state;
      }
  };

  export default activityReducer;
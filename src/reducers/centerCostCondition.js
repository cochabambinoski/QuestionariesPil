import {
    CHANGE_ERROR_REQUEST_BI,
    CLEAN_REQUEST_BI,
    CREATE_CONDITION_CENTER_MASTER,
    DELETE_CONDITION_CENTER_MASTER,
    FILTER_CENTER_COST_CONDITION,
    UPDATE_CONDITION_CENTER_MASTER
} from '../action-types/actionTypes';

const errorState = error => ({
    centerCostConditions: [],
    errorRequest: error,
    showDialog: false,
    load: false
});

const initialState = ({
    centerCostConditions: [],
    responseRequest: null,
    errorRequest: null,
    showDialog: false,
    load: true
});

export const centerCostCondition = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_CENTER_COST_CONDITION: {
            return {...state, centerCostConditions: action.payload, errorRequest: null, load: false}
        }
        case DELETE_CONDITION_CENTER_MASTER: {
            return {... state, responseRequest: action.payload}
        }
        case UPDATE_CONDITION_CENTER_MASTER: {
            return {... state, responseRequest: action.payload}
        }
        case CREATE_CONDITION_CENTER_MASTER: {
            return {... state, responseRequest: action.payload}
        }
        case CHANGE_ERROR_REQUEST_BI: {
            return {state: errorState(action.payload)}
        }
        case CLEAN_REQUEST_BI: {
            return {state: initialState}
        }
        default:
            return state;
    }
};
import {
    CHANGE_ERROR_REQUEST_BI,
    CLEAN_REQUEST_BI,
    CREATE_CONDITION_CENTER_MASTER,
    DELETE_CONDITION_CENTER_MASTER,
    FILTER_CENTER_COST_CONDITION,
    UPDATE_CONDITION_CENTER_MASTER
} from '../action-types/actionTypes';

const getResponse = response => ({
    centerCostConditions: [],
});

const errorState = error => ({
    centerCostConditions: []
});

const initialState = ({
    centerCostConditions: []
});

export const centerCostCondition = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_CENTER_COST_CONDITION:{
            return {
                centerCostConditions: action.payload,
            }
        }
        case DELETE_CONDITION_CENTER_MASTER: {
            return {state: getResponse(action.payload)}
        }
        case UPDATE_CONDITION_CENTER_MASTER: {
            return {state: getResponse(action.payload)}
        }
        case CREATE_CONDITION_CENTER_MASTER: {
            return {state: getResponse(action.payload)}
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

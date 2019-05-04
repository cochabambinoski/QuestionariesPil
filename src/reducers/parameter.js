import {
    CHANGE_ERROR_REQUEST_PARAMETER_BI,
    CLEAN_REQUEST_PARAMETER_BI,
    GET_ALL_PARAMETERS
} from "../action-types/actionTypes";

const getResponse = response => ({
    parameter: [],
    responseRequest: response,
    errorRequest: null,
    showDialog: true,
    load: true
});

const errorState = error => ({
    parameter: [],
    errorRequest: error,
    showDialog: false,
});

const initialState = ({
    parameter: [],
    responseRequest: null,
    errorRequest: null,
    showDialog: false,
});

export const parameter = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case GET_ALL_PARAMETERS: {
            return {...state, parameter: action.payload, errorRequest: null}
        }
        case CHANGE_ERROR_REQUEST_PARAMETER_BI: {
            return {state: errorState(action.payload)}
        }
        case CLEAN_REQUEST_PARAMETER_BI: {
            return {state: initialState}
        }
        default: {
            return state
        }
    }
};
import {CREATE_TYPES_BI, DELETE_TYPES_BI, GET_ALL_TYPES, UPDATE_TYPES_BI} from "../action-types/actionTypes";

const getResponse = response => ({
    types: [],
    responseRequest: response,
    errorRequest: null,
    showDialog: true,
    load: true
});

const errorState = error => ({
    types: [],
    errorRequest: error,
    showDialog: false,
    load: false
});

const initialState = ({
    types: [],
    responseRequest: null,
    errorRequest: null,
    showDialog: false,
    load: true
});

export const createTypes = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TYPES: {
            return {...state, types: action.payload, errorRequest: null, load: false, responseRequest: null}
        }
        case CREATE_TYPES_BI: {
            return {...state, responseRequest: action.payload}
        }
        case UPDATE_TYPES_BI: {
            return {...state, responseRequest: action.payload}
        }
        case DELETE_TYPES_BI: {
            return {...state, responseRequest: action.payload}
        }
        default: {
            return state
        }
    }
};
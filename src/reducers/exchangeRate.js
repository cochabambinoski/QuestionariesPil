import {
    GET_EXCHANGE_RATE,
    DELETE_EXCHANGE_RATE,
    CREATE_EXCHANGE_RATE,
    UPDATE_EXCHANGE_RATE,
    CLEAN_EXCHANGE_RATE_REDUCER,
    CHANGE_ERROR_EXCHANGE_RATE
} from "../action-types/actionTypes";

const getResponse = response => ({
    exchangesRate: [],
    accountsDimension: [],
    timeDimension: [],
    responseRequest: response,
    errorRequest: null,
    showDialog: true,
    load: false,
});

const errorRequest = error => ({
    exchangesRate: [],
    accountsDimension: [],
    timeDimension: [],
    responseRequest: null,
    errorRequest: error,
    showDialog: false,
    load: false,
});

const initialState = ({
    exchangesRate: [],
    accountsDimension: [],
    timeDimension: [],
    responseRequest: null,
    errorRequest: null,
    showDialog: false,
    load: true,
});

export const exchangeRate = (state = initialState, action) =>  {
    switch (action.type) {
        case GET_EXCHANGE_RATE: {
            return {state: getResponse(action.payload)}
        }
        case DELETE_EXCHANGE_RATE: {
            return {state: getResponse(action.payload)}
        }
        case CREATE_EXCHANGE_RATE: {
            return {state: getResponse(action.payload)}
        }
        case UPDATE_EXCHANGE_RATE: {
            return {state: getResponse(action.payload)}
        }
        case CHANGE_ERROR_EXCHANGE_RATE: {
            return {state: errorRequest(action.payload)}
        }
        case CLEAN_EXCHANGE_RATE_REDUCER: {
            return {state: initialState}
        }
        default:
            return state;
    }
};

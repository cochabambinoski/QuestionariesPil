import {
    CHANGE_ERROR_EXCHANGE_RATE_BI, CLEAN_REQUEST_EXCHANGE_RATE_BI,
    CREATE_EXCHANGE_RATE_BI, DELETE_EXCHANGE_RATE_BI,
    GET_INITIAL_DATA_EXCHANGE_RATE_BI, UPDATE_EXCHANGE_RATE_BI
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

export const exchangeRate = (state = initialState, action) => {
    switch (action.type) {
        case GET_INITIAL_DATA_EXCHANGE_RATE_BI: {
            return {
                ...state, exchangesRate: action.payload.exchangesRate,
                accountsDimension: action.payload.accountsDimension,
                timeDimension: action.payload.timeDimension,
                load: false,
            }
        }
        case CREATE_EXCHANGE_RATE_BI: {
            return {state: getResponse(action.payload)}
        }
        case UPDATE_EXCHANGE_RATE_BI: {
            return {state: getResponse(action.payload)}
        }
        case DELETE_EXCHANGE_RATE_BI: {
            return {state: getResponse(action.payload)}
        }
        case CHANGE_ERROR_EXCHANGE_RATE_BI: {
            return {state: errorRequest(action.payload)}
        }
        case CLEAN_REQUEST_EXCHANGE_RATE_BI: {
            return {state: initialState}
        }
        default:
            return state;
    }
};

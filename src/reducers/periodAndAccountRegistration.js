import {
    LOAD_INIT_DATA_ACCOUNT_PERIOD_REGISTRATION_BI,
    CREATE_ACCOUNT_PERIOD_BI,
    UPDATE_ACCOUNT_PERIOD_BI,
    DELETE_ACCOUNT_PERIOD_BI,
    CHANGE_ERROR_REQUEST_ACCOUNT_PERIOD_BI,
    CLEAN_REQUEST_ACCOUNT_PERIOD_BI, GET_DATA_CREATE_ACCOUNT_PERIOD
} from "../action-types/actionTypes";

const errorState = error => ({
    accountsPeriod: [],
    accountsDimension: [],
    datesDimension: [],
    responseRequest: null,
    errorRequest: error,
    showDialog: false,
    load: false
});

const initialState = ({
    accountsPeriod: [],
    accountsDimension: [],
    datesDimension: [],
    responseRequest: null,
    errorRequest: null,
    showDialog: false,
    load: true
});

export const periodAndAccountRegistration = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INIT_DATA_ACCOUNT_PERIOD_REGISTRATION_BI: {
            return {...state, accountsPeriod: action.payload}
        }
        case CREATE_ACCOUNT_PERIOD_BI: {
            return {...state, responseRequest: action.payload, accountsPeriod: []}
        }
        case UPDATE_ACCOUNT_PERIOD_BI: {
            return {...state, responseRequest: action.payload, accountsPeriod: []}
        }
        case DELETE_ACCOUNT_PERIOD_BI: {
            return {...state, responseRequest: action.payload, accountsPeriod: []}
        }
        case CHANGE_ERROR_REQUEST_ACCOUNT_PERIOD_BI: {
            return {state: errorState(action.payload)}
        }
        case CLEAN_REQUEST_ACCOUNT_PERIOD_BI: {
            return {
                ...state, accountsDimension: [],
                datesDimension: [],
                responseRequest: null,
                errorRequest: null,
                showDialog: false,
                load: true
            }
        }
        case GET_DATA_CREATE_ACCOUNT_PERIOD: {
            return {
                ...state,
                accountsDimension: action.payload.accountsDimension,
                datesDimension: action.payload.dateDimension
            }
        }
        default:
            return state;
    }
};

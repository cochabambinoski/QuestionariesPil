import {
    CHANGE_ERROR_OPERATING_ACCOUNTS_BI, CLEAN_REQUEST_OPERATING_ACCOUNTS_BI,
    CREATE_OPERATING_ACCOUNTS_BI, DELETE_OPERATING_ACCOUNTS_BI,
    GET_INITIAL_DATA_OPERATING_ACCOUNTS_BI,
    UPDATE_OPERATING_ACCOUNTS_BI
} from "../action-types/actionTypes";

const errorState = error => ({
    operatingAccounts: [],
    types: [],
    accountDimensions: [],
    responseRequest: null,
    errorRequest: error,
    showDialog: false,
    load: true
});

const initialState = ({
    operatingAccounts: [],
    types: [],
    accountDimensions: [],
    responseRequest: null,
    errorRequest: null,
    showDialog: false,
    load: true
});

export const operatingAccounts = (state = initialState, action) => {
    switch (action.type) {
        case GET_INITIAL_DATA_OPERATING_ACCOUNTS_BI:
            return {
                ...state,
                operatingAccounts: action.payload.operatingAccounts,
                types: action.payload.types,
                accountDimensions: action.payload.accountDimensions,
                responseRequest: null,
                errorRequest: null,
                showDialog: false,
                load: false
            };
        case CREATE_OPERATING_ACCOUNTS_BI:
            return {
                ...state,
                responseRequest: action.payload,
                operatingAccounts: [],
                types: [],
                accountDimensions: [],
                load: true
            };
        case UPDATE_OPERATING_ACCOUNTS_BI:
            return {
                ...state,
                responseRequest: action.payload,
                operatingAccounts: [],
                types: [],
                accountDimensions: [],
                load: true
            };
        case DELETE_OPERATING_ACCOUNTS_BI:
            return {
                ...state,
                operatingAccounts: [],
                types: [],
                accountDimensions: [],
                responseRequest: action.payload,
                errorRequest: null,
                showDialog: false,
                load: true
            };
        case CHANGE_ERROR_OPERATING_ACCOUNTS_BI:
            return {state: errorState(action.payload)};
        case CLEAN_REQUEST_OPERATING_ACCOUNTS_BI:
            return {...state, operatingAccounts: [],
                types: [],
                accountDimensions: [],
                responseRequest: null,
                errorRequest: null,
                showDialog: false,
                load: true};
        default:
            return state;
    }
};

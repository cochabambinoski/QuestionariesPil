import {
    CLEAN_REQUEST,
    GENERATION_EXPENSES, LOAD_COST_BASE_INFORMATION,
    LOAD_INPUT_BASE_INFORMATION, CHANGE_ERROR_REQUEST
} from "../action-types/actionTypes"

const initialState = ({
    generationExpenses: null,
    showDialog: false,
    responseRequest: null,
    response: null,
    errorRequest: null,
    load: false,
});

export const processConfirmation = (state = initialState, action) => {
    switch (action.type) {
        case GENERATION_EXPENSES: {
            return {...state, generationExpenses: action.payload, responseRequest: action.payload, load: true, showDialog:true}
        }
        case LOAD_INPUT_BASE_INFORMATION: {
            return {...state, responseRequest: action.payload, load: true, showDialog: true}
        }
        case LOAD_COST_BASE_INFORMATION: {
            return {...state, responseRequest: action.payload, load: true, showDialog: true}
        }
        case CHANGE_ERROR_REQUEST: {
            return {...state, responseRequest: null, load: true, showDialog: true, errorRequest: action.payload}
        }
        case CLEAN_REQUEST: {
            return {...state, generationExpenses: null, responseRequest: null, response: null, errorRequest: null, load: false, showDialog: false}
        }
        default:
            return state;
    }
};

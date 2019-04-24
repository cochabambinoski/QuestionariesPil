import {
    LOAD_BASE_DATA_CREATE_CENTER_MASTER_AND_COST,
    DELETE_CONDITION_CENTER_MASTER,
    UPDATE_CONDITION_CENTER_MASTER,
    CREATE_CONDITION_CENTER_MASTER,
    GET_CENTER_COST_CONDITION_BI,
    GET_COST_CENTER_BI,
    GET_BUSINESS_BI,
    GET_LINE_COST_BI,
    GET_ORGANIZATION_BI,
    GET_CHANNEL_BI,
    GET_REGION_BI,
    GET_SUB_REGION_BI,
    CHANGE_ERROR_REQUEST_BI,
    CLEAN_REQUEST_BI
} from '../action-types/actionTypes';

const getResponse = response => ({
    centerCostConditions: [],
    centerCost: [],
    business: [],
    lineCost: [],
    organization: [],
    channel: [],
    region: [],
    subRegion: [],
    responseRequest: response,
    errorRequest: null,
    showDialog: true,
    load: true
});

const errorState = error => ({
    centerCostConditions: [],
    centerCost: [],
    business: [],
    lineCost: [],
    organization: [],
    channel: [],
    region: [],
    subRegion: [],
    responseRequest: null,
    errorRequest: error,
    showDialog: false,
    load: false
});

const initialState = ({
    centerCostConditions: [],
    centerCost: [],
    business: [],
    lineCost: [],
    organization: [],
    channel: [],
    region: [],
    subRegion: [],
    responseRequest: null,
    errorRequest: null,
    showDialog: false,
    load: true
});

export const createCenterMasterAndCost = (state = initialState, action) => {
    switch (action.type) {
        case GET_CENTER_COST_CONDITION_BI: {
            return {...state, centerCostConditions: action.payload, errorRequest: null, load: false}
        }
        case GET_COST_CENTER_BI: {
            return {...state, centerCost: action.payload, errorRequest: null}
        }
        case GET_BUSINESS_BI: {
            return {...state, business: action.payload, errorRequest: null}
        }
        case GET_LINE_COST_BI: {
            return {...state, lineCost: action.payload, errorRequest: null}
        }
        case GET_ORGANIZATION_BI: {
            return {...state, organization: action.payload, errorRequest: null}
        }
        case GET_CHANNEL_BI: {
            return {...state, channel: action.payload, errorRequest: null}
        }
        case GET_REGION_BI: {
            return {...state, region: action.payload, errorRequest: null}
        }
        case GET_SUB_REGION_BI: {
            return {...state, subRegion: action.payload, errorRequest: null}
        }
        case LOAD_BASE_DATA_CREATE_CENTER_MASTER_AND_COST: {
            return {state: getResponse(action.payload)}
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

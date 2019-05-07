import {
    LOAD_BASE_DATA_CREATE_CENTER_MASTER_AND_COST,
    DELETE_CONDITION_CENTER_MASTER,
    UPDATE_CONDITION_CENTER_MASTER,
    CREATE_CONDITION_CENTER_MASTER,
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
        case LOAD_BASE_DATA_CREATE_CENTER_MASTER_AND_COST: {
            return {...state,
                centerCostConditions: action.payload.centerCostConditions,
                centerCost: action.payload.centerCost,
                business: action.payload.business,
                lineCost: action.payload.lineCost,
                organization: action.payload.organization,
                channel: action.payload.organization,
                region: action.payload.region,
                subRegion: action.payload.subRegion,
                load:false
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

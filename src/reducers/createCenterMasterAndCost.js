import {
    CHANGE_ERROR_REQUEST_CCMAC,
    CLEAN_REQUEST_CCMAC,
    LOAD_BASE_DATA_CREATE_CENTER_MASTER_AND_COST
} from '../actions/actionTypes';

const getResponse = response => ({
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
                centerCost: action.payload.centerCost,
                business: action.payload.business,
                lineCost: action.payload.lineCost,
                organization: action.payload.organization,
                channel: action.payload.channel,
                region: action.payload.region,
                subRegion: action.payload.subRegion,
                load: false
            }
        }
        case CHANGE_ERROR_REQUEST_CCMAC: {
            return {state: errorState(action.payload)}
        }
        case CLEAN_REQUEST_CCMAC: {
            return {state: initialState}
        }
        default:
            return state;
    }
};

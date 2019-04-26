import {DELETE_CONCEPT_BI, GET_ALL_CONCEPTS} from "../action-types/actionTypes";

const getResponse = response => ({
    concepts: [],
    responseRequest: response,
    errorRequest: null,
    showDialog: true,
    load: true
});

const errorState = error => ({
    concepts: [],
    errorRequest: error,
    showDialog: false,
    load: false
});

const initialState = ({
    concepts: [],
    responseRequest: null,
    errorRequest: null,
    showDialog: false,
    load: true
});

export const createConcepts = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CONCEPTS: {
            return {...state, concepts: action.payload, errorRequest:null, load:false}
        }
        case DELETE_CONCEPT_BI: {
            return {state:getResponse(action.payload)}
        }
        default: {
            return state
        }
    }
};

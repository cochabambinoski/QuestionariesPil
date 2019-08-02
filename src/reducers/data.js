import {SEARCH_ASYNC_ENTITIES} from "../actions/actionTypes";

const initialState = (
    {
        search: '',
        entities: []
    }
);

function data(state = initialState, action) {
    switch (action.type) {
        case SEARCH_ASYNC_ENTITIES:{
        }
        default:
            return state;
    }
}

export default data;

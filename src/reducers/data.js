import {DATA, SEARCH_ASYNC_ENTITIES} from "../action-types/actionTypes";

const initialState = (
    {
        search: '',
        entities: []
    }
);

function data(state = initialState, action) {
    switch (action.type) {
        case SEARCH_ASYNC_ENTITIES:{
            return console.log("DATA")
        }
        default:
            return state;
    }
}

export default data;
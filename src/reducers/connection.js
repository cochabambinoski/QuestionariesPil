import {SET_CONNECTION} from './../actions/indexthunk';

export const connection = (state = false, action) => {
    switch (action.type) {
        case SET_CONNECTION:
            return action.payload;
        default:
            return state;
    }
};
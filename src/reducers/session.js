import {fromJS} from 'immutable'
import {CLOSE_SESSION} from "../action-types/actionTypes";

const initialState = fromJS({
   sessionActive: true,
});

function session(state = initialState, action) {
    switch (action.type) {
        case CLOSE_SESSION:{
            return console.log("close session")
        }
        default:
            return state;
    }
}

export default session;
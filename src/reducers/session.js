import {fromJS} from 'immutable'
import {CLOSE_SESSION, ADD_TIME} from "../action-types/actionTypes";

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

function addTime(state = initialState, action){
    function session(state = initialState, action) {
        switch (action.type) {
            case ADD_TIME:{
                return console.log("ADD sTIME")
            }
            default:
                return state;
        }
    }
}

export default session;
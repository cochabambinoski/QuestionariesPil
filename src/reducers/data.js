import {DATA} from "../action-types/actionTypes";
import {fromJS} from "immutable";

const initialState = fromJS({
    dataTestState: '',
});

function data(state = initialState, action) {
    switch (action.type) {
        case DATA:{
            return console.log("DATA")
        }
        default:
            return state;
    }
}

export default data;
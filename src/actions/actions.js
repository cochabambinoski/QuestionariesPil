import {CLOSE_SESSION, DATA} from "../action-types/actionTypes";

export function closeSession() {
    return{
        type: CLOSE_SESSION,
    }
}

export function data() {
    return{
        type: DATA,
    }
}
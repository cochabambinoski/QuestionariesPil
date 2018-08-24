import {CLOSE_SESSION, DATA, ADD_TIME} from "../action-types/actionTypes";

export function closeSession() {
    return{
        type: CLOSE_SESSION,
    }
}

export function addTime() {
    console.log("addTime");
    return{
        type: ADD_TIME,
    }
}

export function data() {
    return{
        type: DATA,
    }
}
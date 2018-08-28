import { SET_ID_USER} from "../action-types/actionTypes";

export const idUser = (state = {}, action) => {
    switch (action.type) {
        case SET_ID_USER:{
            return action.payload
        }
        default:
            return state;
    }
};
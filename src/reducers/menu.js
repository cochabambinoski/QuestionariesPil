import { SET_MENU_CONTAINER} from "../action-types/actionTypes";

export const idMenu = (state = {}, action) => {
    switch (action.type) {
        case SET_MENU_CONTAINER:{
            return action.payload
        }
        default:
            return state;
    }
};
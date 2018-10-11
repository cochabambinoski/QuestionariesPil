import { SET_ID_USER, SET_USER, SET_MENU} from "../action-types/actionTypes";

const initialState = ({
        idUser: null,
        user: null,
        menuUser: null,
    }
);

export function user(state = initialState, action) {
    switch (action.type) {
        case SET_ID_USER:{
            return {...state, idUser: action.payload}
        }
        case SET_USER:{
            return {...state, user: action.payload}
        }
        case SET_MENU:{
            return {...state, menuUser: action.payload}
        }
        default:
            return state;
    }
}
import {SAVE_CLIENT, SAVE_INTERVIEWED_NAME, TRIED_TO_SAVE, UPDATE_MARKED_OPTIONS} from "../action-types/actionTypes";

const initialState = (
    {
        markedOptions: {},
        triedToSave: false,
        client: null,
        interviewedName: "",
    }
);

export function answer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MARKED_OPTIONS: {
            let marked = {...state.markedOptions};
            marked[action.payload.id] = action.payload.value;
            return {
                ...state,
                markedOptions: marked
            }
        }
        case TRIED_TO_SAVE: {
            return {
                ...state,
                triedToSave: action.payload
            }
        }
        case SAVE_CLIENT: {
            return {
                ...state,
                client: action.payload
            }
        }
        case SAVE_INTERVIEWED_NAME: {
            return {
                ...state,
                interviewedName: action.payload
            }
        }
        default:
            return state;
    }
}
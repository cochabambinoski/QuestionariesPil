import {ADD_ASSIGNEMENT_USER, DELETE_ASSIGNEMENT_USER, EDIT_ASSIGNEMENT_USER, DELETE_ALL_ASSIGNEMENT_USER} from "../action-types/actionTypes";

const initialState = (
    {
        filter: {},
        entities: []
    }
);

export function assignmentUser (state = initialState, action) {
    const sellers = state.entities;
    switch (action.type) {
        case ADD_ASSIGNEMENT_USER: {
            {
                sellers.push(action.payload);
                return {
                    ...state,
                    entities: sellers}
            }
        }
        case DELETE_ASSIGNEMENT_USER: {
            {
                remove(sellers, action.payload)
                return {...state, entities: sellers};
            }
        }
        case DELETE_ALL_ASSIGNEMENT_USER: {
            {
                return {...state, entities: []};
            }
        }
        case EDIT_ASSIGNEMENT_USER: {
            return state.assignmentUser.push(action.payload);
        }
        default:
            return state;
    }
};

function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}
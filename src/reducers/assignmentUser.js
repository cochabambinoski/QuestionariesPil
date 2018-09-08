import {
    ADD_ASSIGNEMENT_USER,
    DELETE_ASSIGNEMENT_USER,
    EDIT_ASSIGNEMENT_USER,
    DELETE_ALL_ASSIGNEMENT_USER,
    SAVE_MOBILE_LIST_AUX,
    DELETE_MOBILE_LIST_AUX,
    ADD_MOBILE_SELLERS,
    ADD_MOBILE_SELLER,
    DELETE_MOBILE_SELLERS
} from "../action-types/actionTypes";

const initialState = (
    {
        filter: {},
        entities: [],
        entitiesAux: [],
        entitiesFilter: [],
        mobileSellers: [],
    }
);

export function assignmentUser(state = initialState, action) {
    const sellers = state.entities;
    const mobileSellers = state.mobileSellers;
    switch (action.type) {
        case ADD_ASSIGNEMENT_USER: {
            remove(mobileSellers, action.payload);
            sellers.push(action.payload);
            return {
                ...state,
                entities: sellers,
                mobileSellers: mobileSellers
            }
        }
        case DELETE_ASSIGNEMENT_USER: {
            mobileSellers.push(action.payload);
            remove(sellers, action.payload);
            return {
                ...state
                , entities: sellers,
                mobileSellers: mobileSellers
            };
        }
        case DELETE_ALL_ASSIGNEMENT_USER: {
            return {...state, entities: []};
        }
        case EDIT_ASSIGNEMENT_USER: {
            return state.assignmentUser.push(action.payload);
        }
        case SAVE_MOBILE_LIST_AUX: {
            return {...state, entitiesAux: action.payload};
        }
        case DELETE_MOBILE_LIST_AUX: {
            return {...state, entitiesAux: []};
        }
        case DELETE_MOBILE_SELLERS: {
            return {...state, mobileSellers: []};
        }
        case ADD_MOBILE_SELLERS: {
            return {...state, mobileSellers: action.payload};
        }
        case ADD_MOBILE_SELLER: {
            mobileSellers.push(action.payload);
            return {
                ...state,
                mobileSellers: sellers
            }
        }
        default:
            return state;
    }
};

function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}
import {
    ADD_ASSIGNEMENT_USER,
    DELETE_ASSIGNEMENT_USER,
    EDIT_ASSIGNEMENT_USER,
    DELETE_ALL_ASSIGNEMENT_USER,
    SAVE_MOBILE_LIST_AUX,
    DELETE_MOBILE_LIST_AUX,
    ADD_MOBILE_SELLERS,
    ADD_MOBILE_SELLER,
    DELETE_MOBILE_SELLERS,
    ADD_ALL_ASSIGNEMENT_USER,
    REMOVE_ALL_ASSIGNEMENT_USER,
    SAVE_MOBILE_ASSIGNED_LIST_AUX,
    DELETE_MOBILE_ASSIGNED_LIST_AUX
} from "../actions/actionTypes";
import {SET_QUESTIONNAIRE_ASSIGNEMENTS} from "../actions/indexthunk";

const initialState = (
    {
        filter: {},
        entities: [],
        mobileSellerAssignedAux: [],
        mobileSellers: [],
        mobileSellersAux: [],
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

        case ADD_ALL_ASSIGNEMENT_USER: {
            return {
                ...state,
                entities: state.entities.concat(action.payload),
                mobileSellers: state.mobileSellers.filter(x => !action.payload.includes(x))
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

        case REMOVE_ALL_ASSIGNEMENT_USER: {
            return {
                ...state
                , entities: state.entities.filter(x => !action.payload.includes(x)),
                mobileSellers: action.payload,
            };
        }

        case DELETE_ALL_ASSIGNEMENT_USER: {
            return {...state, entities: []};
        }
        case EDIT_ASSIGNEMENT_USER: {
            return state.assignmentUser.push(action.payload);
        }
        case SAVE_MOBILE_LIST_AUX: {
            return {...state, mobileSellersAux: action.payload};
        }
        case SAVE_MOBILE_ASSIGNED_LIST_AUX: {
            return {...state, mobileSellerAssignedAux: action.payload};
        }
        case DELETE_MOBILE_LIST_AUX: {
            return {...state, mobileSellersAux: []};
        }
        case DELETE_MOBILE_ASSIGNED_LIST_AUX: {
            return {...state, mobileSellerAssignedAux: []};
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
        case SET_QUESTIONNAIRE_ASSIGNEMENTS:
            return {...state, assignmentsNumber: action.payload};
        default:
            return state;
    }
};

function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}

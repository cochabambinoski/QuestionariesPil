import {
    EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST,
    EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST,
    EDIT_QUERY_TEXT_MOBILE_SELLER_LIST} from "../action-types/actionTypes";

const initialState = (
    {
        queryMobileSeller: "",
        queryMobileSellerAssigned: "",
        queryQuestionaryAssigned: "",
    }
);

export function searchFilter (state = initialState, action) {
    switch (action.type) {
        case EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST: {
            {
                return {...state, queryQuestionaryAssigned: action.payload};
            }
        }
        case EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST: {
            {
                return {...state, queryMobileSellerAssigned: action.payload};
            }
        }
        case EDIT_QUERY_TEXT_MOBILE_SELLER_LIST: {
            {
                return {...state, queryMobileSeller: action.payload};
            }
        }
        default:
            return state;
    }
}

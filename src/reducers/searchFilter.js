import {
    EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST,
    EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST,
    EDIT_QUERY_TEXT_MOBILE_SELLER_LIST,
    ADD_PARAM_FILTER_MOBILE_SELLER_TYPE,
    ADD_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    DELETE_PARAM_FILTER_MOBILE_SELLER_TYPE,
    DELETE_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    CONCAT_FILTER_MOBILE_SELLER_BRANCH, CONCAT_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH
} from "../action-types/actionTypes";
import {remove} from '../Util/ArrayFilterUtil'

const initialState = (
    {
        queryMobileSeller: "",
        queryMobileSellerAssigned: "",
        queryAdvancedMobileSellerType: [],
        queryAdvancedMobileSellerBranch: [],
        queryAdvanceMobileSellerAssigned: "",
        queryAdvancedMobileSellerAssignedType: [],
        queryAdvancedMobileSellerAssignedBranch: [],
        queryQuestionaryAssigned: "",
    }
);

export function searchFilter(state = initialState, action) {
    const queryAdvancedMobileSellerType = state.queryAdvancedMobileSellerType;
    const queryAdvancedMobileSellerBranch = state.queryAdvancedMobileSellerBranch;

    const queryAdvancedMobileSellerAssignedType = state.queryAdvancedMobileSellerAssignedType;
    const queryAdvancedMobileSellerAssignedBranch = state.queryAdvancedMobileSellerAssignedBranch;

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
        case ADD_PARAM_FILTER_MOBILE_SELLER_TYPE: {
            {
                queryAdvancedMobileSellerType.push(action.payload);
                return {
                    ...state,
                    queryAdvancedMobileSellerType: queryAdvancedMobileSellerType,
                }
            }
        }
        case ADD_PARAM_FILTER_MOBILE_SELLER_BRANCH: {
            {
                queryAdvancedMobileSellerBranch.push(action.payload);
                return {
                    ...state,
                    queryAdvancedMobileSellerBranch: queryAdvancedMobileSellerBranch,
                }
            }
        }

        case CONCAT_FILTER_MOBILE_SELLER_BRANCH: {
            {
                queryAdvancedMobileSellerBranch.unshift(action.payload);
                return {
                    ...state,
                    queryAdvancedMobileSellerBranch: queryAdvancedMobileSellerBranch,
                }
            }
        }

        case ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE: {
            {
                queryAdvancedMobileSellerAssignedType.push(action.payload);
                return {
                    ...state,
                    queryAdvancedMobileSellerAssignedType: queryAdvancedMobileSellerAssignedType,
                }
            }
        }
        case ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH : {
            {
                queryAdvancedMobileSellerAssignedBranch.push(action.payload);
                return {
                    ...state,
                    queryAdvancedMobileSellerAssignedBranch: queryAdvancedMobileSellerAssignedBranch,
                }
            }
        }

        case CONCAT_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH : {
            {
                queryAdvancedMobileSellerAssignedBranch.concat(action.payload);
                return {
                    ...state,
                    queryAdvancedMobileSellerAssignedBranch: queryAdvancedMobileSellerAssignedBranch,
                }
            }
        }

        case DELETE_PARAM_FILTER_MOBILE_SELLER_TYPE: {
            remove(queryAdvancedMobileSellerType, action.payload);
            return {
                ...state,
                queryAdvancedMobileSellerType: queryAdvancedMobileSellerType,
            }
        }
        case DELETE_PARAM_FILTER_MOBILE_SELLER_BRANCH: {
            remove(queryAdvancedMobileSellerBranch, action.payload);
            return {
                ...state,
                queryAdvancedMobileSellerBranch: queryAdvancedMobileSellerBranch,
            }
        }
        case DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE: {
            remove(queryAdvancedMobileSellerAssignedType, action.payload);
            return {
                ...state,
                queryAdvancedMobileSellerAssignedType: queryAdvancedMobileSellerAssignedType,
            }
        }
        case DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH: {
            remove(queryAdvancedMobileSellerAssignedBranch, action.payload);
            return {
                ...state,
                queryAdvancedMobileSellerAssignedBranch: queryAdvancedMobileSellerAssignedBranch,
            }
        }
        default:
            return state;
    }
}

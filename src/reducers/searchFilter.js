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
    switch (action.type) {
        case EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST: {
            return {...state, queryQuestionaryAssigned: action.payload};
        }
        case EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST: {
            return {...state, queryMobileSellerAssigned: action.payload};
        }
        case EDIT_QUERY_TEXT_MOBILE_SELLER_LIST: {
            return {...state, queryMobileSeller: action.payload};
        }
        case ADD_PARAM_FILTER_MOBILE_SELLER_TYPE: {
            return {
                ...state,
                queryAdvancedMobileSellerType: [...state.queryAdvancedMobileSellerType, action.payload],
            }
        }
        case ADD_PARAM_FILTER_MOBILE_SELLER_BRANCH: {
            return {
                ...state,
                queryAdvancedMobileSellerBranch: [...state.queryAdvancedMobileSellerBranch, action.payload],
            }
        }

        case CONCAT_FILTER_MOBILE_SELLER_BRANCH: {
            return {
                ...state,
                queryAdvancedMobileSellerBranch: [...state.queryAdvancedMobileSellerBranch, action.payload],
            }
        }

        case ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE: {
            return {
                ...state,
                queryAdvancedMobileSellerAssignedType: [...state.queryAdvancedMobileSellerAssignedType, action.payload],
            }
        }
        case ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH : {
            return {
                ...state,
                queryAdvancedMobileSellerAssignedBranch: [...state.queryAdvancedMobileSellerAssignedBranch, action.payload],
            }
        }

        case CONCAT_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH : {
            return {
                ...state,
                queryAdvancedMobileSellerAssignedBranch: [...state.queryAdvancedMobileSellerAssignedBranch, action.payload ],
            }
        }

        case DELETE_PARAM_FILTER_MOBILE_SELLER_TYPE: {
            return {
                ...state,
                queryAdvancedMobileSellerType: state.queryAdvancedMobileSellerType.filter(item => item !== action.payload),
            }
        }
        case DELETE_PARAM_FILTER_MOBILE_SELLER_BRANCH: {
            return {
                ...state,
                queryAdvancedMobileSellerBranch: state.queryAdvancedMobileSellerBranch.filter(item => item !== action.payload),
            }
        }
        case DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE: {
            return {
                ...state,
                queryAdvancedMobileSellerAssignedType: state.queryAdvancedMobileSellerAssignedType.filter(item => item !== action.payload),
            }
        }
        case DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH: {
            return {
                ...state,
                queryAdvancedMobileSellerAssignedBranch: state.queryAdvancedMobileSellerAssignedBranch.filter(item => item !== action.payload),
            }
        }
        default:
            return state;
    }
}

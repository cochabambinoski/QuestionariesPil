import {
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    ADD_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_TYPE,
    CHANGE_OPERATION_ID_BRANCH_SELLER,
    CHANGE_OPERATION_ID_BRANCH_SELLER_ASSIGNED,
    CLEAN_FILTER,
    CONCAT_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    CONCAT_FILTER_MOBILE_SELLER_BRANCH,
    DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    DELETE_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    DELETE_PARAM_FILTER_MOBILE_SELLER_TYPE,
    EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST,
    EDIT_QUERY_TEXT_MOBILE_SELLER_LIST,
    EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST
} from "../action-types/actionTypes";

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
    const array = state.queryAdvancedMobileSellerBranch;
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
                queryAdvancedMobileSellerAssignedBranch: [...state.queryAdvancedMobileSellerAssignedBranch, action.payload],
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
                queryAdvancedMobileSellerBranch: state.queryAdvancedMobileSellerBranch.filter(item => item.id !== action.payload.id),
            }
        }
        case CHANGE_OPERATION_ID_BRANCH_SELLER: {
            return  Object.assign({}, state, {
                queryAdvancedMobileSellerBranch: state.queryAdvancedMobileSellerBranch.map((branch) => {
                    console.log(branch.id === action.payload.id);
                    if (branch.id === action.payload.id){
                        return Object.assign({}, branch, {
                            operacionId: action.payload.operacionId
                        })
                    }
                    return branch
                })
            })
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
        case CHANGE_OPERATION_ID_BRANCH_SELLER_ASSIGNED: {;
            return  Object.assign({}, state, {
                queryAdvancedMobileSellerAssignedBranch: state.queryAdvancedMobileSellerAssignedBranch.map((branch) => {
                    console.log(branch.id === action.payload.id);
                    if (branch.id === action.payload.id){
                        return Object.assign({}, branch, {
                            operacionId: action.payload.operacionId
                        })
                    }
                    return branch
                })
            })
        }
        case CLEAN_FILTER: {
            return {
                ...state, queryMobileSeller: "",
                queryMobileSellerAssigned: "",
                queryAdvancedMobileSellerType: [],
                queryAdvancedMobileSellerBranch: [],
                queryAdvanceMobileSellerAssigned: "",
                queryAdvancedMobileSellerAssignedType: [],
                queryAdvancedMobileSellerAssignedBranch: [],
                queryQuestionaryAssigned: "",
            }
        }
        default:
            return state;
    }
}

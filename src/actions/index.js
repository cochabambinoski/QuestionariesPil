import {
    ADD_ALL_ASSIGNEMENT_USER,
    ADD_ASSIGNEMENT_USER,
    ADD_MOBILE_SELLER,
    ADD_MOBILE_SELLERS,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    ADD_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_TYPE,
    CHANGE_ID_EXISTING_QUESTIONARY,
    CHANGE_OPERATION_ID_BRANCH_SELLER,
    CHANGE_OPERATION_ID_BRANCH_SELLER_ASSIGNED,
    CLEAN_FILTER,
    CONCAT_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    CONCAT_FILTER_MOBILE_SELLER_BRANCH,
    CREATE_QUESTION,
    CREATE_QUESTION_OPTION,
    CREATE_QUESTIONARY,
    CREATE_QUESTIONARY_RANGE,
    DATA,
    DELETE_ALL_ASSIGNEMENT_USER,
    DELETE_ASSIGNEMENT_USER,
    DELETE_MOBILE_ASSIGNED_LIST_AUX,
    DELETE_MOBILE_LIST_AUX,
    DELETE_MOBILE_SELLERS,
    DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    DELETE_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    DELETE_PARAM_FILTER_MOBILE_SELLER_TYPE,
    DELETE_QUESTION,
    DELETE_QUESTION_OPTION,
    DELETE_QUESTIONARY,
    DELETE_QUESTIONARY_RANGE,
    EDIT_ASSIGNEMENT_USER,
    EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST,
    EDIT_QUERY_TEXT_MOBILE_SELLER_LIST,
    EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST,
    FILL_OUT_QUESTION_OPTION_ALL,
    FILL_OUT_QUESTIONARY_RANGE_ALL,
    FILL_OUT_QUESTIONNAIRE,
    FILL_OUT_QUESTIONS_ALL,
    GET_ALL_BRANCHES,
    GET_ALL_DEPARTAMENTS,
    GET_INITIAL_DATA,
    REMOVE_ALL_ASSIGNEMENT_USER,
    SAVE_CLIENT,
    SAVE_INTERVIEWED_NAME,
    SAVE_MOBILE_ASSIGNED_LIST_AUX,
    SAVE_MOBILE_LIST_AUX,
    SEARCH_ASYNC_ENTITIES,
    SET_ID_USER,
    SET_INITIAL_DATA_QUESTIONER_QUESTIONARY,
    SET_INITIAL_DATA_TYPES_SELLER,
    SET_MENU,
    SET_MENU_CONTAINER,
    SET_REACH_TYPES,
    SET_SYSTEM_TYPES,
    SET_USER,
    TRIED_TO_SAVE,
    UPDATE_MARKED_OPTIONS
} from "../action-types/actionTypes";

export function data() {
    return {
        type: DATA,
    }
}

export const setIdUser = payload => ({type: SET_ID_USER, payload});

export const setUser = payload => ({type: SET_USER, payload});

export const setMenu = payload => ({type: SET_MENU, payload});

export const setMenuContainer = payload => ({type: SET_MENU_CONTAINER, payload});

export const addAssignementUser = payload => ({type: ADD_ASSIGNEMENT_USER, payload});

export const addAllAssignementUser = payload => ({type: ADD_ALL_ASSIGNEMENT_USER, payload});

export const deleteAssignementUser = payload => ({type: DELETE_ASSIGNEMENT_USER, payload});

export const removeAllAssignmentUser = payload => ({type: REMOVE_ALL_ASSIGNEMENT_USER, payload});

export const deleteAllAssignementUser = payload => ({type: DELETE_ALL_ASSIGNEMENT_USER, payload});

export const deleteMobileSellers = payload => ({type: DELETE_MOBILE_SELLERS, payload});

export const editAssignementUser = payload => ({type: EDIT_ASSIGNEMENT_USER, payload});

export const searchEntitiesAsync = payload => ({type: SEARCH_ASYNC_ENTITIES, payload});

export const setInitialData = payload => ({type: GET_INITIAL_DATA, payload});

export const editQueryTextMobileSellerList = payload => ({type: EDIT_QUERY_TEXT_MOBILE_SELLER_LIST, payload});

export const editQueryTextMobileSellerAssignedList = payload => ({
    type: EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST,
    payload
});

export const editQueryTextAssignedQuestionary = payload => ({type: EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST, payload});

export const addMobileSellers = payload => ({type: ADD_MOBILE_SELLERS, payload});

export const addMobileSeller = payload => ({type: ADD_MOBILE_SELLER, payload});

export const createQuestionary = payload => ({type: CREATE_QUESTIONARY, payload});

export const deleteQuestionary = payload => ({type: DELETE_QUESTIONARY});

export const fillOutQuestionnaire = payload => ({type: FILL_OUT_QUESTIONNAIRE, payload});

export const createQuestion = payload => ({type: CREATE_QUESTION, payload});

export const deleteQuestion = payload => ({type: DELETE_QUESTION, payload});

export const fillOutQuestionAll = payload => ({type: FILL_OUT_QUESTIONS_ALL, payload});

export const createQuestionOption = payload => ({type: CREATE_QUESTION_OPTION, payload});

export const deleteQuestionOption = payload => ({type: DELETE_QUESTION_OPTION, payload});

export const fillOutQuestionOptionAll = payload => ({type: FILL_OUT_QUESTION_OPTION_ALL, payload});

export const createQuestionaryRange = payload => ({type: CREATE_QUESTIONARY_RANGE, payload});

export const deleteQuestionaryRange = payload => ({type: DELETE_QUESTIONARY_RANGE, payload});

export const fillOutQuestionaryRangeAll = payload => ({type: FILL_OUT_QUESTIONARY_RANGE_ALL, payload});

export const changeIdExistingQuestionary = payload => ({type: CHANGE_ID_EXISTING_QUESTIONARY, payload});

export const setInitialDataQuestionerQuestionary = payload => ({
    type: SET_INITIAL_DATA_QUESTIONER_QUESTIONARY,
    payload
});

export const setInitialDataTypesSeller = payload => ({type: SET_INITIAL_DATA_TYPES_SELLER, payload});

export const getAllDepartaments = payload => ({type: GET_ALL_DEPARTAMENTS, payload});

export const getAllBranches = payload => ({type: GET_ALL_BRANCHES, payload});

export const addParamFilterMobileSellerType = payload => ({type: ADD_PARAM_FILTER_MOBILE_SELLER_TYPE, payload});

export const addParamFilterMobileSellerBranch = payload => ({type: ADD_PARAM_FILTER_MOBILE_SELLER_BRANCH, payload});

export const concatFilterMobileSellerBranch = payload => ({type: CONCAT_FILTER_MOBILE_SELLER_BRANCH, payload});

export const addParamFilterMobileSellerAssignedType = payload => ({
    type: ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    payload
});

export const addParamFilterMobileSellerAssignedBranch = payload => ({
    type: ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    payload
});

export const concatFilterMobileSellerAssignedBranch = payload => ({
    type: CONCAT_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    payload
});

export const deleteParamFilterMobileSellerType = payload => ({type: DELETE_PARAM_FILTER_MOBILE_SELLER_TYPE, payload});

export const deleteParamFilterMobileSellerBranch = payload => ({
    type: DELETE_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    payload
});

export const deleteParamFilterMobileSellerAssignedType = payload => ({
    type: DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    payload
});

export const deleteParamFilterMobileSellerAssignedBranch = payload => ({
    type: DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    payload
});

export const cleanFilter = payload => ({type: CLEAN_FILTER, payload});

export const changeOperationIdBranchSeller = payload => ({type: CHANGE_OPERATION_ID_BRANCH_SELLER, payload});

export const changeOperationIdBranchSellerAssigned = payload => ({
    type: CHANGE_OPERATION_ID_BRANCH_SELLER_ASSIGNED,
    payload
});

export const saveMobileSellerListAux = payload => ({type: SAVE_MOBILE_LIST_AUX, payload});

export const saveMobileSellerAssignedListAux = payload => ({type: SAVE_MOBILE_ASSIGNED_LIST_AUX, payload});

export const deleteSaveMobileSellerListAux = payload => ({type: DELETE_MOBILE_LIST_AUX, payload});

export const deleteSaveMobileSellerAssignedListAux = payload => ({type: DELETE_MOBILE_ASSIGNED_LIST_AUX, payload});

export const setSystemTypes = payload => ({type: SET_SYSTEM_TYPES, payload});

export const setReachTypes = payload => ({type: SET_REACH_TYPES, payload});

export const updateMarkedOptions = payload => ({type: UPDATE_MARKED_OPTIONS, payload});

export const triedToSave = payload => ({type: TRIED_TO_SAVE, payload});

export const saveClient = payload => ({type: SAVE_CLIENT, payload});

export const saveInterviewedName = payload => ({type: SAVE_INTERVIEWED_NAME, payload});
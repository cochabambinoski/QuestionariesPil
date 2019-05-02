import {
    ADD_ALL_ASSIGNEMENT_USER,
    ADD_ASSIGNEMENT_USER,
    ADD_MOBILE_SELLERS,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    ADD_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_TYPE,
    CHANGE_ID_EXISTING_QUESTIONARY,
    CHANGE_OPERATION_ID_BRANCH_SELLER,
    CHANGE_OPERATION_ID_BRANCH_SELLER_ASSIGNED,
    CLEAN_FILTER,
    CLEAN_REQUEST,
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
    EDIT_ASSIGNEMENT_USER,
    EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST,
    EDIT_QUERY_TEXT_MOBILE_SELLER_LIST,
    EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST,
    FILL_OUT_QUESTIONARY_RANGE_ALL,
    GET_ALL_BRANCHES,
    GET_ALL_DEPARTAMENTS,
    GET_ANSWERS,
    GET_QUESTIONNARIE_ANSWER,
    IS_SAVING_ANSWER,
    LOAD_COST_BASE_INFORMATION,
    LOAD_INPUT_BASE_INFORMATION,
    REMOVE_ALL_ASSIGNEMENT_USER,
    SAVE_CLIENT,
    SAVE_INTERVIEWED_NAME,
    SAVE_MOBILE_ASSIGNED_LIST_AUX,
    SAVE_MOBILE_LIST_AUX,
    SET_ID_USER,
    SET_INITIAL_DATA_QUESTIONER_QUESTIONARY,
    SET_INITIAL_DATA_TYPES_SELLER,
    SET_MARKED_OPTIONS,
    SET_MENU,
    SET_MENU_CONTAINER,
    SET_QUESTIONNAIRE_STATUS,
    SET_REACH_TYPES,
    SET_SYSTEM_TYPES,
    SET_USER,
    TRIED_TO_SAVE,
    UPDATE_MARKED_OPTIONS,
    CHANGE_ERROR_REQUEST,
    CHANGE_ERROR_REQUEST_BI,
    CLEAN_REQUEST_BI,
    DELETE_CONDITION_CENTER_MASTER,
    UPDATE_CONDITION_CENTER_MASTER,
    CREATE_CONDITION_CENTER_MASTER,
    LOAD_BASE_DATA_CREATE_CENTER_MASTER_AND_COST,
    LOAD_INIT_DATA_ACCOUNT_PERIOD_REGISTRATION_BI,
    CREATE_ACCOUNT_PERIOD_BI,
    UPDATE_ACCOUNT_PERIOD_BI,
    DELETE_ACCOUNT_PERIOD_BI,
    CHANGE_ERROR_REQUEST_ACCOUNT_PERIOD_BI,
    CLEAN_REQUEST_ACCOUNT_PERIOD_BI, GET_DATA_CREATE_ACCOUNT_PERIOD
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

export const editQueryTextMobileSellerList = payload => ({type: EDIT_QUERY_TEXT_MOBILE_SELLER_LIST, payload});

export const editQueryTextMobileSellerAssignedList = payload => ({
    type: EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST,
    payload
});

export const editQueryTextAssignedQuestionary = payload => ({type: EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST, payload});

export const addMobileSellers = payload => ({type: ADD_MOBILE_SELLERS, payload});

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

export const addParamFilterMobileSellerAssignedType = payload => ({
    type: ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    payload
});

export const addParamFilterMobileSellerAssignedBranch = payload => ({
    type: ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
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

export const setQuestionnaireStatus = payload => ({type: SET_QUESTIONNAIRE_STATUS, payload});

export const updateMarkedOptions = payload => ({type: UPDATE_MARKED_OPTIONS, payload});

export const setMarkedOptions = payload => ({type: SET_MARKED_OPTIONS, payload});

export const triedToSave = payload => ({type: TRIED_TO_SAVE, payload});

export const saveClient = payload => ({type: SAVE_CLIENT, payload});

export const saveInterviewedName = payload => ({type: SAVE_INTERVIEWED_NAME, payload});

export const setSavingAnswer = payload => ({type: IS_SAVING_ANSWER, payload});

export const getAnswers = payload => ({type: GET_ANSWERS, payload});

export const getAnswersQuestionnarie = payload => ({type: GET_QUESTIONNARIE_ANSWER, payload});

export const loadInputBaseInformation = payload => ({type: LOAD_INPUT_BASE_INFORMATION, payload});

export const loadCostBaseInformation = payload => ({type: LOAD_COST_BASE_INFORMATION, payload});

export const cleanRequestResponse = () => ({type: CLEAN_REQUEST});

export const changeErrorRequest = payload => ({type: CHANGE_ERROR_REQUEST, payload});

export const changeErrorBi = payload => ({type: CHANGE_ERROR_REQUEST_BI, payload});

export const cleanRequestBi = () => ({type: CLEAN_REQUEST_BI});

export const deleteCenterCostConditionBi = payload =>({type: DELETE_CONDITION_CENTER_MASTER, payload});

export const updateCenterConstConditionBi = payload => ({type: UPDATE_CONDITION_CENTER_MASTER, payload});

export const createCenterCostConditionBi = payload => ({type: CREATE_CONDITION_CENTER_MASTER, payload});

export const getInitialDataCenterCostConditonBi = payload => ({type: LOAD_BASE_DATA_CREATE_CENTER_MASTER_AND_COST, payload});

export const getDataCreateAccountPeriodBi = payload => ({type: GET_DATA_CREATE_ACCOUNT_PERIOD, payload});

export const getInitialAccountPeriodBi = payload => ({type: LOAD_INIT_DATA_ACCOUNT_PERIOD_REGISTRATION_BI, payload});

export const createAccountPeriodBi = payload => ({type: CREATE_ACCOUNT_PERIOD_BI, payload});

export const updateAccountPeriodBi = payload => ({type: UPDATE_ACCOUNT_PERIOD_BI, payload});

export const deleteAccountPeriodBi = payload => ({type: DELETE_ACCOUNT_PERIOD_BI, payload});

export const changeErrorRequestAccountPeriodBi = payload => ({type: CHANGE_ERROR_REQUEST_ACCOUNT_PERIOD_BI, payload});

export const cleanRequestAccountPeriodBi = payload => ({type: CLEAN_REQUEST_ACCOUNT_PERIOD_BI, payload});

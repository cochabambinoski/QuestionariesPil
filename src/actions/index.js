import {
    ADD_ALL_ASSIGNEMENT_USER,
    ADD_ASSIGNEMENT_USER,
    ADD_MOBILE_SELLERS,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    ADD_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_TYPE,
    CHANGE_ERROR_EXCHANGE_RATE_BI,
    CHANGE_ERROR_OPERATING_ACCOUNTS_BI,
    CHANGE_ERROR_REQUEST,
    CHANGE_ERROR_REQUEST_ACCOUNT_PERIOD_BI,
    CHANGE_ERROR_REQUEST_BI,
    CHANGE_ERROR_REQUEST_CCMAC,
    CHANGE_ID_EXISTING_QUESTIONARY,
    CHANGE_OPERATION_ID_BRANCH_SELLER,
    CHANGE_OPERATION_ID_BRANCH_SELLER_ASSIGNED,
    CHANGE_STATE, CLEAN_CURRENT_ANSWERS,
    CLEAN_FILTER,
    CLEAN_REQUEST_ACCOUNT_PERIOD_BI,
    CLEAN_REQUEST_BI,
    CLEAN_REQUEST_CCMAC,
    CLEAN_REQUEST_EXCHANGE_RATE_BI,
    CLEAN_REQUEST_EXECUTE,
    CLEAN_REQUEST_OPERATING_ACCOUNTS_BI,
    CREATE_ACCOUNT_PERIOD_BI,
    CREATE_CONCEPT_BI,
    CREATE_CONDITION_CENTER_MASTER,
    CREATE_EXCHANGE_RATE_BI,
    CREATE_OPERATING_ACCOUNTS_BI,
    CREATE_TYPES_BI,
    DATA,
    DELETE_ACCOUNT_PERIOD_BI,
    DELETE_ALL_ASSIGNEMENT_USER,
    DELETE_ASSIGNEMENT_USER,
    DELETE_CONCEPT_BI,
    DELETE_CONDITION_CENTER_MASTER,
    DELETE_EXCHANGE_RATE_BI,
    DELETE_MOBILE_ASSIGNED_LIST_AUX,
    DELETE_MOBILE_LIST_AUX,
    DELETE_MOBILE_SELLERS,
    DELETE_OPERATING_ACCOUNTS_BI,
    DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    DELETE_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    DELETE_PARAM_FILTER_MOBILE_SELLER_TYPE,
    DELETE_TYPES_BI,
    EDIT_ASSIGNEMENT_USER,
    EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST,
    EDIT_QUERY_TEXT_MOBILE_SELLER_LIST,
    EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST,
    FILL_OUT_QUESTIONARY_RANGE_ALL,
    FILTER_CENTER_COST_CONDITION,
    GET_ALL_BRANCHES,
    GET_ALL_CONCEPTS,
    GET_ALL_DEPARTAMENTS,
    GET_ALL_PARAMETERS,
    GET_ALL_TYPES,
    GET_ANSWERS,
    GET_DATA_CREATE_ACCOUNT_PERIOD,
    GET_DATA_PARAMETERS,
    GET_INITIAL_DATA_EXCHANGE_RATE_BI,
    GET_INITIAL_DATA_OPERATING_ACCOUNTS_BI,
    GET_QUESTIONNARIE_ANSWER,
    IS_SAVING_ANSWER,
    JOB_EXECUTE,
    LOAD_BASE_DATA_CREATE_CENTER_MASTER_AND_COST,
    LOAD_COST_BASE_INFORMATION,
    LOAD_INIT_DATA_ACCOUNT_PERIOD_REGISTRATION_BI,
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
    UPDATE_ACCOUNT_PERIOD_BI,
    UPDATE_CONCEPT_BI,
    UPDATE_CONDITION_CENTER_MASTER,
    UPDATE_EXCHANGE_RATE_BI,
    UPDATE_MARKED_OPTIONS,
    UPDATE_OPERATING_ACCOUNTS_BI,
    UPDATE_TYPES_BI
} from "./actionTypes";

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

export const cleanRequestResponse = () => ({type: CLEAN_REQUEST_EXECUTE});

export const changeStateParameter = (payload) => ({type: CHANGE_STATE, payload});

export const changeErrorRequest = payload => ({type: CHANGE_ERROR_REQUEST, payload});

export const changeErrorBiCCMAC = payload => ({type: CHANGE_ERROR_REQUEST_CCMAC, payload});

export const changeErrorBi = payload => ({type: CHANGE_ERROR_REQUEST_BI, payload});

export const cleanRequestCCMAC = () => ({type: CLEAN_REQUEST_CCMAC});

export const cleanRequestBi = () => ({type: CLEAN_REQUEST_BI});

export const deleteCenterCostConditionBi = payload =>({type: DELETE_CONDITION_CENTER_MASTER, payload});

export const updateCenterConstConditionBi = payload => ({type: UPDATE_CONDITION_CENTER_MASTER, payload});

export const createCenterCostConditionBi = payload => ({type: CREATE_CONDITION_CENTER_MASTER, payload});

export const getInitialDataCenterCostConditonBi = payload => ({type: LOAD_BASE_DATA_CREATE_CENTER_MASTER_AND_COST, payload});

export const filterCenterCostConditionBi = payload => ({type: FILTER_CENTER_COST_CONDITION, payload});

export const getDataCreateAccountPeriodBi = payload => ({type: GET_DATA_CREATE_ACCOUNT_PERIOD, payload});

export const getInitialAccountPeriodBi = payload => ({type: LOAD_INIT_DATA_ACCOUNT_PERIOD_REGISTRATION_BI, payload});

export const createAccountPeriodBi = payload => ({type: CREATE_ACCOUNT_PERIOD_BI, payload});

export const updateAccountPeriodBi = payload => ({type: UPDATE_ACCOUNT_PERIOD_BI, payload});

export const deleteAccountPeriodBi = payload => ({type: DELETE_ACCOUNT_PERIOD_BI, payload});

export const changeErrorRequestAccountPeriodBi = payload => ({type: CHANGE_ERROR_REQUEST_ACCOUNT_PERIOD_BI, payload});

export const cleanRequestAccountPeriodBi = payload => ({type: CLEAN_REQUEST_ACCOUNT_PERIOD_BI, payload});

/* Exchange Rate */
export const getInitialDataExchangeRateBi = payload => ({type: GET_INITIAL_DATA_EXCHANGE_RATE_BI, payload});
export const createExchangeRateBi = payload => ({type: CREATE_EXCHANGE_RATE_BI, payload});
export const updateExchangeRateBi = payload => ({type: UPDATE_EXCHANGE_RATE_BI, payload});
export const deleteExchangeRateBi = payload => ({type: DELETE_EXCHANGE_RATE_BI, payload});
export const changeErrorRequestExchangeRateBi = payload => ({type: CHANGE_ERROR_EXCHANGE_RATE_BI, payload});
export const cleanRequestExchangeRateBi = payload => ({type: CLEAN_REQUEST_EXCHANGE_RATE_BI, payload});
/* export const getInitialOperatingAccounts */
export const getInitialDataOperatingAccountsBi = payload => ({type: GET_INITIAL_DATA_OPERATING_ACCOUNTS_BI, payload});
export const createOperatingAccountsBi = payload => ({type: CREATE_OPERATING_ACCOUNTS_BI, payload});
export const updateOperatingAccountsBi = payload => ({type: UPDATE_OPERATING_ACCOUNTS_BI, payload});
export const deleteOperatingAccountsBi = payload => ({type: DELETE_OPERATING_ACCOUNTS_BI, payload});
export const changeErrorOperatingAccountsBi = payload => ({type: CHANGE_ERROR_OPERATING_ACCOUNTS_BI, payload});
export const cleanRequestOperatingAccountsBi = payload => ({type: CLEAN_REQUEST_OPERATING_ACCOUNTS_BI, payload});
/*Concepts*/
export const createConceptBi = payload => ({type: CREATE_CONCEPT_BI, payload});
export const getAllConcepts = payload => ({type: GET_ALL_CONCEPTS, payload});
export const deleteConceptBi = payload => ({type: DELETE_CONCEPT_BI, payload});
export const updateConceptBi = payload => ({type: UPDATE_CONCEPT_BI, payload});
/*Type*/
export const getAllTypesBi = payload => ({type: GET_ALL_TYPES, payload});
export const createTypeBi = payload => ({type: CREATE_TYPES_BI, payload});
export const updateTypeBi = payload => ({type: UPDATE_TYPES_BI, payload});
export const deleteTypeBi = payload => ({type: DELETE_TYPES_BI, payload});

export const getAllParametersBi = payload => ({type: GET_ALL_PARAMETERS, payload});
export const jobExecuteBi = payload => ({type: JOB_EXECUTE, payload});
export const getInitialDataParametersBi = payload => ({type: GET_DATA_PARAMETERS, payload});
export const cleanCurrentAnswer = () => ({type: CLEAN_CURRENT_ANSWERS});

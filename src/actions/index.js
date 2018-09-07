import {
    DATA,
    SET_ID_USER,
    SET_USER,
    SET_MENU,
    SET_MENU_CONTAINER,
    ADD_ASSIGNEMENT_USER,
    DELETE_ASSIGNEMENT_USER,
    EDIT_ASSIGNEMENT_USER,
    SEARCH_ASYNC_ENTITIES,
    DELETE_ALL_ASSIGNEMENT_USER,
    GET_INITIAL_DATA,
    SAVE_MOBILE_LIST_AUX,
    DELETE_MOBILE_LIST_AUX,
    EDIT_QUERY_TEXT_MOBILE_SELLER_LIST,
    EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST,
    EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST,
    ADD_MOBILE_SELLERS,
    ADD_MOBILE_SELLER,
    CREATE_QUESTIONARY,
    DELETE_QUESTIONARY,
    FILL_OUT_QUESTIONNAIRE,
    CREATE_QUESTION,
    DELETE_QUESTION,
    FILL_OUT_QUESTIONS_ALL,
    CREATE_QUESTION_OPTION,
    DELETE_QUESTION_OPTION,
    FILL_OUT_QUESTION_OPTION_ALL,
    CREATE_QUESTIONARY_RANGE,
    DELETE_QUESTIONARY_RANGE,
    FILL_OUT_QUESTIONARY_RANGE_ALL,
    CHANGE_ID_EXISTING_QUESTIONARY,
    DELETE_MOBILE_SELLERS,
    SET_INITIAL_DATA_QUESTIONER_QUESTIONARY,
    SET_INITIAL_DATA_TYPES_SELLER,
    GET_ALL_DEPARTAMENTS,
    GET_ALL_BRANCHES,
    ADD_PARAM_FILTER_MOBILE_SELLER_TYPE,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    DELETE_PARAM_FILTER_MOBILE_SELLER_TYPE,
    DELETE_PARAM_FILTER_MOBILE_SELLER_BRANCH,
    DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE,
    DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH,
    CONCAT_FILTER_MOBILE_SELLER_BRANCH, CONCAT_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH
} from "../action-types/actionTypes";

export function data() {
    return{
        type: DATA,
    }
}

export const setIdUser = payload => ( {type: SET_ID_USER, payload});

export const setUser = payload => ({type: SET_USER, payload});

export const setMenu = payload => ({type: SET_MENU, payload});

export  const setMenuContainer = payload => ({type: SET_MENU_CONTAINER, payload});

export const addAssignementUser = payload => ({type: ADD_ASSIGNEMENT_USER, payload});

export const deleteAssignementUser = payload => ({type: DELETE_ASSIGNEMENT_USER, payload});

export const deleteAllAssignementUser = payload => ({type: DELETE_ALL_ASSIGNEMENT_USER, payload});

export const deleteMobileSellers = payload => ({type: DELETE_MOBILE_SELLERS, payload});

export const editAssignementUser = payload => ({type: EDIT_ASSIGNEMENT_USER, payload});

export const searchEntitiesAsync = payload => ({type: SEARCH_ASYNC_ENTITIES, payload});

export const setInitialData = payload => ({type: GET_INITIAL_DATA, payload});

export const saveMobileSellerListAux = payload => ({type : SAVE_MOBILE_LIST_AUX, payload});

export const deleteSaveMobileSellerListAux = payload => ({type : DELETE_MOBILE_LIST_AUX, payload});

export const editQueryTextMobileSellerList = payload => ({type : EDIT_QUERY_TEXT_MOBILE_SELLER_LIST, payload});

export const editQueryTextMobileSellerAssignedList = payload => ({type : EDIT_QUERY_TEXT_MOBILE_SELLER_ASSIGNED_LIST, payload});

export const editQueryTextAssignedQuestionary = payload => ({type : EDIT_QUERY_TEXT_QUESTIONARY_ASSIGNED_LIST, payload});

export const addMobileSellers= payload => ({type : ADD_MOBILE_SELLERS, payload});

export const addMobileSeller = payload => ({type : ADD_MOBILE_SELLER, payload});

export const createQuestionary = payload => ({type : CREATE_QUESTIONARY, payload});

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

export const setInitialDataQuestionerQuestionary = payload => ({type: SET_INITIAL_DATA_QUESTIONER_QUESTIONARY, payload});

export const setInitialDataTypesSeller = payload => ({type: SET_INITIAL_DATA_TYPES_SELLER, payload});

export const getAllDepartaments = payload => ({type: GET_ALL_DEPARTAMENTS, payload});

export const getAllBranches = payload => ({type: GET_ALL_BRANCHES, payload});

export const addParamFilterMobileSellerType = payload => ({type: ADD_PARAM_FILTER_MOBILE_SELLER_TYPE, payload});

export const addParamFilterMobileSellerBranch = payload => ({type: ADD_PARAM_FILTER_MOBILE_SELLER_BRANCH, payload});

export const concatFilterMobileSellerBranch = payload => ({type: CONCAT_FILTER_MOBILE_SELLER_BRANCH, payload});

export const addParamFilterMobileSellerAssignedType = payload => ({type: ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE, payload});

export const addParamFilterMobileSellerAssignedBranch = payload => ({type: ADD_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH, payload});

export const concatFilterMobileSellerAssignedBranch = payload => ({type: CONCAT_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH, payload});

export const deleteParamFilterMobileSellerType = payload => ({type: DELETE_PARAM_FILTER_MOBILE_SELLER_TYPE, payload});

export const deleteParamFilterMobileSellerBranch = payload => ({type: DELETE_PARAM_FILTER_MOBILE_SELLER_BRANCH, payload});

export const deleteParamFilterMObileSelledeleterAssignedType = payload => ({type: DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_TYPE, payload});

export const deleteParamFilterMobileSellerAssignedBranch = payload => ({type: DELETE_PARAM_FILTER_MOBILE_SELLER_ASSIGNED_BRANCH, payload});
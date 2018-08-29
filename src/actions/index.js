import { DATA,
    SET_ID_USER,
    SET_MENU_CONTAINER,
    ADD_ASSIGNEMENT_USER,
    DELETE_ASSIGNEMENT_USER,
    EDIT_ASSIGNEMENT_USER,
    SEARCH_ASYNC_ENTITIES,
    DELETE_ALL_ASSIGNEMENT_USER,
    GET_INITIAL_DATA} from "../action-types/actionTypes";

export function data() {
    return{
        type: DATA,
    }
}

export const setIdUser = payload => ( {type: SET_ID_USER, payload});

export  const setMenuContainer = payload => ({type: SET_MENU_CONTAINER, payload});

export const addAssignementUser = payload => ({type: ADD_ASSIGNEMENT_USER, payload});

export const deleteAssignementUser = payload => ({type: DELETE_ASSIGNEMENT_USER, payload});

export const deleteAllAssignementUser = payload => ({type: DELETE_ALL_ASSIGNEMENT_USER, payload});

export const editAssignementUser = payload => ({type: EDIT_ASSIGNEMENT_USER, payload});

export const searchEntitiesAsync = payload => ({type: SEARCH_ASYNC_ENTITIES, payload});

export const getInitialData = payload => ({type: GET_INITIAL_DATA, payload});
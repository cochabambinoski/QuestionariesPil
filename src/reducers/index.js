import data from './data';
import {idUser} from './idUser';
import {idMenu} from './menu';
import {initialData, getTypeByCodSap as _getTypeCodeSap} from "./initialData";
import {assignmentUser} from './assignmentUser'
import {combineReducers} from 'redux';

export default combineReducers({
    data,
    idUser, idMenu, assignmentUser, initialData
});
export const getMenu = state => state.idMenu;
export const getIdUser = state => state.idUser;
export const getMobileAssignement = state => state.assignmentUser;
export const getTypeQuestionerQuestionary = state => state.typeQuestionerQuestionary;
export const getTypeByCodSap = (state, codSap) => (_getTypeCodeSap(state.initialData, codSap));
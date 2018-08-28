import data from './data';
import {idUser} from './idUser';
import {idMenu} from './menu';
import {assignmentUser} from './assignmentUser'
import {combineReducers} from 'redux';

export default combineReducers({
    data,
    idUser, idMenu, assignmentUser
});
export const getMenu = state => state.idMenu;
export const getIdUser = state => state.idUser;
export const getMobileAssignement = state => state.assignmentUser;
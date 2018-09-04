import data from './data';
import {user} from './user';
import {idMenu} from './menu';
import {searchFilter} from './searchFilter';
import {initialData, getTypeByCodSap as _getTypeCodeSap, getBrancgesByIdCity as _getBrancgesByIdCity} from "./initialData";
import {assignmentUser} from './assignmentUser'
import {combineReducers} from 'redux';
import {createQuestionary} from './createQuestionary';

export default combineReducers({
    data,
     user, idMenu, assignmentUser, initialData, searchFilter, createQuestionary
});
export const getMenu = state => state.idMenu;
export const getIdUser = state => state.idUser;
export const getMobileAssignement = state => state.assignmentUser;
export const getTypeQuestionerQuestionary = state => state.typeQuestionerQuestionary;
export const getTypeByCodSap = (state, codSap) => (_getTypeCodeSap(state.initialData, codSap));
export const getQueryMobileSeller = state => state.searchFilter.queryMobileSeller;
export const getQueryMobileSellerAssigment = state => state.searchFilter.queryMobileSellerAssigned;
export const getQueryQuestionerAssigment = state => state.searchFilter.queryQuestionaryAssigned;
export const getMobileSellers = state => state.assignmentUser.mobileSellers;
export const getQuestionarySelected = state => state.createQuestionary.idQuestionary;
export const getCreateQuestionary = state => state.createQuestionary;
export const getUser = state => state.user.user;
export const getTypesSeller = state => state.initialData.typeSeller;
export const getAllCity = state => state.initialData.cities;
export const getBranchesById = (state, idCity) => (_getBrancgesByIdCity(state.initialData.lsBranches, idCity));
import data from './data';
import {user} from './user';
import {idMenu} from './menu';
import {searchFilter} from './searchFilter';
import {initialData, getTypeByCodSap as _getTypeCodeSap, getBrancgesByIdCity as _getBrancgesByIdCity} from "./initialData";
import {assignmentUser} from './assignmentUser'
import {combineReducers} from 'redux';
import {createQuestionary} from './createQuestionary';
import {questionnaires} from "./questionnaires";

export default combineReducers({
    data,
     user, idMenu, assignmentUser, initialData, searchFilter, createQuestionary, questionnaires
});
export const getMenu = state => state.idMenu;
export const getIdUser = state => state.idUser;
export const getMobileAssignement = state => state.assignmentUser;
export const getTypeQuestionerQuestionary = state => state.typeQuestionerQuestionary;
export const getTypeByCodSapQuestionerQuestionary = (state, codSap) => (_getTypeCodeSap(state.initialData.typeQuestionerQuestionary, codSap));
export const getTypeByCodSap = (state, codSap) => (_getTypeCodeSap(state.initialData, codSap));
export const getQueryMobileSeller = state => state.searchFilter.queryMobileSeller;
export const getQueryMobileSellerAssigment = state => state.searchFilter.queryMobileSellerAssigned;
export const getQueryQuestionerAssigment = state => state.searchFilter.queryQuestionaryAssigned;
export const getMobileSellers = state => state.assignmentUser.mobileSellers;
export const getMobileSellersAux = state => state.assignmentUser.mobileSellersAux;
export const getMobileSellersAssigmentAux = state => state.assignmentUser.mobileSellerAssignedAux;
export const getQuestionarySelected = state => state.createQuestionary.idQuestionary;
export const getCreateQuestionary = state => state.createQuestionary;
export const getUser = state => state.user.user;
export const getTypesSeller = state => state.initialData.typeSeller;
export const getAllCity = state => state.initialData.cities;
export const getAllBranch = state => state.initialData.lsBranches;
export const getBranchByIdCity = (lsBranch, idCity) => (_getBrancgesByIdCity(lsBranch, idCity));


export const getQueryMobileSellerType = (state) => state.searchFilter.queryAdvancedMobileSellerType;
export const getQueryMobileSellerBranch = (state) => state.searchFilter.queryAdvancedMobileSellerBranch;
export const getQueryMobileSellerAssignedType = (state) => state.searchFilter.queryAdvancedMobileSellerAssignedType;
export const getQueryMobileSellerAssignedBranch = (state) => state.searchFilter.queryAdvancedMobileSellerAssignedBranch;

export const getQuestionnaries = (state) => state.questionnaires.questionnaires;
export const getQuestionTypes = (state) => state.initialData.questionTypes;
export const getCities = (state) => state.initialData.cities;
export const getBranches = (state) => state.initialData.lsBranches;
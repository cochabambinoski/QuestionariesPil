import data from './data';
import {user} from './user';
import {idMenu} from './menu';
import {searchFilter} from './searchFilter';
import {
    getBrancgesByIdCity as _getBrancgesByIdCity,
    getTypeByCodSap as _getTypeCodeSap,
    initialData
} from "./initialData";
import {assignmentUser} from './assignmentUser'
import {combineReducers} from 'redux';
import {createQuestionary} from './createQuestionary';
import {questionnaires} from "./questionnaires";
import {connection} from "./connection";
import {answer} from "./answer";
import answers from "./answers";
import {processConfirmation} from "./processConfirmation";
import {createCenterMasterAndCost} from "./createCenterMasterAndCost";
import {periodAndAccountRegistration} from "./periodAndAccountRegistration";
import {exchangeRate} from "./exchangeRate";
import {operatingAccounts} from "./operatingAccounts";
import {concepts} from "./concepts";
import {centerCostCondition} from "./centerCostCondition";
import {parameter} from "./parameter";

export default combineReducers({
    data,
    user,
    idMenu,
    assignmentUser,
    initialData,
    searchFilter,
    createQuestionary,
    questionnaires,
    connection,
    answers,
    answer,
    processConfirmation,
    periodAndAccountRegistration,
    exchangeRate,
    operatingAccounts,
    createCenterMasterAndCost,
    concepts,
    createCenterMasterAndCost,
    centerCostCondition,
    parameter
});
export const getMenu = state => state.idMenu;
export const getIdUser = state => state.idUser;
export const getMobileAssignement = state => state.assignmentUser;
export const getTypeByCodSapQuestionerQuestionary = (state, codSap) => (_getTypeCodeSap(state.initialData.typeQuestionerQuestionary, codSap));
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
export const getSystemTypes = state => state.initialData.systemTypes;
export const getReachTypes = state => state.initialData.reachTypes;
export const getQuestionnaireStatusTypes = state => state.initialData.questionnaireStatus;


export const getQueryMobileSellerType = (state) => state.searchFilter.queryAdvancedMobileSellerType;
export const getQueryMobileSellerBranch = (state) => state.searchFilter.queryAdvancedMobileSellerBranch;
export const getQueryMobileSellerAssignedType = (state) => state.searchFilter.queryAdvancedMobileSellerAssignedType;
export const getQueryMobileSellerAssignedBranch = (state) => state.searchFilter.queryAdvancedMobileSellerAssignedBranch;

export const getQuestionnaries = (state) => state.questionnaires.questionnaires;
export const getQuestionTypes = (state) => state.initialData.questionTypes;
export const getCities = (state) => state.initialData.cities;
export const getBranches = (state) => state.initialData.lsBranches;

export const getMarkedOptions = (state) => state.answer.markedOptions;
export const getTriedToSave = (state) => state.answer.triedToSave;
export const getClient = (state) => state.answer.client;
export const getinterviewedName = (state) => state.answer.interviewedName;
export const getIsSavingAnswer = (state) => state.answer.isSavingAnswer;

export const getAnswers = state => state.answers.answers;
export const getQuestionnarieAnswers = (state) => state.answers.questionnarie;
export const getProcessConfirmation = (state) => state.processConfirmation;
export const getCreateCenterMasterAndCost = (state) => state.createCenterMasterAndCost;
export const getPeriodAndAccountRegistration = (state) => state.periodAndAccountRegistration;
export const getExchangeRate = (state) => state.exchangeRate;
export const getOperatingAccounts = (state) => state.operatingAccounts;
export const centerCostConditions = (state) => state.centerCostCondition;
export const parameters = (state) => state.parameter;
export const getConcepts = (state) => state.concepts;
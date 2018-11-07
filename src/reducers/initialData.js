import {
    GET_ALL_BRANCHES,
    GET_ALL_DEPARTAMENTS,
    GET_INITIAL_DATA,
    SET_INITIAL_DATA_QUESTIONER_QUESTIONARY,
    SET_INITIAL_DATA_TYPES_SELLER, SET_QUESTIONNAIRE_STATUS,
    SET_REACH_TYPES,
    SET_SYSTEM_TYPES
} from "../action-types/actionTypes";
import {GET_QUESTION_TYPES} from "../actions/indexthunk";

const initialState = (
    {
        typeQuestionerQuestionary: null,
        typeSeller: null,
        cities: null,
        lsBranches: null,
        questionTypes: null,
        questionnaireStatus: null,
    }
);

export const initialData = (state = initialState, action) => {
    switch (action.type) {
        case GET_INITIAL_DATA: {
            return {...state, typeQuestionerQuestionary: action.payload};
        }
        case SET_INITIAL_DATA_QUESTIONER_QUESTIONARY: {
            return {...state, typeQuestionerQuestionary: action.payload};
        }
        case SET_INITIAL_DATA_TYPES_SELLER: {
            return {...state, typeSeller: action.payload};
        }
        case GET_ALL_DEPARTAMENTS: {
            return {...state, cities: action.payload};
        }
        case GET_ALL_BRANCHES: {
            return {...state, lsBranches: action.payload};
        }
        case GET_QUESTION_TYPES: {
            return {...state, questionTypes: action.payload};
        }
        case SET_SYSTEM_TYPES: {
            return {...state, systemTypes: action.payload};
        }
        case SET_REACH_TYPES: {
            return {...state, reachTypes: action.payload};
        }
        case SET_QUESTIONNAIRE_STATUS: {
            return {...state, questionnaireStatus: action.payload};
        }
        default:
            return state;
    }
};
const filter = Array.prototype.filter;
export const getTypeByCodSap = (types, codSap) => filter.call(types, function (item) {
    return item.codigoSap === codSap;
});
export const getBrancgesByIdCity = (branches, idCity) => filter.call(branches, function (item) {
    return item.departamento.id === idCity
});
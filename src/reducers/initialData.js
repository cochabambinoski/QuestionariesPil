import {GET_INITIAL_DATA,
    SET_INITIAL_DATA_QUESTIONER_QUESTIONARY,
    SET_INITIAL_DATA_TYPES_SELLER,
    GET_ALL_DEPARTAMENTS,
    GET_ALL_BRANCHES} from "../action-types/actionTypes";

const initialState = (
    {
        typeQuestionerQuestionary: null,
        typeSeller: null,
        cities: null,
        lsBranches:null,
    }
);

export const initialData = (state = initialState, action) => {
    switch (action.type) {
        case GET_INITIAL_DATA:{
            return {...state, typeQuestionerQuestionary: action.payload};
        }
        case SET_INITIAL_DATA_QUESTIONER_QUESTIONARY:{
            return {...state, typeQuestionerQuestionary: action.payload};
        }
        case SET_INITIAL_DATA_TYPES_SELLER:{
            return {...state, typeSeller: action.payload};
        }
        case GET_ALL_DEPARTAMENTS:{
            return {...state, cities: action.payload};
        }
        case GET_ALL_BRANCHES:{
            return {...state, lsBranches: action.payload};
        }
        default:
            return state;
    }
};
const filter   = Array.prototype.filter;
export const getTypeByCodSap = (types, codSap) => filter.call(types, function(item) {
    return item.codigoSap === codSap;
});
export const getBrancgesByIdCity =(branches, idCity) => filter.call(branches, function (item) {
    return item.departamento.id === idCity
});
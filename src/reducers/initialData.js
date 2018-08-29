import {GET_INITIAL_DATA} from "../action-types/actionTypes";

const initialState = (
    {
        typeQuestionerQuestionary: null,
    }
);

export const initialData = (state = initialState, action) => {
    switch (action.type) {
        case GET_INITIAL_DATA:{
            return action.payload
        }
        default:
            return state;
    }
};
const filter   = Array.prototype.filter;
export const getTypeByCodSap = (types, codSap) => filter.call(types, function(item) {
    return item.codigoSap === codSap;
});
import {SET_QUESTIONNAIRES_DATA, UPLOAD_QUESTIONNNAIRES} from './../actions/indexthunk';

export const questionnaires = (state = {questionnaires: [], uploadQuestionaries: false}, action) => {
    switch (action.type) {
        case SET_QUESTIONNAIRES_DATA:
            return {...state, questionnaires: action.payload};
        case UPLOAD_QUESTIONNNAIRES:
            return {...state, uploadQuestionaries: action.payload};
        default:
            return state;
    }
};
import {
    GET_ANSWERS,
    SET_ANSWERS,
    GET_QUESTIONNARIE_ANSWER,
    SET_QUESTIONNARIE_ANSWER, CLEAN_CURRENT_ANSWERS
} from "../actions/actionTypes";


const initialState = ({
    answers: [],
    questionnarie: null,

});

 function answers(state = initialState, action) {

    switch (action.type) {
        case GET_ANSWERS: {
            return {...state, answers: action.payload}
        }

        case SET_ANSWERS: {
            return {...state, answers: action.payload}
        }

        case GET_QUESTIONNARIE_ANSWER: {
            return {...state, questionnarie: action.payload}
        }

        case SET_QUESTIONNARIE_ANSWER: {
            return {...state, questionnarie: action.payload}
        }

        case CLEAN_CURRENT_ANSWERS: {
            return {...state, answers: [], questionnarie: null}
        }

        default:
            return state;
    }
}

export default answers;

import {
    GET_ANSWERS,
    SET_ANSWERS,
    GET_QUESTIONNARIE_ANSWER,
    SET_QUESTIONNARIE_ANSWER
} from "../action-types/actionTypes";


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
        default:
            return state;
    }
}

export default answers;
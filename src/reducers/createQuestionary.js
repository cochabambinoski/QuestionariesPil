import {
    CREATE_QUESTIONARY,
    DELETE_QUESTIONARY,
    FILL_OUT_QUESTIONNAIRE,
    CREATE_QUESTION,
    DELETE_QUESTION,
    FILL_OUT_QUESTIONS_ALL,
    CREATE_QUESTION_OPTION,
    DELETE_QUESTION_OPTION,
    FILL_OUT_QUESTION_OPTION_ALL,
    CREATE_QUESTIONARY_RANGE,
    DELETE_QUESTIONARY_RANGE,
    FILL_OUT_QUESTIONARY_RANGE_ALL,
    CHANGE_ID_EXISTING_QUESTIONARY
} from "../action-types/actionTypes";

const initialState = ({
    idQuestionary: null,
    questionary : null,
    questions: [],
    questionOptions: [],
    questionaryRange: [],
});

export function createQuestionary(state = initialState, action) {
    const questions = state.questions;
    const questionOptions = state.questionOptions;
    const questionaryRange = state.questionaryRange;
    switch (action.type) {
        case CREATE_QUESTIONARY: {
            return {...state, questionary : action.payload};
        }
        case DELETE_QUESTIONARY: {
            return {...state, questionary: null}
        }
        case FILL_OUT_QUESTIONNAIRE: {
            return {...state, questionary: action.payload};
        }
        case CREATE_QUESTION:{
            questions.push(action.payload);
            return {...state, questions: questions}
        }
        case DELETE_QUESTION:{
            remove(questions, action.payload);
            return {...state, questions: questions}
        }
        case FILL_OUT_QUESTIONS_ALL:{
            return {...state, questions: action.payload}
        }
        case CREATE_QUESTION_OPTION:{
            questionOptions.push(action.payload);
            return {...state, questionOptions: questionOptions}
        }
        case DELETE_QUESTION_OPTION:{
            remove(questionOptions, action.payload);
            return{...state, questionOptions: questionOptions}
        }
        case FILL_OUT_QUESTION_OPTION_ALL:{
            return {...state, questionOptions: action.payload}
        }
        case CREATE_QUESTIONARY_RANGE:{
            return {...state, questionaryRange: action.payload}
        }
        case DELETE_QUESTIONARY_RANGE:{
            remove(questionaryRange, action.payload);
            return {...state, questionaryRange: questionaryRange}
        }
        case FILL_OUT_QUESTIONARY_RANGE_ALL:{
            return {...state, questionaryRange: questionaryRange}
        }
        case CHANGE_ID_EXISTING_QUESTIONARY:{
            return {...state, idQuestionary: action.payload}
        }
        default:
            return state;
    }

}

function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}
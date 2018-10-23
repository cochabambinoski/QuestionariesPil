import Constants from "../Constants";

export const UPLOAD_QUESTIONNNAIRES = 'UPLOAD_QUESTIONNNAIRES';
export const SET_QUESTIONNAIRES_DATA = 'SET_QUESTIONNAIRES_DATA';
export const SET_CONNECTION = 'SET_CONNECTION';

const uploadQuestionnaires = payload => ({type: UPLOAD_QUESTIONNNAIRES, payload});
const setQuestionnairesData = payload => ({type: SET_QUESTIONNAIRES_DATA, payload});
const setConnection = payload => ({type: SET_CONNECTION, payload});

export const getQuestionnairesByReach = reach => {
    return dispatch => {
        dispatch(uploadQuestionnaires(true));
        return fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_QUESTIONNAIRES_BY_REACH}${encodeURIComponent(reach)}`)
            .then(results => {
                return results.json();
            }).then(
                data => {
                    dispatch(setQuestionnairesData(data));
                    dispatch(uploadQuestionnaires(false));
                    dispatch(setConnection(true));
                    console.log("data: " + data);
                },
                error => {
                    dispatch(setConnection(false));
                    console.log("error: " + error);
                    return error;
                })
    }
};
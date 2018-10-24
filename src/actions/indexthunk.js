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
                },
                error => {
                    dispatch(setConnection(false));
                    return error;
                })
    }
};

export const getQuetionnaireById = id => {
    return () => {
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_QUESTIONNAIRE_BY_ID}?idQuestionary=${encodeURIComponent(id)}`;
        return fetch(url)
            .then(results => {
                return results.json();
            }).then(response => {
                return response;
            });
    };
};


export const getClientsByNitOrNameInSystem = (searchTerm, systemName) => {
    return () => {
        const system = systemName === 'POS' ? Constants.ROUTE_WEB_SERVICES_POS : Constants.ROUTE_WEB_SERVICES;
        return fetch(`${system}${Constants.GET_CLIENTS_BY_NIT_OR_NAME}${encodeURIComponent(searchTerm)}`)
            .then(results => {
                return results.json();
            }).then(response => {
                return response;
            });
    };
};

export const getClientUserByClient = clientId => {
    return () => {
        return fetch(`${Constants.ROUTE_WEB_SERVICES_POS}${Constants.GET_CLIENT_USER_BY_CLIENT}${encodeURIComponent(clientId)}`)
            .then(results => {
                return results.json();
            }).then(response => {
                return response;
            },
                error =>{
                return error;
                });
    };
};

export const saveClientUser = clientUser => {
    return () => {
        return fetch(`${Constants.ROUTE_WEB_SERVICES_POS}${Constants.SAVE_CLIENT_USER}`,
            {
                method: 'POST',
                body: JSON.stringify(clientUser),
                headers: {
                    'Accept': '*/*',
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            .then(results => {
                return results.json();
            }).then(response => {
                console.log("response from client user save: " + response);
                    return response;
                },
                error =>{
                    return error;
                });
    };
};
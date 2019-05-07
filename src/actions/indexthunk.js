import Constants from "../Constants";
import {getIndexQuestionary} from "../Util/ArrayFilterUtil";
import * as utilDate from "../utils/dateUtils";
import {
    addMobileSellers,
    changeErrorBi,
    changeErrorRequest,
    changeErrorRequestAccountPeriodBi,
    changeErrorRequestExchangeRateBi,
    createAccountPeriodBi,
    createCenterCostConditionBi,
    createConceptBi,
    createExchangeRateBi,
    deleteAccountPeriodBi,
    deleteCenterCostConditionBi,
    deleteConceptBi,
    deleteExchangeRateBi,
    getAllBranches,
    getAllConcepts,
    getAllDepartaments,
    getAnswers,
    getAnswersQuestionnarie,
    getDataCreateAccountPeriodBi,
    getInitialAccountPeriodBi,
    getInitialDataCenterCostConditonBi,
    getInitialDataExchangeRateBi,
    loadCostBaseInformation,
    loadInputBaseInformation,
    setInitialDataQuestionerQuestionary,
    setInitialDataTypesSeller,
    setMenu,
    setQuestionnaireStatus,
    setReachTypes,
    setSystemTypes,
    setUser,
    updateAccountPeriodBi,
    updateCenterConstConditionBi,
    updateConceptBi,
    updateExchangeRateBi
} from "./index";
import * as StringFilterUtil from "../Util/StringFormatUtil";

export const UPLOAD_QUESTIONNNAIRES = 'UPLOAD_QUESTIONNNAIRES';
export const SET_QUESTIONNAIRES_DATA = 'SET_QUESTIONNAIRES_DATA';
export const SET_QUESTIONNAIRE_ASSIGNEMENTS = 'SET_QUESTIONNAIRE_ASSIGNEMENTS';
export const GET_QUESTION_TYPES = 'GET_QUESTION_TYPES';
export const SET_CONNECTION = 'SET_CONNECTION';

const setQuestionnaireAssignments = payload => ({type: SET_QUESTIONNAIRE_ASSIGNEMENTS, payload});
const uploadQuestionnaires = payload => ({type: UPLOAD_QUESTIONNNAIRES, payload});
const setQuestionnairesData = payload => ({type: SET_QUESTIONNAIRES_DATA, payload});
export const setQuestionTypes = payload => ({type: GET_QUESTION_TYPES, payload});
const setConnection = payload => ({type: SET_CONNECTION, payload});

export const fetchGetQuestionaries = () => {
    return dispatch => {
        dispatch(uploadQuestionnaires(true));
        return fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_QUESTIONNAIRES)
            .then(results => {
                return results.json();
            }).then(data => {
                dispatch(setQuestionnairesData(data));
                dispatch(uploadQuestionnaires(false));
            })
    }
};

export const fetchGetQuestionariesByUser = user => {
    return dispatch => {
        dispatch(uploadQuestionnaires(true));
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_ALL_QUESTIONNAIRES_BY_USER}?user=${encodeURIComponent(user)}`;
        return fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
                dispatch(setQuestionnairesData(data));
                dispatch(uploadQuestionnaires(false));
            })
    }
};

export const deleteQuestionnaire = item => {
    return (dispatch, getState) => {
        return dispatch(getAssignmentsNumberByQuestionnaire(item))
            .then(() => {
                const assignmentsNumber = getState().assignmentUser.assignmentsNumber;
                if (assignmentsNumber > 0) {
                    return "ASSIGNED";
                } else {
                    return dispatch(sendDeleteRequest(item));
                }
            })
    }
};

export const closeQuestionnaire = item => {
    return (dispatch) => {
        return dispatch(getAssignmentsNumberByQuestionnaire(item))
            .then(() => {
                return dispatch(sendCloseRequest(item));
            })
    }
};

export const sendDeleteRequest = item => {
    return (dispatch, getState) => {
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.DELETE_QUESTIONARY}?idQuestionary=${encodeURIComponent(item.id)}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).then(results => {
            return results.json();
        }).then(response => {
            let index = getIndexQuestionary(getState().questionnaires, item);
            let questionnaires = getState().questionnaires.questionnaires;
            if (response === "Ok" && index !== undefined) {
                questionnaires.splice(index, 1);
                const newQuestionnaires = questionnaires.splice(0);
                dispatch(setQuestionnairesData(newQuestionnaires));
                return "DELETED"
            }
        }).catch(error => console.error('Error:', error));
    };
};

export const sendCloseRequest = item => {
    return (dispatch, getState) => {
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.CLOSE_QUESTIONARY}${encodeURIComponent(item.id)}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).then(results => {
            return results.json();
        }).then(response => {
            let index = getIndexQuestionary(getState().questionnaires, item);
            let questionnaires = getState().questionnaires.questionnaires;
            if (response === 'ok' && index !== undefined) {
                dispatch(setQuestionnairesData(questionnaires));
                return "CLOSED"
            }
        }).catch(error => console.error('Error:', error));
    };
};

export const getAssignmentsNumberByQuestionnaire = item => {
    return dispatch => {
        return dispatch(getAssignmentsByQuestionnaire(item.id))
            .then((data) => {
                dispatch(setQuestionnaireAssignments(data.length));
            });
    };
};

export const getAssignmentsByQuestionnaire = id => {
    return () => {
        const rangeUrl = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_QUESTIONER_QUESTIONNAIRES_BY_QUESTIONNAIRE}?questionaryId=${encodeURIComponent(id)}`;
        return fetch(rangeUrl)
            .then(results => {
                return results.json();
            }).then(response => {
                return response;
            });
    };
};

export const saveQuestionnaire = (questionnaires, range) => {
    return () => {
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.SAVE_QUESTIONNAIRE_AND_RANGE}`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({questionaries: questionnaires, questionaryRange: range}),
            headers: {
                'Accept': '*/*',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).then(results => {
            return results.json();
        }).then(response => {
            if (response === "Ok") return "OK";
            else return "ERROR";
        });
    };
};

export const getTypesByClass = payload => {
    return () => {
        const url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_TYPES_BY_CLASS}${encodeURIComponent(payload)}`;
        return fetch(url)
            .then(results => {
                return results.json();
            }).then(response => {
                return response;
            });
    };
};

export const getQuestionsTypes = payload => {
    return dispatch => {
        return dispatch(getTypesByClass(payload))
            .then((response) => {
                dispatch(setQuestionTypes(response));
            })
    };
};

export const getRangesByQuestionnaire = questionnaireId => {
    return () => {
        const url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_RANGES_BY_QUESTIONNAIRE}?idQuestionary=${encodeURIComponent(questionnaireId)}`;
        return fetch(url).then(results => {
            return results.json();
        }).then(response => {
            return response;
        });
    };
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

export const saveAssignment = assignments => {
    return () => {
        const url = `${Constants.ROUTE_WEB_SERVICES}${Constants.ASSING_QUESTIONARIES}`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(assignments),
            headers: {
                'Accept': '*/*',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json().then(response => {
                return response;
            })
        ).catch(error => console.error('Error:', error)
        ).then(() => {
            return "OK";
        });
    };
};

export const getMobileSellersByQuestionnaire = id => {
    return dispatch => {
        return fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_MOBILE_SELLER_BY_ID_QUESTIONARY + id)
            .then(results => {
                return results.json();
            }).then(response => {
                dispatch(addMobileSellers(response));
            });
    };
};

export const getAssignedMobileSellersByQuestionnaire = id => {
    return () => {
        return fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ASSIGNMENTS_BY_ID_QUESTIONARY + id)
            .then(results => {
                return results.json();
            }).then(response => {
                return response;
            });
    };
};

export const getAnswersByQuestionnaire = id => {
    return () => {
        return fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ANSwERS + id)
            .then(results => {
                return results.json();
            }).then(response => {
                return response;
            });
    };
};

export const getMenuByUser = payload => {
    return dispatch => {
        return fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_MENU_BY_USER + payload)
            .then(results => {
                return results.json();
            }).then(response => {
                dispatch(setMenu(response));
                return response;
            });
    };
};

export const getSegment = id => {
    return () => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.GET_CLIENT_KILOLITER}/${id}`;
        return fetch(url)
            .then(results => {
                return results.json();
            }).then(response => {
                return response;
            });
    };
};

export const getSegmentationData = (start, end) => {
    return () => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.GET_CLIENT_KILOLITERS_RANGE}/${utilDate.dateToISO(start)}/${utilDate.dateToISO(end)}`;
        return fetch(url)
            .then(results => {
                return results.json();
            }).then(response => {
                return response
            });
    };
};

export const deleteSegment = toDelete => {
    return () => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.DEL_CLIENT_KILOLITER}/${toDelete}`;
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                return response;
            })
            .catch(() => {
                return "ERROR";
            });
    };
};

export const sendSegmentation = data => {
    return () => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.POST_CLIENT_KILOLITERS_SEGMENT}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                return response;
            });
    };
};

export const getDataTypesByFatherGroup = (father, group) => {
    return () => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.DATATYPES}/${father}/${group}`;
        return fetch(url)
            .then(results => {
                return results.json();
            })
            .then(response => {
                return response;
            });
    };
};

export const getLines = () => {
    return () => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.LINES}`;
        return fetch(url)
            .then(results => {
                return results.json();
            })
            .then(response => {
                return response;
            });
    };
};

export const getMaterials = lineName => {
    return () => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.MATERIALS}/${lineName}`;
        return fetch(url)
            .then(results => {
                return results.json();
            })
            .then(response => {
                return response
            });
    };
};

export const sendBase = data => {
    return () => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.POST_CLIENT_KILOLITERS_BASE}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                return response;
            });
    };
};

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

export const getClientsByNitOrNameInSystem = (searchTerm, systemName) => {
    return () => {
        const system = systemName === 'POS' ? Constants.ROUTE_WEB_SERVICES_POS : Constants.ROUTE_WEB_SERVICES;
        return fetch(`${system}${Constants.GET_CLIENTS_BY_NIT_OR_NAME}${encodeURIComponent(searchTerm)}`)
            .then(results => {
                return results.json();
            }).then(
                response => response,
                () => "ERROR"
            );
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
                error => {
                    return error;
                });
    };
};

export const getTypeSystemByUser = userId => {
    return () => {
        const url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_SYSTEM_BY_USER}${encodeURIComponent(userId)}`;
        return fetch(url)
            .then(results => {
                return results.json();
            }).then(response => {
                    return response;
                },
                error => {
                    return error;
                });
    };
};

export const getRoutesByMobileseller = mobileSeller => {
    return () => {
        const url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_ROUTES_BY_MOBILE_SELLER}${encodeURIComponent(mobileSeller)}`;
        return fetch(url)
            .then(results => {
                return results.json();
            }).then(response => {
                    return response;
                },
                error => {
                    return error;
                });
    };
};

export const saveClientUser = (clientUser, originalEmail) => {
    return () => {
        return fetch(`${Constants.ROUTE_WEB_SERVICES_POS}${Constants.SAVE_CLIENT_USER}${originalEmail}`,
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
            }).then(
                response => {
                    return response;
                },
                () => {
                    return "ERROR";
                });
    };
};

/**
 * Executes all requests of initial data simultaneously
 * @param user the user id, if there is any
 * @returns {Function} dispatches all initial data actions to update the store
 */
export const fetchInitialData = user => {
    return dispatch => {
        Promise.all([
            fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_TYPES_BY_CLASS}${encodeURIComponent(Constants.CLASS_NAME_ESTQUEST)}`),
            fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_TYPES_BY_CLASS}${encodeURIComponent(Constants.CLASS_NAME_CARGOPER)}`),
            fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_USER_BY_ID}${user}`),
            fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_ALL_DEPARTAMENTS}`),
            fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_ALL_BRANCHES}`),
            fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_TYPES_BY_CLASS}${encodeURIComponent(Constants.CLASS_NAME_SYSTEM)}`),
            fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_TYPES_BY_CLASS}${encodeURIComponent(Constants.CLASS_NAME_REACH)}`),
            fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_TYPES_BY_CLASS}${encodeURIComponent(Constants.CLASS_NAME_QUESTIONNAIRE_STATUS)}`),
        ])
            .then(([res1, res2, res3, res4, res5, res6, res7, res8]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json()]))
            .then(([questionnaireTypes, chargeTypes, userById, cities, branches, systemTypes, reachTypes, questionnaireStatus]) => {
                dispatch(setInitialDataQuestionerQuestionary(questionnaireTypes));
                dispatch(setInitialDataTypesSeller(chargeTypes));
                dispatch(setUser(userById));
                dispatch(getAllDepartaments(cities));
                dispatch(getAllBranches(branches));
                dispatch(setSystemTypes(systemTypes));
                dispatch(setReachTypes(reachTypes));
                dispatch(setQuestionnaireStatus(questionnaireStatus));
            });
    }
};

export const saveAnswers = answers => {
    return () => {
        return fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.SAVE_ANSWERS}`,
            {
                method: 'POST',
                body: JSON.stringify(answers),
                headers: {
                    'Accept': '*/*',
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            .then(results => {
                return results.json();
            }).then(
                () => {
                    return "OK";
                },
                () => {
                    return "ERROR";
                });
    };
};

export const getAnswersAnsQuestionnaireByQuestionnaire = id => {
    return dispatch => {
        Promise.all([
            fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_ANSwERS}${encodeURIComponent(id)}`),
            fetch(`${Constants.ROUTE_WEB_SERVICES}${Constants.GET_QUESTIONNAIRE_BY_ID}?idQuestionary=${encodeURIComponent(id)}`),
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([answers, questionnarie]) => {
                dispatch(getAnswers(answers));
                dispatch(getAnswersQuestionnarie(questionnarie));
            });
    };
};

export const getGenerationExpenses = () => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.RUN_TRANSFORMATION}`;
        return fetch(url)
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(loadInputBaseInformation(response))
                } else {
                    dispatch(changeErrorRequest(response))
                }
                return response
            }).catch(error => {
                dispatch(changeErrorRequest(error))
            })
    }
};

export const getInputBaseInformation = () => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.RUN_INPUT_TRANSFORMATION}`;
        return fetch(url)
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(loadInputBaseInformation(response));
                } else {
                    dispatch(changeErrorRequest(response))
                }
            }).catch(error => {
                dispatch(changeErrorRequest(error))
            })
    }
};

export const getCostBaseInformation = () => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.RUN_COST_TRANSFORMATION}`;
        return fetch(url)
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(loadCostBaseInformation(response))
                } else {
                    dispatch(changeErrorRequest(response))
                }
            }).catch(error => {
                dispatch(changeErrorRequest(error))
            })
    }
};

export const getInitialDataCenterCostConditionServerBi = () => {
    return dispatch => {
        Promise.all([
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.CENTER_COST_CONDITION_BI}`),
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.COST_CENTER_BI}`),
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.BUSINESS_BI}`),
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.LINE_COST_BI}`),
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.ORGANIZATION_BI}`),
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.CHANNEL_BI}`),
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.REGION_BI}`),
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.SUB_REGION_BI}`)
        ])
            .then(([res1, res2, res3, res4, res5, res6, res7, res8]) => Promise.all([res1.json(),
                res2.json(), res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json()]))
            .then(([centerCostCondition, costCenter, business, lineCost, organization, channel, region, subRegion]) => {
                if (centerCostCondition.status === undefined &&
                    costCenter.status === undefined &&
                    business.status === undefined &&
                    lineCost.status === undefined &&
                    organization.status === undefined &&
                    channel.status === undefined &&
                    region.status === undefined &&
                    subRegion.status === undefined) {
                    dispatch(getInitialDataCenterCostConditonBi({
                        centerCostConditions: centerCostCondition,
                        centerCost: costCenter,
                        business: business,
                        lineCost: lineCost,
                        organization: organization,
                        channel: channel,
                        region: region,
                        subRegion: subRegion,
                    }));
                } else {
                    if (centerCostCondition.status !== undefined) {
                        dispatch(changeErrorBi(centerCostCondition))
                    } else if (costCenter.status !== undefined) {
                        dispatch(changeErrorBi(costCenter))
                    } else if (business.status !== undefined) {
                        dispatch(changeErrorBi(business))
                    } else if (lineCost.status !== undefined) {
                        dispatch(changeErrorBi(lineCost))
                    } else if (organization.status !== undefined) {
                        dispatch(changeErrorBi(organization))
                    } else if (channel.status !== undefined) {
                        dispatch(changeErrorBi(channel))
                    } else if (region.status !== undefined) {
                        dispatch(changeErrorBi(region))
                    } else if (subRegion.status !== undefined) {
                        dispatch(changeErrorBi(subRegion))
                    }
                }
            })
            .catch(error => {
                dispatch(changeErrorBi(error))
            })
    }
};

export const deleteCenterCostConditionServerBi = id => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.DELETE_CENTER_COST_CONDITION}${id}`;
        return fetch(url)
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(deleteCenterCostConditionBi(response))
                } else {
                    dispatch(changeErrorBi(response))
                }
            }).catch(error => {
                dispatch(changeErrorBi(error))
            })
    }
};

export const updateCenterCostConditionSeverBi = (id, center, business, line, organization, channel, region, subRegion) => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${String.format(Constants.UPDATE_CENTER_COST_CONDITION, id, center, business, line, organization, channel, region, subRegion)}`;
        return fetch(url)
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(updateCenterConstConditionBi(response))
                } else {
                    dispatch(changeErrorBi(response))
                }
            }).catch(error => {
                dispatch(changeErrorBi(error))
            })
    }
};

export const createCenterCostConditionServerBi = (id, center, business, line, organization, channel, region, subRegion) => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${String.format(Constants.UPDATE_CENTER_COST_CONDITION, id, center, business, line, organization, channel, region, subRegion)}`;
        return fetch(url)
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(createCenterCostConditionBi(response))
                } else {
                    dispatch(changeErrorBi(response))
                }
            }).catch(error => {
                dispatch(changeErrorBi(error))
            })
    }
};

export const getInitialAccountPeriodServerBi = () => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.GET_ACCOUNTS_PERIOD}`;
        return fetch(url)
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(getInitialAccountPeriodBi(response))
                } else {
                    dispatch(changeErrorRequestAccountPeriodBi(response))
                }
            }).catch(error => {
                dispatch(changeErrorRequestAccountPeriodBi(error))
            })
    }
};

export const getDataCreateAccountPeriodServerBi = () => {
    return dispatch => {
        Promise.all([
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.GET_ACCOUNT_DIMENSION}`),
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.GET_TIME_DIMENSION}`)
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([accountsDimension, dateDimension]) => {
                if (accountsDimension.status === undefined &&
                    dateDimension.status === undefined) {
                    dispatch(getDataCreateAccountPeriodBi({
                        accountsDimension: accountsDimension,
                        dateDimension: dateDimension
                    }))
                } else {
                    if (accountsDimension.status !== undefined) {
                        dispatch(changeErrorRequestAccountPeriodBi(accountsDimension))
                    } else if (dateDimension.status !== undefined) {
                        dispatch(changeErrorRequestAccountPeriodBi(dateDimension))
                    }
                }
            }).catch(error => {
            dispatch(changeErrorRequestAccountPeriodBi(error))
        })
    }
};

export const createAccountPeriodServerBi = (dateId, accountId, amount) => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.CRATE_ACCOUNT_PERIOD}${dateId}&accountId=${accountId}&amount=${amount}`;
        return fetch(url, {method: "POST"})
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(createAccountPeriodBi(response))
                } else {
                    dispatch(changeErrorRequestAccountPeriodBi(response))
                }
            }).catch(error => {
                dispatch(changeErrorRequestAccountPeriodBi(error))
            })
    }
};

export const updateAccountPeriodServerBi = (id, dateId, accountId, amount) => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.UPDATE_ACCOUNT_PERIOD}${id}&dateId=${dateId}&accountId=${accountId}&amount=${amount}`;
        return fetch(url, {method: 'PUT'})
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(updateAccountPeriodBi(response))
                } else {
                    dispatch(changeErrorRequestAccountPeriodBi(response))
                }
            }).catch(error => {
                dispatch(changeErrorRequestAccountPeriodBi(error))
            })
    }
};

export const deleteAccountPeriodServerBi = (id) => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.DELETE_ACCOUNT_PERIOD}${id}`;
        return fetch(url, {method: 'DELETE'})
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(deleteAccountPeriodBi(response))
                } else {
                    dispatch(changeErrorRequestAccountPeriodBi(response))
                }
            })
            .catch(error => {
                dispatch(changeErrorRequestAccountPeriodBi(error))
            })
    }
};

export const getDataInitialExchangeRateServerBi = () => {
    return dispatch => {
        Promise.all([
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.GET_EXCHANGE_RATE}`),
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.GET_ACCOUNT_DIMENSION}`),
            fetch(`${Constants.ROUTE_WEB_BI}${Constants.GET_TIME_DIMENSION}`)
        ])
            .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
            .then(([exchangesRate, accountsDimension, timeDimension]) => {
                if (exchangesRate.status === undefined &&
                    accountsDimension.status === undefined && timeDimension.status === undefined) {
                    dispatch(getInitialDataExchangeRateBi({
                        exchangesRate: exchangesRate,
                        accountsDimension: accountsDimension,
                        timeDimension: timeDimension
                    }))
                } else {
                    if (accountsDimension.status !== undefined) {
                        dispatch(changeErrorRequestExchangeRateBi(accountsDimension))
                    } else if (exchangesRate.status !== undefined) {
                        dispatch(changeErrorRequestExchangeRateBi(exchangesRate))
                    } else if (timeDimension.status !== undefined) {
                        dispatch(changeErrorRequestExchangeRateBi(timeDimension))
                    }
                }
            }).catch(error => {
            dispatch(changeErrorRequestExchangeRateBi(error))
        })
    }
};

export const createExchangeRateServerBi = (idDate, tc) => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.CREATE_EXCHANGE_RATE}${idDate}&tc=${tc}`;
        return fetch(url, {method: 'POST'})
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(createExchangeRateBi(response))
                } else {
                    dispatch(changeErrorRequestAccountPeriodBi(response))
                }
            })
            .catch(error => {
                dispatch(changeErrorRequestAccountPeriodBi(error))
            })
    }
};

export const updateExchangeRateServerBi = (exchangeRateId, idDate, tc) => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.UPDATE_EXCHANGE_RATE}${exchangeRateId}&idDate=${idDate}&tc=${tc}`;
        return fetch(url, {method: 'PUT'})
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(updateExchangeRateBi(response))
                } else {
                    dispatch(changeErrorRequestAccountPeriodBi(response))
                }
            }).catch(error => {
                dispatch(changeErrorRequestAccountPeriodBi(error))
            })
    }
};

export const deleteExchangeRateServerBi = (id) => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.DELETE_EXCHANGE_RATE}${id}`;
        return fetch(url, {method: 'DELETE'})
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(deleteExchangeRateBi(response))
                } else {
                    dispatch(changeErrorRequestExchangeRateBi(response))
                }
            })
            .catch(error => {
                dispatch(changeErrorRequestExchangeRateBi(error))
            })
    }
};

export const getAllConceptsBi = () => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.CONCEPTS}`;
        return fetch(url)
            .then(results => {
                return results.json();
            }).then(response => {
                if (response.status === undefined) {
                    dispatch(getAllConcepts(response))
                } else {
                    dispatch(changeErrorBi(response))
                }
            });
    };
};

export const deleteConceptServerBi = (id) => {
    return dispatch => {
        const url = `${Constants.ROUTE_WEB_BI}${Constants.DELETE_CONCEPT}${id}`;
        return fetch(url, {method: 'DELETE'})
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(deleteConceptBi(response))
                } else {
                    dispatch(changeErrorBi(response))
                }
                return response;
            }).catch(error => {
                dispatch(changeErrorBi(error))
            })
    }
};

export const createConceptServerBi = (concept) => {
    return dispatch => {
        let create = StringFilterUtil.format(Constants.CREATE_CONCEPT, concept.id, concept.name, concept.abbreviation);
        const url = `${Constants.ROUTE_WEB_BI}${create}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(createConceptBi(response))
                } else {
                    dispatch(changeErrorBi(response))
                }
                return response;
            }).catch(error => {
                dispatch(changeErrorBi(error))
            })
    }
};

export const updateConceptServerBi = (concept) => {
    return dispatch => {
        let update = StringFilterUtil.format(Constants.UPDATE_CONCEPT, concept.id, concept.name, concept.abbreviation);
        const url = `${Constants.ROUTE_WEB_BI}${update}`;
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(results => {
                return results.json()
            })
            .then(response => {
                if (response.status === undefined) {
                    dispatch(updateConceptBi(response))
                } else {
                    dispatch(changeErrorBi(response))
                }
                return response;
            }).catch(error => {
                dispatch(changeErrorBi(error))
            })
    }
};

import React from 'react';
import './styles.css'
import {Button} from "../../../../../../../node_modules/primereact/button";
import {Card} from 'primereact/card';
import AnswerList from "../../../../../AnswersQuestionnaire/pages/AnswerList/AnswerList";
import QuestionaryAsignmet from "../../QuestionaryAsignmet";

const QuestionaryData = ({data, handleQuestionaryDataClick, parentComponent}) => {

    return (
        <div className="list">
            <Card className="cardQuestionary" title={data.name} key={data.id}>
                <div className="text">
                    <div>Creado</div>
                    <div>{data.fechaId} {data.usuarioId}</div>
                    <br/>
                    <span>
                        {
                            parentComponent === "QuestionaryAsignmet" ?
                                <Button label="Iniciar Asignacion"  onClick={() => {
                                    handleQuestionaryDataClick(data)
                                }}/>:
                                parentComponent === "AnswerList" ?
                                    <Button label="Seleccionar encuesta"  onClick={() => {
                                        handleQuestionaryDataClick(data)
                                    }}/>: null
                        }

                    </span>
                </div>
            </Card>
        </div>
    )
};

export default QuestionaryData;


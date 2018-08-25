import React from 'react';
import './styles.css'
import {Button} from "../../../../../../../node_modules/primereact/button";
import {Card} from 'primereact/card';

const QuestionaryData = ({data, handleQuestionaryLocationDataClick}) => {


    return (
        <div>
            <Card className="cardQuestionary" title={data.name} key={data.id}>
                <div>
                    <div className="light-text">Creado</div>
                    <div className="normal-text">{data.fechaId} {data.usuarioId}</div>
                    <br/>
                    <span>
                        <Button label="Iniciar Asignacion" className="ui-button-success" onClick={() => {
                            handleQuestionaryLocationDataClick(data.id)
                        }}/>
                    </span>
                </div>
            </Card>
        </div>
    )
};

export default QuestionaryData;


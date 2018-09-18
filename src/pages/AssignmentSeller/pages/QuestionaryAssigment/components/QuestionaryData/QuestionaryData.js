import React from 'react';
import './styles.css'
import {Button} from "../../../../../../../node_modules/primereact/button";
import {Card} from 'primereact/card';

const QuestionaryData = ({data, handleQuestionaryLocationDataClick}) => {


    return (
        <div className="list">
            <Card className="cardQuestionary" title={data.name} key={data.id}>
                <div className="text">
                    <div>Creado</div>
                    <div>{data.fechaId} {data.usuarioId}</div>
                    <br/>
                    <span>
                        <Button label="Iniciar Asignacion"  onClick={() => {
                            handleQuestionaryLocationDataClick(data)
                        }}/>
                    </span>
                </div>
            </Card>
        </div>
    )
};

export default QuestionaryData;


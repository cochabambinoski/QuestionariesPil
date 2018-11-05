import React from 'react';
import './styles.css'
import {Button} from "../../../../../../../node_modules/primereact/button";
import {Card} from 'primereact/card';
import Link from "react-router-dom/es/Link";

const QuestionaryData = ({data, handleQuestionaryDataClick}) => {
    return (
        <div className="list">
            <Card className="cardQuestionary" title={data.name} key={data.id}>
                <div className="text">
                    <div>Creado</div>
                    <div>{data.fechaId} {data.usuarioId}</div>
                    <br/>
                    <div>
                        <Link to={`/Assigment/${data.id}`}>
                            <Button label="Iniciar Asignacion" onClick={() => {handleQuestionaryDataClick(data)}}/>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    )
};

export default QuestionaryData;


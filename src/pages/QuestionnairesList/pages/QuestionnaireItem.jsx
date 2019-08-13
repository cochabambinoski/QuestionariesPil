import React from 'react';
import {Card} from "primereact/card";
import Constants from "../../../Constants";
import Link from "react-router-dom/es/Link";
import {questionariesEditIdRouteParam, questionariesShowIdRouteParam} from "../../../routes/PathRoutes";
import Button from "@material-ui/core/es/Button/Button";

function QuestionnaireItem(props) {
    const {item} = props;
    return (
        <div key={item.id}>
            <Card title={item.name}>
                <div className="text">
                    <div>Creado por {item.usuarioId}</div>
                    <div>{item.fechaId}</div>
                    {
                        item.status !== null ? item.status.codigoSap === Constants.CODSAP_QUESTIONER_QUESTIONARY_OPEN ?
                            <div className="open">Abierto</div> :
                            <div className="close">Cerrado</div> : null
                    }
                    <br/>
                    <span>
                        <Link to={`${questionariesShowIdRouteParam}${item.id}`}>
                            <Button variant={"contained"} color={"primary"}>Ver</Button>
                        </Link>

                        <Link to={`${questionariesEditIdRouteParam}${item.id}`}>
                            <Button variant={"contained"} color={"primary"}>Editar</Button>
                        </Link>

                        <Button variant={"contained"}
                                color={"primary"}
                                onClick={() => {props.enterModal(item);}}
                                disabled={item.status != null && item.status.codigoSap === Constants.CODSAP_QUESTIONER_QUESTIONARY_CLOSE}
                        >Cerrar</Button>

                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => {props.openModal(item);}}>Eliminar</Button>
                    </span>
                </div>
            </Card>
            <br/>
        </div>
    )
}

export default QuestionnaireItem;

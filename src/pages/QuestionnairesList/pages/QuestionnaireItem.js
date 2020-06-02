import React from 'react';
import {Card} from "primereact/card";
import Constants from "../../../Constants";
import Link from "react-router-dom/es/Link";
import {questionariesEditIdRouteParam, questionariesShowIdRouteParam} from "../../../routes/PathRoutes";
import Button from "@material-ui/core/Button";
import {blue, red} from '@material-ui/core/colors';
import withStyles from "@material-ui/core/es/styles/withStyles";

const BlueButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
}))(Button);

const RedButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}))(Button);

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
                            <BlueButton variant={"contained"} color={"primary"}>Ver</BlueButton>
                        </Link>

                        <Link to={`${questionariesEditIdRouteParam}${item.id}`}>
                            <BlueButton variant={"contained"} color={"primary"}>Editar</BlueButton>
                        </Link>

                        <RedButton variant={"contained"}
                                   color={"primary"}
                                   onClick={() => {
                                       props.enterModal(item);
                                   }}
                                   disabled={item.status != null && item.status.codigoSap === Constants.CODSAP_QUESTIONER_QUESTIONARY_CLOSE}>
                            Cerrar
                        </RedButton>

                        <RedButton
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => {
                                props.openModal(item);
                            }}>
                            Eliminar
                        </RedButton>
                    </span>
                </div>
            </Card>
            <br/>
        </div>
    )
}

export default QuestionnaireItem;

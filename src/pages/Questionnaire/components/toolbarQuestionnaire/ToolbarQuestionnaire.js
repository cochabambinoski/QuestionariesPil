import React from 'react';
import Link from "react-router-dom/es/Link";
import {questionariesRoute} from "../../../../routes/PathRoutes";
import Toolbar from "@material-ui/core/Toolbar";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {blue, green, red} from '@material-ui/core/colors';
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

const GreenButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

function ToolbarQuestionnaire(props) {
    const {readOnly} = props;
    return (
        <Toolbar className="toolbarFullWidth">
            <div style={{padding: '5px'}}>
                {readOnly ?
                    <Grid container spacing={24}>
                        <Grid item xs={6} sm={3}>
                            <Link to={questionariesRoute}>
                                <RedButton label="Cancelar" className="ui-button-secondary" onClick={() => {
                                }}>
                                    Cancelar
                                </RedButton>
                            </Link>
                        </Grid>
                    </Grid>
                    :
                    <Grid container spacing={24}>

                        <Grid item xs={6} sm={3}>
                            <GreenButton label="Guardar" className="ui-button-success" onClick={() => {
                                props.saveQuestionnaire()
                            }}>
                                Guardar
                            </GreenButton>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Link to={questionariesRoute}>
                                <RedButton label="Cancelar" className="ui-button-secondary">
                                    Cancelar
                                </RedButton>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <BlueButton label="Nueva pregunta" className="ui-button-secondary" onClick={props.handleNewQuestion}>
                                Nueva Pregunta
                            </BlueButton>
                        </Grid>
                    </Grid>
                }
            </div>
        </Toolbar>
    )
}

export default ToolbarQuestionnaire;

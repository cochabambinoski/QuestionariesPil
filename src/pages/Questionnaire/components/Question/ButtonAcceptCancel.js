import React from 'react';
import Button from "@material-ui/core/Button";
import {green, red} from '@material-ui/core/colors';
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/es/Grid/Grid";

const GreenButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
        marginRight: 5,
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

function ButtonAcceptCancel(props) {
    return (
        <div style={{flexGrow: 1}}>
            <Grid container xs={12}>
                    {props.children}
                    <GreenButton label="Aceptar" onClick={props.addQuestion} className="ui-button-success">
                        Aceptar
                    </GreenButton>
                    <RedButton label="Cancelar" onClick={props.handleClose} className="ui-button-secondary">
                        Cancelar
                    </RedButton>
            </Grid>
        </div>
    )
}

export default ButtonAcceptCancel;

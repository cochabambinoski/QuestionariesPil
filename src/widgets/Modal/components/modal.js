import React from 'react';
import './modal.css';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
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

function Modal(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" className="titleBody">
                    <h1 className="dialogTitle">{props.title}</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="dialogBody">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <BlueButton label="Aceptar" onClick={props.handleConfirm} className="ui-button-primary">
                        Aceptar
                    </BlueButton>
                    <RedButton label="Cancelar" onClick={props.handleCancel} className="ui-button-primary">
                        Cancelar
                    </RedButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Modal;

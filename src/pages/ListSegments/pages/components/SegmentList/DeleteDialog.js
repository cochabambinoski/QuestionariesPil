import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {blue, red} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button/Button";
import DeleteIcon from "@material-ui/icons/Delete"
import CancelIcon from "@material-ui/icons/Cancel"

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

function DeleteDialog(props) {
    const {deleteOpen} = props;
    return (
        <Dialog
            open={deleteOpen}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title"
                         className="titleBody">
                <h1 className="dialogTitle">{"Alerta"}</h1>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="dialogBody">
                    ¿Esta seguro de eliminar esta Segmentacion Base?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <BlueButton label="Eliminar" onClick={props.handleDelete} className="ui-button-success">
                    <DeleteIcon/>
                    Eliminar
                </BlueButton>
                <RedButton label="Cancelar" onClick={props.handleClose} className="ui-button-secondary">
                    <CancelIcon/>
                    Cancelar
                </RedButton>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;

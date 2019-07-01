import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "primereact/button";
import Dialog from "@material-ui/core/Dialog";

function DeleteDialog(props) {
    const { deleteOpen } = props;
    return(
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
                <Button label="Eliminar" icon="pi pi-check" onClick={props.handleDelete}
                        className="ui-button-danger"/>
                <Button label="Cancelar" icon="pi pi-times" onClick={props.handleClose}
                        className="ui-button-secondary"/>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;

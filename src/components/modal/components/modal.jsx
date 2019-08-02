import React from 'react';
import './modal.scss';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

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
                    <Button label="Aceptar" onClick={props.handleConfirm} className="ui-button-secondary">
                        Aceptar
                    </Button>
                    <Button label="Cancelar" onClick={props.handleCancel} className="ui-button-secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Modal;

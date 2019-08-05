import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import BaseGenerator from "../../../../BaseGenerator/pages/BaseGenerator";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "primereact/button";
import Dialog from "@material-ui/core/Dialog";

function BaseSegment(props) {
    const {baseOpen, segment} = props;
    return (
        <Dialog
            className="fullDialog"
            fullScreen
            open={baseOpen}
            onClose={props.handleCloseBase}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title"
                         className="titleBody">
                <h1 className="dialogTitle">{"Generación de Segmentación Base"}</h1>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="dialogBody">
                    <BaseGenerator segment={segment} refresh={props.handleCloseBase}
                                   setBaseClick={props.setBaseClick}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button label="Guardar" icon="pi pi-check" onClick={props.setBaseClick}
                        className="buttonBlue"/>
                <Button label="Cancelar" icon="pi pi-times" onClick={props.handleCloseBase}
                        className="ui-button-secondary buttonSecundary"/>
            </DialogActions>
        </Dialog>
    )
}

export default BaseSegment;

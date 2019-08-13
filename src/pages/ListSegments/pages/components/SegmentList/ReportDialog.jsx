import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "primereact/button";
import Dialog from "@material-ui/core/Dialog";

function ReportDialog(props) {
    const {reportOpen} = props;
    return(
        <Dialog
            open={reportOpen}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className="titleBody">
                <h1 className="dialogTitle">{"Generación de Reportes"}</h1>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="dialogBody">
                    <img src={require('./../../../../../images/file-pdf.svg')} className="icons"
                         alt="PDF"
                         onClick={props.handlePDFReport}/>
                    <img src={require('./../../../../../images/file-excel.svg')} className="icons"
                         alt="Excel"
                         onClick={props.handleXLSReport}/>
                    <img src={require('./../../../../../images/file-document.svg')} className="icons"
                         alt="Documento"
                         onClick={props.handleTXTReport}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button label="Cancelar" icon="pi pi-times" onClick={props.handleCloseReport} className="ui-button-secondary"/>
            </DialogActions>
        </Dialog>
    )
}

export default ReportDialog;

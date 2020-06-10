import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {red} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button/Button";
import CancelIcon from "@material-ui/core/SvgIcon/SvgIcon";

const RedButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}))(Button);

function ReportDialog(props) {
    const {reportOpen} = props;
    return (
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
                <RedButton label="Cancelar" onClick={props.handleCloseReport} className="ui-button-secondary">
                    <CancelIcon/>
                    Cancelar
                </RedButton>
            </DialogActions>
        </Dialog>
    )
}

export default ReportDialog;

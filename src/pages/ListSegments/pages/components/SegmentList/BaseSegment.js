import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import BaseGenerator from "../../../../BaseGenerator/pages/BaseGenerator";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {green, red} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button/Button";
import SaveIcon from "@material-ui/icons/Save"
import CancelIcon from "@material-ui/icons/Cancel"

const GreenButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
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
                <GreenButton label="Guardar" onClick={props.setBaseClick} className="ui-button-success">
                    <SaveIcon/>
                    Guardar
                </GreenButton>
                <RedButton label="Cancelar" onClick={props.handleCloseBase} className="ui-button-secondary">
                    <CancelIcon/>
                    Cancelar
                </RedButton>
            </DialogActions>
        </Dialog>
    )
}

export default BaseSegment;

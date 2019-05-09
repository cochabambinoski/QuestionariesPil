import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PlayArrow from "@material-ui/icons/PlayArrow";
import CancelIcon from '@material-ui/icons/Cancel'
import {withStyles} from "@material-ui/core";
import JsxStyles from "../../../styles/JsxStyles";
import PropTypes from "prop-types";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: 'relative',
        minHeight: 200
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

function AnswerDialog(props) {
    const {answerOpen, classes} = props;
    return (
        <Dialog
            open={answerOpen}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title"
                         className="titleBody">
                <h1 className="dialogTitle">{"Alerta"}</h1>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="dialogBody">
                    ¿Esta seguro de ejecutar el Job?, puede tardar varios minutos
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" className={classes.button} onClick={props.handleAnswer}>
                    <PlayArrow className={classes.leftIcon}/>
                    Ejecutar
                </Button>
                <Button variant="contained" className={classes.button} onClick={props.handleClose}>
                    <CancelIcon className={classes.leftIcon}/>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

AnswerDialog.propTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    handleExecuteClick: PropTypes.func.isRequired
};
export default (withStyles(styles, JsxStyles)(AnswerDialog));

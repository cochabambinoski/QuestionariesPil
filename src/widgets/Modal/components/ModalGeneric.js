import React, {Component} from 'react';
import Modal from "@material-ui/core/es/Modal/Modal";
import {withStyles} from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        //width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit*3,
        margin: theme.spacing.unit,
        outline: 'none',
    },
});

class ModalGeneric extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby={"simple-modal-title"}
                    aria-describedby={"simple-modal-description"}
                    open={this.props.open} onClose={this.props.onClose}>
                    <div style={getModalStyle()} className={classes.paper}>
                        {this.props.children}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(ModalGeneric);

/**
 * Created by smirandaz on 08/28/2018.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import EnhancedTable from "./components/SegmentTable/EnhancedTable";
import BaseGenerator from "../../BaseGenerator/pages/BaseGenerator";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Title from "../../Title/Title";

const styles = theme => ({});

class ListSegments extends Component {

    constructor() {
        super();
        this.state = {
            option: null,
            baseOpen: false,
            segment: null,
            title: "Lista de Segmentación Base",
            subtitle: "Generación de reportes, creación, edición y eliminacion de segmentación."
        };
    }

    /**
     * open base generator
     * @param event
     * @param id
     */
    handleClick = (event, id) => {
        this.setState({baseOpen: true});
    };

    handleClose = () => {
        this.setState({baseOpen: false});
        this.setState({toDelete: null})
    };

    renderBase() {
        const {classes} = this.props;
        return (
            <Dialog
                open={this.state.baseOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"
                             style={{backgroundColor: '#5B5D74'}}>{"Generación de Segmentación Base"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <BaseGenerator segment="null"/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button label="Cancelar" icon="pi pi-times" onClick={this.handleClose}
                            className="ui-button-secondary"/>
                </DialogActions>
            </Dialog>

        );
    }


    renderList() {
        const {classes} = this.props;
        return (
            <div>
                <div>
                    <Title tilte={this.state.title} subtitle={this.state.subtitle}/>
                </div>
                <Toolbar>
                    <div className="p-toolbar-group-left">
                        <Button label="Nuevo" className="p-button-rounded" onClick={this.handleClick}/>
                    </div>
                </Toolbar>
                <div>
                    <div>
                        <EnhancedTable/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div>
                    {this.renderBase()}
                </div>
                {this.renderList()}
            </div>
        );
    }
}

ListSegments.propTypes = {};

export default withStyles(styles)(ListSegments);



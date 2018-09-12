/**
 * Created by smirandaz on 08/28/2018.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {Button} from "primereact/button";
import EnhancedTable from "./components/SegmentTable/EnhancedTable";
import BaseGenerator from "../../BaseGenerator/pages/BaseGenerator";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Title from "../../Title/Title";
import style from "./components/SegmentTable/table.css";

const styles = theme => ({});

class ListSegments extends Component {

    constructor() {
        super();
        this.state = {
            option: null,
            baseOpen: false,
            segment: null,
            title: "Lista de Segmentación Base",
            subtitle: "Generación de reportes, creación, edición y eliminación de segmentación."
        };
    }

    renderList() {
        const {classes} = this.props;
        return (
            <div>
                <div>
                    <Title tilte={this.state.title} subtitle={this.state.subtitle}/>
                </div>
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
                {this.renderList()}
            </div>
        );
    }
}

ListSegments.propTypes = {};

export default withStyles(styles)(ListSegments);



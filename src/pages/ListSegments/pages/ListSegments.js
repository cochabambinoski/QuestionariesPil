/**
 * Created by smirandaz on 08/28/2018.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import EnhancedTable from "./components/SegmentTable/EnhancedTable";
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
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}

ListSegments.propTypes = {};

export default withStyles(styles)(ListSegments);



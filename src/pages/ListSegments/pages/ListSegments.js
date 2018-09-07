/**
 * Created by smirandaz on 08/28/2018.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import TableSegment from "./components/SegmentTable/EnhancedTable";

const styles = theme => ({

});

class ListSegments extends Component {

    handleClick = (event, id) => {

    };

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.title}>
                    <div className="feature-intro">
                        <h1>Lista de Segmentación Base</h1>
                        <p>Generación de reportes, creación, edición y eliminacion de segmentación.</p>
                    </div>
                </div>
                <Toolbar>
                    <div className="p-toolbar-group-left">
                        <Button label="Nuevo" className="p-button-rounded" onClick={this.handleClick}/>
                    </div>
                </Toolbar>
                <div>
                    <div>
                        <TableSegment/>
                    </div>
                </div>
            </div>
        );
    }
}

ListSegments.propTypes = {};

export default withStyles(styles)(ListSegments);



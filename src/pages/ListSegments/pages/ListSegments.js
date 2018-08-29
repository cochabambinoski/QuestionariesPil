/**
 * Created by smirandaz on 08/28/2018.
 */
import React, {Component} from 'react';

import {Toolbar} from 'primereact/toolbar';
import {Button} from 'primereact/button';
import TableSegment from "./components/SegmentTable/EnhancedTable";

class ListSegments extends Component {

    render() {
        return (
            <div>
                <Toolbar>
                    <div className="p-toolbar-group-left">
                        <Button label="Nuevo" className="p-button-rounded" onClick={this.handleClick} />
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

export default ListSegments;


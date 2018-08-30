/**
 * Created by smirandaz on 08/28/2018.
 */
import React, {Component} from "react";

import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import TableSegment from "./components/SegmentTable/EnhancedTable";

class ListSegments extends Component {

    handleClick = (event, id) => {
        /*const {selected} = this.state;
         const selectedIndex = selected.indexOf(id);
         let newSelected = [];

         if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, id);
         } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
         } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
         } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
         selected.slice(0, selectedIndex),
         selected.slice(selectedIndex + 1),
         );
         }

         this.setState({selected: newSelected});*/
    };

    render() {
        return (
            <div>
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

export default ListSegments;


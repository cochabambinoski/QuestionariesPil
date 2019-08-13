import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import SegmentationGenerator from "../../../../segmentationGenerator/SegmentationGenerator";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "primereact/button";
import Dialog from "@material-ui/core/Dialog";

function Segment(props) {
    const {segmentOpen, segment} = props;
    return(
        <Dialog
            open={segmentOpen}
            onClose={props.handleCloseSegment}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className="titleBody">
                <h1 className="dialogTitle">{"Generación de parametros para la segmentación"}</h1>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="dialogBody">
                    <SegmentationGenerator segment={segment}
                                           refresh={props.handleCloseSegment}
                                           setSegmentClick={click => this.clickChild = click}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button label="Guardar" icon="pi pi-check" onClick={() => this.clickChild()}
                        className="buttonBlue"/>
                <Button label="Cancelar" icon="pi pi-times" onClick={props.handleCloseSegment}
                        className="ui-button-secondary buttonSecundary"/>
            </DialogActions>
        </Dialog>
    )
}

export default Segment;

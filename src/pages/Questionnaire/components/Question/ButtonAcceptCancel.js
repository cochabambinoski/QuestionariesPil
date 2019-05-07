import React from 'react';
import {Button} from "primereact/button";
import {Grid} from "@material-ui/core";

function ButtonAcceptCancel(props) {
    return (
        <div style={{flexGrow: 1}}>
            <Grid container xs={12}>
                <Grid item xs={6} sm={3}>
                    {props.children}
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button label="Aceptar" onClick={props.addQuestion} className={'p-button-success'}/>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button label="Cancelar" onClick={props.handleClose} className={'p-button-danger'}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default ButtonAcceptCancel;

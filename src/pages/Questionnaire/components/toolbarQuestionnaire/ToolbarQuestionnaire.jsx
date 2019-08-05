import React from 'react';
import Link from "react-router-dom/es/Link";
import {questionariesRoute} from "../../../../routes/PathRoutes";
import {Button} from "primereact/button";
import Toolbar from "@material-ui/core/Toolbar";
import {Grid} from "@material-ui/core";

function ToolbarQuestionnaire(props) {
    const {readOnly} = props;
    return(
        <Toolbar className="toolbarFullWidth">
            <div style={{padding: '5px'}}>
                {readOnly ?
                    <Grid container spacing={24}>
                        <Grid item xs={6} sm={3}>
                            <Link to={questionariesRoute}>
                                <Button label="Cancelar" className="ui-button-danger" onClick={() => {}}/>
                            </Link>
                        </Grid>
                    </Grid>
                    :
                    <Grid container spacing={24}>

                        <Grid item xs={6} sm={3}>
                            <Button label="Guardar" onClick={() => {props.saveQuestionnaire()}}/>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Link to={questionariesRoute}>
                                <Button label="Cancelar" className="ui-button-danger"
                                />
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Button label="Nueva pregunta" onClick={props.handleNewQuestion}/>
                        </Grid>
                    </Grid>
                }
            </div>
        </Toolbar>
    )
}

export default ToolbarQuestionnaire;

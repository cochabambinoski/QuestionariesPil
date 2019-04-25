import React, {Component} from 'react';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Button from "@material-ui/core/es/Button/Button";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Paper from "@material-ui/core/es/Paper/Paper";
import {formatText} from "../../utils/StringFormatUtil";
import {Grid} from "@material-ui/core";

class PeriodAndAccountRegistration extends Component {
    render() {
        const arrayPeriod = [
            {name: 'Venta Real', id: 1},
            {name: 'Plan de Ventas', id: 2},
            {name: 'Mejor Estimado', id: 3}];
        return (
            <div>
                <Paper style={{marginTop: 5}}>
                    <Toolbar>
                        <Button color={"primary"} variant={"contained"}>Nuevo</Button>
                    </Toolbar>
                </Paper>
                <List style={{width: '100%', maxWidth: 360}}>
                    {
                        arrayPeriod.map(item => {
                            return (
                                <Paper style={{marginTop: 5}} key={item.id}>
                                    <ListItem  alignItems={"flex-start"}>
                                        <Grid container direction={"column"}>
                                            <ListItemText primary={item.name}/>
                                                <Grid item xs={12}>
                                                    <Grid container direction={"row"} justify={"center"}>
                                                        <Grid item>
                                                            <Button variant={"contained"} color={"primary"}>Ver</Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant={"contained"} color={"primary"}>Editar</Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant={"contained"} color={"secondary"}>Eliminar</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                        </Grid>
                                    </ListItem>
                                </Paper>
                            )
                        })
                    }
                </List>
            </div>
        );
    }
}

export default PeriodAndAccountRegistration;

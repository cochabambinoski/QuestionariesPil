import React, {Component} from 'react';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import TextField from "@material-ui/core/es/TextField/TextField";

class DialogCreateAndEditPeriodAndAcoount extends Component {
    render() {
        return (
            <div>
                <Toolbar>
                    <Typography>
                        Tipo
                    </Typography>
                    <form>
                        <FormControl>
                            <TextField label={'Tipo de Datos'}/>
                            <TextField label={'Codigo'}/>
                            <TextField label={"Tipo"}/>
                            <TextField label={'Abreviacion'}/>
                        </FormControl>
                    </form>
                </Toolbar>
            </div>
        );
    }
}

export default DialogCreateAndEditPeriodAndAcoount;

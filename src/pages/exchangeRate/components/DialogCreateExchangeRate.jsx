import React, {Component} from 'react';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import Select from "@material-ui/core/es/Select/Select";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";

class DialogCreateExchangeRate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: null,
            tc: null
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleChangeAmount = name => event => {
        this.setState({[name]: event.target.value});
    };

    acceptOnClick = () => {
        const {date, tc} = this.state;
        const {item} = this.props;
        if (date && tc) {
            const {actionDialog} = this.props;
            switch (actionDialog) {
                case "create":
                    // noinspection JSUnresolvedVariable
                    this.props.onClick(date.idTime, tc);
                    return;
                case "update":
                    // noinspection JSUnresolvedVariable
                    this.props.onClick(item.idExchangeRate, item.idDate, item.tc);
                    return;
                case "view":
                    return this.props.onClose;
                default:
                    return;
            }
        }
    };

    componentDidMount() {
        const {item} = this.props;
        if (item) {
            const {timeDimension} = this.props;
            const date = timeDimension.find(itemList => this.findDateId(itemList, item));
            this.setState({
                date: date,
                tc: item.tc
            })
        }
    }

    // noinspection JSMethodCanBeStatic
    findDateId(item, id) {
        // noinspection JSUnresolvedVariable
        return item.idTime === id.idDate
    }

    render() {
        const {timeDimension, actionDialog, item} = this.props;
        const isDisable = actionDialog === "view";
        // noinspection JSUnresolvedVariable
        return (
            <div>
                <Toolbar>
                    <Typography>
                        Tipo Cambio {item ? item.idExchangeRate : null}
                    </Typography>
                </Toolbar>
                <Toolbar>
                    <form>
                        <FormControl style={{margin: 8, minWidth: 180}} disabled={isDisable}>
                            <InputLabel shrink htmlFor={"date-label"}>Fecha</InputLabel>
                            <Select value={this.state.date}
                                    onChange={this.handleChange}
                                    inputProps={{name: 'date'}}>
                                {timeDimension.map(item => {
                                    const {dayMonthId, monthShort, year} = item;
                                    return (<MenuItem
                                        value={item}>{dayMonthId + "/" + monthShort + "/" + year}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                        <TextField style={{margin: 8}}
                                   id="standard-number"
                                   label={"Importe"}
                                   value={this.state.tc}
                                   onChange={this.handleChangeAmount('tc')}
                                   InputLabelProps={{shrink: true}}
                                   margin="normal"
                                   disabled={isDisable}/>
                    </form>
                </Toolbar>
                <Toolbar>
                    {
                        !isDisable ? (
                            <div>
                                <Button style={{margin: 8}} variant={"contained"}
                                        color={"primary"} onClick={this.acceptOnClick}>Aceptar</Button>
                                <Button variant={"contained"} color={"secondary"}
                                        style={{margin: 8}} onClick={this.props.onClose}>Cancelar</Button>
                            </div>
                        ) : (<Button onClick={this.props.onClose}
                                     color={"primary"}
                                     variant={"contained"}>Cerrar</Button>)
                    }
                </Toolbar>
            </div>
        );
    }
}

export default DialogCreateExchangeRate;

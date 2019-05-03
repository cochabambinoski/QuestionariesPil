import React, {Component} from 'react';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import TextField from "@material-ui/core/es/TextField/TextField";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import Button from "@material-ui/core/es/Button/Button";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

class DialogCreateAndEditPeriodAndAcoount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null,
            date: null,
            amount: null,
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleChangeAmount = name => event => {
        this.setState({[name]: event.target.value});
    };

    acceptOnclick = () => {
        const {account, date, amount} = this.state;
        const {item} = this.props;
        if (account && date && amount) {
            const {actionDialog} = this.props;
            switch (actionDialog) {
                case "create":
                    this.props.onClickButton(date.idTime, account.accountId, amount);
                    return;
                case "update":
                    return this.props.onClick(item.idAccountPeriodDimension, date.idTime, account.accountId, amount);
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
            const {accountDimension, datesDimension} = this.props;
            const account = accountDimension.find(itemList => this.findAccountId(itemList, item));
            const date = datesDimension.find(itemList => this.findDateId(itemList, item));
            this.setState({
                account: account,
                date: date,
                amount: item.amount,
            })
        }
    }

    findDateId(item, id) {
        return item.idTime === id.dateId
    }

    findAccountId(item, id) {
        return item.accountId === id.accountId
    }

    render() {
        const {item} = this.props;
        const {accountDimension, datesDimension} = this.props;
        return (
            <div>
                <Toolbar>
                    <Typography>
                        Cuenta Periodo {item ? item.idAccountPeriodDimension : null}
                    </Typography>
                </Toolbar>
                <Toolbar>
                    <form style={{display: 'flex', flexWrap: 'wrap'}}>
                        <FormControl style={{margin: 8, minWidth: 180,}}>
                            <InputLabel shrink htmlFor="account-label"> Cuenta</InputLabel>
                            <Select value={this.state.account}
                                    onChange={this.handleChange}
                                    inputProps={{name: 'account', id: 'account-label',}}>
                                {accountDimension.map(item => {
                                    return (<MenuItem value={item}> {item.account}</MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl>
                        <FormControl style={{margin: 8, minWidth: 180,}}>
                            <InputLabel shrink htmlFor="age-simple"> Fecha</InputLabel>
                            <Select value={this.state.date} onChange={this.handleChange} inputProps={{name: 'date',}}>
                                {datesDimension.map(item => {
                                    return (
                                        <MenuItem
                                            value={item}> {item.dayMonthId + "/" + item.monthShort + "/" + item.year}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                        <TextField style={{margin: 8}}
                                   id="standard-number"
                                   label="Importe"
                                   value={this.state.amount}
                                   onChange={this.handleChangeAmount('amount')}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   margin="normal"/>
                    </form>
                </Toolbar>
                <Toolbar>
                    <Button style={{margin: 8}} variant={"contained"}
                            color={"primary"}
                            onClick={this.acceptOnclick}>Aceptar</Button>
                    <Button variant={"contained"} color={"secondary"}
                            style={{margin: 8}}
                            onClick={this.props.onClose}>Cancelar</Button>
                </Toolbar>
            </div>
        );
    }
}

export default DialogCreateAndEditPeriodAndAcoount;

import React, {Component} from 'react';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import TextField from "@material-ui/core/es/TextField/TextField";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import Button from "@material-ui/core/es/Button/Button";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Title from "../../Title/Title";

class DialogCreateAndEditPeriodAndAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null,
            date: null,
            amount: null,
            title: "Cuenta Periodo "
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
                    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
                    this.props.onClickButton(date.idTime, account.accountId, amount);
                    return;
                case "update":
                    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
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

    // noinspection JSMethodCanBeStatic
    findDateId(item, id) {
        // noinspection JSUnresolvedVariable
        return item.idTime === id.dateId
    }

    // noinspection JSMethodCanBeStatic
    findAccountId(item, id) {
        // noinspection JSUnresolvedVariable
        return item.accountId === id.accountId
    }

    render() {
        const {item} = this.props;
        const {accountDimension, datesDimension, actionDialog} = this.props;
        // noinspection JSUnresolvedVariable
        return (
            <div>
                <div>
                    <Title title={this.state.title.concat( item ? String(item.idAccountPeriodDimension) : "")} subtitle={this.state.subtitle}/>
                </div>
                <Toolbar>
                    <form style={{display: 'flex', flexWrap: 'wrap'}}>
                        <FormControl style={{margin: 8, minWidth: 180,}} disabled={actionDialog === "view"}>
                            <InputLabel shrink htmlFor="account-label">Cuenta</InputLabel>
                            <Select value={this.state.account}
                                    onChange={this.handleChange}
                                    inputProps={{name: 'account', id: 'account-label',}}>
                                {accountDimension.map(item => {
                                    // noinspection JSUnresolvedVariable
                                    return (<MenuItem value={item}>{item.accountCod} - {item.account}</MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl>
                        <FormControl style={{margin: 8, minWidth: 180,}} disabled={actionDialog === "view"}>
                            <InputLabel shrink htmlFor="age-simple">Fecha</InputLabel>
                            <Select value={this.state.date} onChange={this.handleChange} inputProps={{name: 'date',}}>
                                {datesDimension.map(item => {
                                    const {dayMonthId, monthShort, year} = item;
                                    return (
                                        <MenuItem
                                            value={item}> {dayMonthId + "/" + monthShort + "/" + year}</MenuItem>)
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
                                   margin="normal"
                                   disabled={actionDialog === "view"}/>
                    </form>
                </Toolbar>
                <Toolbar>
                    {
                        actionDialog !== "view" ? (
                            <div>
                                <Button style={{margin: 8}} variant={"contained"}
                                        color={"primary"} onClick={this.acceptOnclick}>Aceptar</Button>
                                < Button variant={"contained"} color={"secondary"}
                                         style={{margin: 8}} onClick={this.props.onClose}>Cancelar</Button>
                            </div>
                        ) : (
                            <div>
                                <Button onClick={this.props.onClose} color={"primary"} variant={"contained"}>Cerrar</Button>
                            </div>
                        )
                    }
                </Toolbar>
            </div>
        );
    }
}

export default DialogCreateAndEditPeriodAndAccount;

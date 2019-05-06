import React, {Component} from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Button from "@material-ui/core/es/Button/Button";

class DialogOperatingAccountEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: null,
            type: null
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    acceptOnClick = () => {
        const {account, type} = this.state;
        const {item} = this.props;
        if (account && type) {
            const {actionDialog} = this.props;
            switch (actionDialog) {
                case "create":
                    //accountId, typeId, operation
                    // noinspection JSUnresolvedVariable
                    this.props.onClick(account.accountId, type.typeId, 1);
                    return;
                case "update":
                    //accountOperationId, accountId, typeId, operation
                    // noinspection JSUnresolvedVariable
                    this.props.onClick(item.accountOperationId, account.accountId, type.typeId, 1);
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
            const {accountDimensions, types} = this.props;
            // noinspection JSUnresolvedVariable
            const accountDimension = accountDimensions.find(itemList => DialogOperatingAccountEdit.findAccountDimensionById(itemList, item.accountId));
            // noinspection JSUnresolvedVariable
            const type = types.find(itemList => DialogOperatingAccountEdit.findTypeById(itemList, item.typeId));
            this.setState({
                account: accountDimension,
                type: type
            })
        }
    }

    static findAccountDimensionById(item, id) {
        // noinspection JSUnresolvedVariable
        return item.accountId === id
    }

    static findTypeById(item, id) {
        // noinspection JSUnresolvedVariable
        return item.typeId === id
    }

    render() {
        const {actionDialog, accountDimensions, item, types} = this.props;
        const isDisable = actionDialog === "view";
        // noinspection JSUnresolvedVariable
        return (
            <div>
                <Typography>
                    Cuenta Operacion {item ? item.accountOperationId : null}
                </Typography>
                <form>
                    <FormControl style={{margin: 8, minWidth: 180}} disabled={isDisable}>
                        <InputLabel shrink htmlFor={"account-label"}>Cuenta</InputLabel>
                        <Select value={this.state.account}
                                onChange={this.handleChange}
                                inputProps={{name: 'account'}}>
                            {accountDimensions.map(item => {
                                const {account} = item;
                                return (<MenuItem value={item}>{account}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <FormControl style={{margin: 8, minWidth: 180}} disabled={isDisable}>
                        <InputLabel shrink htmlFor={"type-label"}>Tipo</InputLabel>
                        <Select value={this.state.type}
                                onChange={this.handleChange}
                                inputProps={{name: 'type'}}>
                            {types.map(item => {
                                const {name} = item;
                                return (<MenuItem value={item}>{name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </form>
                <Toolbar>
                    {!isDisable ? (
                        <div>
                            <Button variant={"contained"} color={"primary"}
                                    style={{margin: 8}}
                                    onClick={this.acceptOnClick}>Aceptar</Button>
                            <Button variant={"contained"} color={"secondary"}
                                    style={{margin: 8}}
                                    onClick={this.props.onClose}>Cancelar</Button>
                        </div>
                    ) : (<Button onClick={this.props.onClose}
                                 color={"primary"}
                                 variant={"contained"}>Cerrar</Button>)}
                </Toolbar>
            </div>
        );
    }
}

export default DialogOperatingAccountEdit;

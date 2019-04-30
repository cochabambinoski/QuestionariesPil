import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getExchangeRate} from "../../reducers";
import {
    createExchangeRateServerBi,
    deleteExchangeRateServerBi,
    getDataInitialExchangeRateServerBi, updateExchangeRateServerBi
} from "../../actions/indexthunk";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import ModalGeneric from "../../widgets/Modal/components/ModalGeneric";
import {cleanExchangeRateReducer} from "../../actions";

class ExchangeRate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialogDelete: false,
        }
    }

    createExchangeRate = () => {

    };

    updateExchangeRate = (item) => {

    };

    deleteExchangeRate = (item) => {
        return (
            <ModalGeneric open={this.state.openDialogDelete} onClose={this.closeDialogDelete}>
                <h1> Seguro que desea borrar este Tipo</h1>
                <Grid container>
                    <Button variant={"contained"} color={"primary"}>Confirmar</Button>
                    <Button variant={"contained"} color={"secondary"}>Cancelar</Button>
                </Grid>
            </ModalGeneric>
        )
    };

    closeDialogDelete = () => {
        this.setState({
            openDialogDelete: false
        })
    };

    componentDidMount() {
        this.props.getDataInitial();
    }

    renderError(errorRequest) {
        return (
            <div>
                <h1>Error {errorRequest.status}</h1>
                <Button color={"primary"} variant={"contained"} onClick={this.prop.cleanExchangeRateStateReducer}> Aceptar </Button>
            </div>
        )
    }

    render() {
        const {load, exchangesRate} = this.props.reducerVariables;
        if (exchangesRate.errorRequest) {
            return this.renderError(exchangesRate.errorRequest)
        }
        return (
            <div>
                {load ?
                    <CircularProgress/> : (
                        <List>
                            {exchangesRate.map(item => {
                                return (
                                    <ListItem>
                                        <h1>{item.idTime}</h1>
                                        <Grid container>
                                            <Button onClick={this.createExchangeRate} variant={"contained"}
                                                    color={"primary"}>Ver</Button>
                                            <Button onClick={() => this.updateExchangeRate(item)} variant={"contained"}
                                                    color={"primary"}>Editar</Button>
                                            <Button onClick={() => this.deleteExchangeRate(item)} variant={"contained"}
                                                    color={"secondary"}>Eliminar</Button>
                                        </Grid>
                                    </ListItem>
                                )
                            })}
                        </List>)

                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reducerVariables: getExchangeRate(state),
});

const mapDispatchToProps = dispatch => ({
    getDataInitial: () => dispatch(getDataInitialExchangeRateServerBi()),
    createExchangeRate: (exchangeRate) => dispatch(createExchangeRateServerBi(exchangeRate)),
    deleteExchangeRate: (id) => dispatch(deleteExchangeRateServerBi(id)),
    updateExchangeRate: (exchangeRate) => dispatch(updateExchangeRateServerBi(exchangeRate)),
    cleanExchangeRateStateReducer: () => dispatch(cleanExchangeRateReducer())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRate);

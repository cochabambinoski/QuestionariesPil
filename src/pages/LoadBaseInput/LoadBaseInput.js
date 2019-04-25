import React, {Component} from 'react';
import Title from "../Title/Title";
import {Messages} from "primereact/messages";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import connect from "react-redux/es/connect/connect";
import {getCostBaseInformation, getInputBaseInformation} from "../../actions/indexthunk";
import {getProcessConfirmation} from "../../reducers";
import Button from "@material-ui/core/es/Button/Button";
import {cleanRequestResponse} from "../../actions";
import Typography from "@material-ui/core/es/Typography/Typography";
import ModalGeneric from "../../widgets/Modal/components/ModalGeneric";

class LoadBaseInput extends Component {

    showMessage(severity, summary, detail) {
        this.messages.show({severity: severity, summary: summary, detail: detail});
    }

    render() {
        if (this.props.reduxVariable.errorRequest) {
            return this.renderError()
        }

        return (
            <div>
                {
                    this.props.reduxVariable !== null ? this.renderResponse() : null
                }
                <Title tilte={'Carga de información Base'}
                       subtitle={'En esta sección, podrá cargar la información base de los ingresos y gastos, para la generación de distribución de gastos.'}/>
                <Messages ref={(el) => this.messages = el}/>
                <Toolbar className="toolbarFullWidth">
                    <div>
                        {
                            this.props.reduxVariable.load ? <CircularProgress size={500} style={{color: '#03A8E4'[200]}}
                                                                              thickness={5}/> : this.renderButtons()
                        }
                    </div>
                </Toolbar>
            </div>);
    }

    loadBaseCost = () => {
        this.props.loadBaseInput()
    };

    loadBaseInput = () => {
        this.props.loadBaseCost()
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.reduxVariable !== this.props.reduxVariable;
    }

    renderError() {
        return (
            <React.Fragment>
                <h1> Error {this.props.reduxVariable.errorRequest.status}</h1>
                <Button color={"primary"} variant="contained" style={{background: "red"}}
                        onClick={this.props.cleanResponse}> Aceptar</Button>
            </React.Fragment>
        )
    }

    renderResponseDialog(message) {
        return (
            <div>
                <ModalGeneric open={this.props.reduxVariable.showDialog} onClose={this.handleClose}>
                    <Typography>
                        {message}
                    </Typography>
                    <Button color={"primary"} variant="contained" style={{position: 'center', background: "#03A8E4"}}
                            onClick={this.props.cleanResponse}>Aceptar</Button>
                </ModalGeneric>
            </div>
        )
    }

    renderResponse() {
        if (this.props.reduxVariable.showDialog) {
            if (this.props.reduxVariable.errorRequest !== null && this.props.reduxVariable.responseRequest === null) {
                return this.renderResponseDialog("La peticion Fallo")
            } else if (this.props.reduxVariable.errorRequest === null) {
                const {codeResult} = this.props.reduxVariable.responseRequest;
                if (codeResult !== null) {
                    if (codeResult === 1) {
                        this.showMessage("success", "Informacion", "La peticion fue realizada correctamente");
                        return this.renderResponseDialog("La peticion fue realizada correctamente")
                    } else {
                        this.showMessage("error", "Informacion", "La Carga no se ralizo correctamente.");
                        return this.renderResponseDialog("La Carga no se ralizo correctamente.")
                    }
                }
            }
        }
    };

    renderButtons() {
        return (
            <div>
                <Button color={"primary"} variant="contained" style={{margin: 2, background: "#03A8E4"}}
                        onClick={this.loadBaseInput}>CARGAR INGRESOS</Button>
                <Button color={"primary"} variant="contained" style={{margin: 2, background: "#03A8E4"}}
                        onClick={this.loadBaseCost}>CARGAR GASTOS</Button>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    reduxVariable: getProcessConfirmation(state),
});

const mapDispatchToProps = dispatch => ({
    loadBaseInput: () => dispatch(getInputBaseInformation()),
    loadBaseCost: () => dispatch(getCostBaseInformation()),
    cleanResponse: () => dispatch(cleanRequestResponse())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadBaseInput);

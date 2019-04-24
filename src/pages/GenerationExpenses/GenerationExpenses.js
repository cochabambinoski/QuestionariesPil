import {Component} from "react";
import React from "react";
import connect from "react-redux/es/connect/connect";
import Title from "../Title/Title";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {Messages} from "primereact/messages";
import ModalGeneric from "../../widgets/Modal/components/ModalGeneric";
import Typography from "@material-ui/core/es/Typography";
import {getProcessConfirmation} from "../../reducers";
import {getGenerationExpenses} from "../../actions/indexthunk";
import {cleanRequestResponse} from "../../actions";
import Button from "@material-ui/core/es/Button/Button";

class GenerationExpenses extends Component {

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
                <Title tilte={'Distribución de Gastos'}
                       subtitle={'En esta sección podrás generar la base de gastos separado por centro de costo y paquete, ' +
                       'el objetivo es desglosar o distribuir en los siguientes niveles de negocio, línea, organización, ' +
                       'canal, región y sub región.'}/>
                <Messages ref={(el) => this.messages = el}/>
                <Toolbar className="toolbarFullWidth">
                    <div>
                        {
                            this.props.reduxVariable.load ?
                                <CircularProgress size={500} style={{color: '#03A8E4'[200]}}
                                                  thickness={5}/> : this.renderButtons()
                        }
                    </div>
                </Toolbar>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.reduxVariable !== this.props.reduxVariable;
    }

    renderError() {
        const status = this.props.reduxVariable.errorRequest.status;
        return (
            <React.Fragment>
                <h1> Error {status}</h1>
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

    generationExpenses = () => {
        this.props.generationExpensesRequest()
    };

    renderButtons() {
        return (
            <div>
                <Button color={"primary"} variant="contained" style={{margin: 2, background: "#03A8E4"}}
                        onClick={this.generationExpenses}>
                    GENERAR DISTRIBUCIÓN DE GASTOS
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reduxVariable: getProcessConfirmation(state),
});

const mapDispatchToProps = dispatch => ({
    generationExpensesRequest: () => dispatch(getGenerationExpenses()),
    cleanResponse: () => dispatch(cleanRequestResponse())
});

export default connect(mapStateToProps, mapDispatchToProps)(GenerationExpenses);

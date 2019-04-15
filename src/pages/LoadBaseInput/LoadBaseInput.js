import {Component, Fragment} from "react"
import Title from "../Title/Title";
import {Messages} from "primereact/messages";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import React from "react";
import {Button} from "primereact/button";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import connect from "react-redux/es/connect/connect";
import {getCostBaseInformation, getInputBaseInformation} from "../../actions/indexthunk";
import {getResponseLoadBaseCost, getResponseLoadBaseInput} from "../../reducers";
import Constants from "../../Constants";

class LoadBaseInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            process: false,
            error: null,
            data: null
        }
    }

    fetchLoadBaseInput = async() => {
        const response = await fetch(`${Constants.ROUTE_WEB_BI}${Constants.RUN_INPUT_TRANSFORMATION}`);
        const data = await response.json();
        this.setState({
            data: data,
            process: false
        })
    }

    fetchLoadBaseExpenses = async() => {
        const response = await fetch(`${Constants.ROUTE_WEB_BI}${Constants.RUN_COST_TRANSFORMATION}`);
        const data = await response.json();
        this.setState({
            data: data,
            process: false
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        debugger;
        if(nextProps.responseLoadBaseInput != null || nextProps.responseLoadBaseCost != null) {
            this.setState({process: false})
        }
    }

    verifyResponse = () => {

    }

    render() {
        return(<div>
            <Fragment>
                <Title tilte={'Carga de información Base'}
                       subtitle={'En esta sección, podrá cargar la información base de los ingresos y gastos, ' +
                       'para la generación de distribución de gastos.'}/>
                <Messages ref={(el) => this.messages = el}/>
                <Toolbar className="toolbarFullWidth">
                    <div>
                        {
                            this.renderForm()
                        }
                    </div>
                </Toolbar>
            </Fragment>
        </div>);
    }

    loadBaseCost = () => {
        this.setState({process: true});
        this.props.loadBaseCost();
    };

    loadBaseInput = () => {
        this.setState({process: true});
        this.props.loadBaseInput();
    };

    renderResponseOk() {

    }

    renderResponseFiled() {

    }

    renderForm() {
        const {process} = this.state;
        return (
            <div>
                {
                    this.state.data === 1 ? this.renderResponseOk() : this.state.data === 0 ? render.renderResponseFiled() : null
                }
                     <div><Button label="CARGAR INGRESOS" onClick={this.loadBaseInput}></Button>
                        <Button label="CARGAR GASTOS" onClick={this.loadBaseCost}></Button></div>
                {
                    process ? <CircularProgress size={500} style={{color: '#5DADE2'[200]}} thickness={5}/> :
                        null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    responseLoadBaseInput : getResponseLoadBaseInput(state),
    responseLoadBaseCost : getResponseLoadBaseCost(state)

});

const mapDispatchToProps = dispatch => ({
    loadBaseInput: () => dispatch(getInputBaseInformation()),
    loadBaseCost: () => dispatch(getCostBaseInformation())
});

export default connect(mapStateToProps, mapDispatchToProps) (LoadBaseInput);
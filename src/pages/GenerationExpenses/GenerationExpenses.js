import {Component, Fragment} from "react";
import React from "react";
import connect from "react-redux/es/connect/connect";
import {Button} from 'primereact/button';
import Title from "../Title/Title";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {Messages} from "primereact/messages";

class GenerationExpenses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            process: 1
        }
    }

    generationExpenses = () => {
        this.setState({process: 0});
    };

    showSuccess(summary, detail) {
        this.messages.show({severity: 'success', summary: summary, detail: detail});
    }


    render() {
        return(<div>
            <Fragment>
                <Title tilte={'Distribución de Gastos'}
                       subtitle={'En esta sección podrás generar la base de gastos separado por centro de costo y paquete, ' +
                       'el objetivo es desglosar o distribuir en los siguientes niveles de negocio, línea, organización, ' +
                       'canal, región y sub región.'}/>
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

    renderForm() {
        const {process} = this.state;
        return (
            <div>
                {
                    process ? <Button label="GENERAR DISTRIBUCIÓN DE GASTOS" onClick={this.generationExpenses}>
                        </Button> : <CircularProgress size={500} style={{color: '#5DADE2'[200]}} thickness={5}/>
                }
            </div>
        );
    }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps) (GenerationExpenses);

import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import Header from "./../PublicQuestionnaires/components/Header";
import {InputText} from 'primereact/inputtext';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import ModalContainer from "../../widgets/Modal/pages/modal";
import {Button} from "primereact/button";
import {getClientsByNitOrNameInSystem} from "../../actions/indexthunk";
import Select from 'react-select';

class AnswerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: props.questionnaire,
            client: null,
            openClientModal: true,
            searchClient: "",
            clientsList: [],
            interviewedName: "",
            firstTimeOpen: true,
        };
    }

    searchClient = () => {
        this.props.getClientsByNitOrNameInSystem(this.state.searchClient, this.state.questionnaire.system.nombre)
            .then(response => {
                let auxClients = [];
                response.forEach(client => {
                    auxClients.push({
                        value: client,
                        label: `${client.nombreFactura} - ${client.nit}`
                    })
                });
                this.setState({clientsList: auxClients});
                this.setState(function (prevState, props) {
                    this.refs.select.setState({menuIsOpen: true});
                });
            });
    };

    cleanClient = () => {
        this.setState({
            client: null,
            searchClient: "",
            clientsList: []
        });
    };

    cancel = () => {
        if (this.state.firstTimeOpen) {
            this.props.invalidateQuestionnaire();
        } else {
            if (this.state.interviewedName !== "" || this.state.client !== null)
                this.setState({openClientModal: false});
            else
                this.showMessage();
        }
    };

    showMessage = () => {
        alert('Seleccione un cliente o ingrese su nombre');
    };

    renderClientModal() {
        return (
            <ModalContainer>
                <Dialog
                    open={this.state.openClientModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        <h1 className="dialog-client-title">Buscar cliente</h1>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" className="dialog-client-body">
                            <div style={{width: '400px', height: '200px'}}>
                                {
                                    this.state.interviewedName.length > 0 ? null :
                                        <div style={{marginBottom: '15px'}}>
                                            Busque su cliente por nit o nombre:

                                            <span style={{marginBottom: '15px'}}>
                                        <InputText id="float-input" type="text" size="30" maxLength="50"
                                                   value={this.state.searchClient} placeholder="Nit / Nombre"
                                                   onChange={(e) => this.setState({searchClient: e.target.value})}/>
                                        <Button icon="pi pi-minus" onClick={() => {
                                            this.cleanClient()
                                        }}/>
                                        </span>
                                            <Select ref="select" placeholder='Seleccione un cliente'
                                                    options={this.state.clientsList}
                                                    value={this.state.client}
                                                    noOptionsMessage={() => 'No hay opciones'}
                                                    onChange={client => {
                                                        this.setState({client})
                                                    }}
                                            />
                                        </div>
                                }

                                {
                                    this.state.searchClient.length > 0 ? null :
                                        <div>
                                            <div>Si no tiene un cliente registrado, ingrese aquí su nombre:</div>

                                            <InputText type="text" size="30" maxLength="50"
                                                       value={this.state.interviewedName} placeholder="Nombre"
                                                       onChange={(e) => this.setState({interviewedName: e.target.value})}/>
                                        </div>
                                }

                            </div>


                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button label="Buscar" onClick={() => {
                            this.searchClient()
                        }}/>
                        <Button label="Aceptar" onClick={() => {
                            this.setState({openClientModal: false, firstTimeOpen: false})
                        }} disabled={this.state.client === null && this.state.interviewedName === ""}/>
                        <Button label="Cancelar" onClick={() => {
                            this.cancel()
                        }}/>
                    </DialogActions>
                </Dialog>
            </ModalContainer>
        );
    }

    render() {
        return (
            <div>
                <Header title={this.state.questionnaire.name} subtitle={this.state.questionnaire.description}/>
                {this.renderClientModal()}
                <div style={{margin: '20px'}} className="client-input" onClick={() => {
                    this.setState({openClientModal: true})
                }}>
                    <div className="client-input-label">Cliente</div>
                    <div className="client-input-name">
                        {
                            this.state.client !== null ?
                                <div>{this.state.client.label}</div> :
                                this.state.interviewedName !== "" ?
                                    <div>{this.state.interviewedName}</div> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    getClientsByNitOrNameInSystem: (searchTerm, system) => dispatch(getClientsByNitOrNameInSystem(searchTerm, system)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerPage);
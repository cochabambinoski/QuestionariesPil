import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import ModalContainer from '../widgets/Modal/pages/modal';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Select from 'react-select';
import {Button} from "primereact/button";
import {InputText} from 'primereact/inputtext';
import {getClientsByNitOrNameInSystem, getClientUserByClient, saveClientUser} from "../actions/indexthunk";
import {Calendar} from 'primereact/calendar';

const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#FFF7A9",
        borderColor: "#FFF7A9",
         boxShadow: state.isFocused ? null : null,

    }),
    menu: base => ({
        ...base,
        background: "#FFF7A9",
        borderRadius: 0,
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        background: "#FFF7A9",
        padding: 0,
    })
};

class ClientVerifier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openClientModal: props.openClientModal,
            openClientUserModal: false,
            client: null,
            clientUser: null,
            interviewedName: "",
            searchClient: "",
            firstTimeOpen: true,
        };
    }

    setDate(clientUser){
        const birthday = clientUser.birthday;

    };

    componentWillReceiveProps(nextProps){
        this.setState({openClientModal: nextProps.openClientModal});
    }

    accept = () => {
        if (this.props.questionnaire === null) {
            this.verifyClientUser();
        } else if (this.props.questionnaire.system.nombre === 'POS' && this.state.client !== null) {
            this.verifyClientUser();
        } else {
            this.setState({openClientModal: false, firstTimeOpen: false});
        }
        if (this.props.questionnaire !== null)
            this.props.setClientAndInterviewed(this.state.client, this.state.interviewedName);
        this.props.modalState(false);
    };

    verifyClientUser = () => {
        this.props.getClientUserByClient(this.state.client.value.id)
            .then(response => {
                if (response !== null) {
                    if (this.checkIfIncomplete(response)) {
                        this.setState({openClientModal: false, openClientUserModal: true, firstTimeOpen: false});
                    } else {
                        this.setState({openClientModal: false, firstTimeOpen: false});
                    }
                } else {
                    this.setState({
                        clientUser: {
                            id: null,
                            client: this.state.client.value,
                            firstNames: "",
                            lastNames: "",
                            email: "",
                            password: "",
                            birthday: null,
                            gender: "",
                            favoriteProduct: "",
                            phone: "",
                            operacionId: 1,
                            sociedadId: 'BO81',
                            usuarioId: 'admin',
                            fechaId:null,
                        }
                    });
                    this.setState({openClientModal: false, openClientUserModal: true, firstTimeOpen: false});
                }
            });
    };

    checkIfIncomplete = (clientUser) => {
        const transformedDate = new Date(clientUser.birthday);
        clientUser.birthday = transformedDate;
        this.setState({clientUser: clientUser});
        const isIncomplete = clientUser.firstNames === "" ||
            clientUser.lastNames === "" ||
            clientUser.email === "" ||
            clientUser.password === "" ||
            clientUser.birthday === "" ||
            clientUser.gender === "" ||
            clientUser.favoriteProduct === "" ||
            clientUser.phone === "";
        return isIncomplete;
    };

    searchClient = () => {
        console.log("searchClient");
        const system = this.props.questionnaire !== null ? this.props.questionnaire.system.nombre : 'POS';
        this.props.getClientsByNitOrNameInSystem(this.state.searchClient, system)
            .then(response => {
                console.log("searchClient - response");
                console.log(response);
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
        this.props.setClientAndInterviewed(null, this.state.interviewedName);
    };

    cancel = () => {
        if (this.state.firstTimeOpen && this.props.questionnaire !== null)
            this.props.invalidateQuestionnaire();
        else{
            this.setState({openClientModal: false});
            this.props.modalState(false);
        }
    };

    renderClientModal() {
        return (
            <Dialog
                open={this.state.openClientModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <div className="dialog-background">
                    <DialogTitle id="alert-dialog-title">
                        <h1 className="dialog-client-title">Buscar cliente</h1>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" className="dialog-client-body">
                            <div style={{width: '400px', height: '200px'}}>
                                {
                                    this.state.interviewedName.length > 0 ? null :
                                        <div style={{marginBottom: '15px', color:'white'}}>
                                            Busque su cliente por nit o nombre:

                                            <span style={{marginBottom: '15px'}}>
                                                        <InputText id="float-input" type="text" size="30" maxLength="50"
                                                                   value={this.state.searchClient}
                                                                   placeholder="Nit / Nombre"
                                                                   onChange={(e) => this.setState({searchClient: e.target.value})}
                                                        style={{background:'#FFF7A94D'}}/>
                                                        <Button icon="pi pi-minus" onClick={() => {
                                                            this.cleanClient()
                                                        }} style={{background:'#5a3115'}}/>
                                                    </span>
                                            <Select ref="select"
                                                    placeholder='Seleccione un cliente'
                                                    options={this.state.clientsList}
                                                    value={this.state.client}
                                                    onChange={client => {
                                                        this.setState({client})
                                                    }}
                                                    noOptionsMessage={() => 'No hay opciones'}
                                                    styles={customStyles}
                                            />
                                        </div>
                                }

                                {
                                    this.props.questionnaire !== null ?
                                        this.state.searchClient.length > 0 ? null :
                                            <div>
                                                <div>Si no tiene un cliente registrado, ingrese aquí su nombre:</div>

                                                <InputText type="text" size="30" maxLength="50"
                                                           value={this.state.interviewedName} placeholder="Nombre"
                                                           onChange={(e) => this.setState({interviewedName: e.target.value})}
                                                           style={{background:'#FFF7A94D'}}/>
                                            </div> : null
                                }

                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button label="Buscar" onClick={() => {
                            this.searchClient()
                        }} className="brown-button"/>
                        <Button label="Aceptar" onClick={() => {
                            this.accept()
                        }} disabled={this.state.client === null && this.state.interviewedName === ""}
                        className="green-button"/>
                        <Button label="Cancelar" onClick={() => {
                            this.cancel()
                        }} className="red-button"/>
                    </DialogActions>
                </div>
            </Dialog>
        );
    };

    renderClientUserModal() {
        return (
            <Dialog
                open={this.state.openClientUserModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <div className="dialog-background">
                <DialogTitle id="alert-dialog-title">
                    <h1 className="dialog-client-title">Complete sus datos</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="dialog-client-body">
                        <div style={{width: '300px', height: '500px'}}>
                            {this.state.clientUser !== null ?
                                <div>
                                    <div>
                                        <div className="client-user-input">Nombres</div>
                                        <div><InputText value={this.state.clientUser.firstNames}
                                                        className="client-user-input"  style={{background:'#FFF7A94D'}}
                                                        onChange={(e) => this.setState({clientUser: {...this.state.clientUser, firstNames: e.target.value}})}/>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="client-user-input">Apellidos</div>
                                        <div><InputText value={this.state.clientUser.lastNames}
                                                        className="client-user-input" style={{background:'#FFF7A94D'}}
                                                        onChange={(e) => this.setState({clientUser: {...this.state.clientUser, lastNames: e.target.value}})}/>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="client-user-input">Teléfono</div>
                                        <div><InputText value={this.state.clientUser.phone}
                                                        className="client-user-input" style={{background:'#FFF7A94D'}}
                                                        onChange={(e) => this.setState({clientUser: {...this.state.clientUser, phone: e.target.value}})}/>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="client-user-input">Fecha de nacimiento</div>
                                        <div className="client-user-input" >
                                            <Calendar value={this.state.clientUser.birthday} style={{background:'#FFF7A94D'}}
                                                      onChange={(e) => this.setState({clientUser: {...this.state.clientUser, birthday: e.value}})}
                                                      showIcon={true} />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="client-user-input">Género</div>
                                        <div><InputText value={this.state.clientUser.gender}
                                                        className="client-user-input" style={{background:'#FFF7A94D'}}
                                                        onChange={(e) => this.setState({clientUser: {...this.state.clientUser, gender: e.target.value}})}/>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="client-user-input">Producto PIL favorito</div>
                                        <div><InputText value={this.state.clientUser.favoriteProduct}
                                                        className="client-user-input" style={{background:'#FFF7A94D'}}
                                                        onChange={(e) => this.setState({clientUser: {...this.state.clientUser, favoriteProduct: e.target.value}})}/>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="client-user-input">Correo electrónico</div>
                                        <div><InputText value={this.state.clientUser.email}
                                                        className="client-user-input" style={{background:'#FFF7A94D'}}
                                                        onChange={(e) => this.setState({clientUser: {...this.state.clientUser, email: e.target.value}})}/>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="client-user-input">Contraseña</div>
                                        <div><InputText value={this.state.clientUser.password}
                                                        className="client-user-input" style={{background:'#FFF7A94D'}}s
                                                        onChange={(e) => this.setState({clientUser: {...this.state.clientUser, password: e.target.value}})}/>
                                        </div>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button label="Guardar" onClick={() => {
                        this.saveClientUser()
                    }} className="green-button"/>
                    <Button label="Cancelar" onClick={() => {
                        this.cancelClientUser()
                    }} className="red-button"/>
                </DialogActions>
                </div>
            </Dialog>
        );
    };

    saveClientUser = () => {
        const format = require('date-format');
        const clientUser = this.state.clientUser;
        const formattedDate = format("yyyy-MM-dd hh:mm:ss", clientUser.birthday);
        clientUser.birthday = formattedDate;
        this.props.saveClientUser(clientUser)
            .then(response=>{
                    this.setState({openClientUserModal:false});
            });
    };

    cancelClientUser = () => {
        if(this.props.questionnaire !== null){
            this.props.invalidateQuestionnaire();
        }
        this.setState({openClientUserModal:false});
    };

    render() {
        return (
            <ModalContainer>
                {this.renderClientModal()}
                {this.renderClientUserModal()}
            </ModalContainer>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    getClientsByNitOrNameInSystem: (searchTerm, system) => dispatch(getClientsByNitOrNameInSystem(searchTerm, system)),
    getClientUserByClient: value => dispatch(getClientUserByClient(value)),
    saveClientUser: value => dispatch(saveClientUser(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientVerifier);
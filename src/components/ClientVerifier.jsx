import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import ModalContainer from './modal/modal';
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
import {RadioButton} from 'primereact/radiobutton';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {encryptMD5} from "../utils/EncryptationUtil";
import {saveClient, saveInterviewedName} from "../actions";
import Constants from './../Constants.json';
import Link from "react-router-dom/es/Link";
import {indexRoute} from "../routes/PathRoutes";

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
        marginTop: 0,
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
            openMessageModal: false,
            client: null,
            clientUser: null,
            interviewedName: "",
            searchClient: "",
            firstTimeOpen: true,
            showMinCharsMessage: false,
            showPassword: false,
            showRegisterError: false,
            birthdayInvalid: false,
            emailInvalid: false,
            passswordInvalid: false,
            mandatoryInvalid: false,
            password: null,
            originalEmail: "",
            showEmailInUseMessage: false,
        };
    }

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    componentWillReceiveProps(nextProps) {
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
                    const clientUser = this.getClientUserFromResponse(response);
                    if (this.checkIfIncomplete(clientUser)) {
                        this.setState({openClientModal: false, openClientUserModal: true, firstTimeOpen: false});
                    } else {
                        this.setState({openClientModal: false, firstTimeOpen: false});
                        if (this.props.questionnaire === null) this.setState({openMessageModal: true});
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
                            fechaId: null,
                        }
                    });
                    this.setState({openClientModal: false, openClientUserModal: true, firstTimeOpen: false});
                }
            });
    };

    getClientUserFromResponse = clientUser => {
        const transformedDate = new Date(clientUser.birthday);
        clientUser.birthday = transformedDate;
        this.setState({clientUser: clientUser, originalEmail: clientUser.email});
        return clientUser;
    };

    checkIfIncomplete = (clientUser) => {
        const isIncomplete = clientUser.firstNames === "" || clientUser.firstNames === null ||
            clientUser.lastNames === "" || clientUser.lastNames === null ||
            clientUser.email === "" || clientUser.email === null ||
            ((clientUser.password === "" || clientUser.password === null) && this.state.password === null) ||
            clientUser.birthday === "" || clientUser.birthday === null ||
            clientUser.gender === "" || clientUser.gender === null ||
            clientUser.favoriteProduct === "" || clientUser.favoriteProduct === null ||
            clientUser.phone === "" || clientUser.phone === null;
        return isIncomplete;
    };

    searchClient = () => {
        if (this.state.searchClient.length < 5) {
            this.setState({showMinCharsMessage: true});
            return;
        }
        const system = this.props.questionnaire !== null ? this.props.questionnaire.system.nombre : 'POS';
        this.props.getClientsByNitOrNameInSystem(this.state.searchClient, system)
            .then(response => {
                let auxClients = [];
                if (response !== 'ERROR') {
                    response.forEach(client => {
                        const label = client.nombreFactura + ' - ' + client.nit;
                        auxClients.push({
                            value: client,
                            label: system === 'SVM' && client.codigo !== null ? label + ' - ' + client.codigo : label,
                        })
                    });
                }
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
            clientsList: [],
            showMinCharsMessage: false,
            originalEmail: ''
        });
        this.props.saveClient(null);
        if (this.props.questionnaire !== null)
            this.props.setClientAndInterviewed(null, this.state.interviewedName);
    };

    showMessage = () => {
        alert('Seleccione un cliente o ingrese su nombre');
    };

    cancel = () => {
        if (this.state.firstTimeOpen && this.props.questionnaire !== null) {
            this.props.invalidateQuestionnaire();
        } else {
            this.setState({openClientModal: false});
            this.props.modalState(false);
        }
        this.close();
    };

    close = () => {
        if (this.props.questionnaire === null) {
            this.setState({
                client: null,
                clientUser: null,
                interviewedName: "",
                searchClient: "",
                firstTimeOpen: true,
                showRegisterError: false,
                password: null,
                openClientModal: false,
                openClientUserModal: false,
                openMessageModal: false,
                originalEmail: '',
            });
            this.props.saveClient(null);
            this.props.saveInterviewedName("");
        } else
            this.setState({openMessageModal: false, showRegisterError: false, password: null, originalEmail: ''});
    };

    renderClientDataModal() {
        return (
            <Dialog
                open={this.state.openMessageModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <div className="dialog-background">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" className="dialog-client-body">
                            <div style={{width: '400px', height: '200px', textAlign: 'center'}}>
                                <h2>??Sus datos de cliente est??n completos!</h2>
                                <br/>
                                <Button label="OK" onClick={() => {
                                    this.close()
                                }} className="red-button"/>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </div>
            </Dialog>
        );
    };

    renderClientModal() {
        return (
            <Dialog
                open={this.state.openClientModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <div className="dialog-background">
                    <DialogTitle id="alert-dialog-title">
                        <div className="dialog-client-title">Buscar cliente</div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" className="dialog-client-body">
                            <div className='dialog'>
                                {
                                    this.state.interviewedName.length > 0 ? null :
                                        <div style={{marginBottom: '15px'}}>
                                            Busque su cliente por nit o nombre:

                                            <div style={{marginBottom: '15px'}}>
                                                <InputText id="float-input" type="text" maxLength="50"
                                                           value={this.state.searchClient}
                                                           className='select-input'
                                                           placeholder="Nit / Nombre"
                                                           onChange={(e) => this.setState({
                                                               searchClient: e.target.value,
                                                               showMinCharsMessage: false
                                                           })}
                                                           style={{background: '#FFF7A94D', display: 'inline-block'}}/>
                                                <Button icon="pi pi-minus" onClick={() => {
                                                    this.cleanClient()
                                                }} style={{background: '#5a3115', display: 'inline-block'}}/>
                                            </div>
                                            <Select ref="select"
                                                    placeholder='Seleccione un cliente'
                                                    options={this.state.clientsList}
                                                    value={this.state.client}
                                                    onChange={client => {
                                                        this.setState({client});
                                                        this.props.saveClient(client);
                                                    }}
                                                    className='select'
                                                    noOptionsMessage={() => 'No hay opciones'}
                                                    styles={customStyles}
                                            />
                                            {this.state.showMinCharsMessage ?
                                                <div style={{color: 'red'}}>Debe ingresar m??nimamente 5 caracteres para
                                                    la b??squeda</div> : null}
                                        </div>
                                }

                                {
                                    this.props.questionnaire !== null ?
                                        this.state.searchClient.length > 0 ? null :
                                            <div>
                                                <div>Si no tiene un cliente registrado, ingrese aqu?? su nombre:</div>

                                                <InputText type="text" maxLength="50" className='select-input-no-button'
                                                           value={this.state.interviewedName} placeholder="Nombre"
                                                           onChange={(e) => {
                                                               this.setState({interviewedName: e.target.value});
                                                               this.props.saveInterviewedName(e.target.value);
                                                           }}
                                                           style={{background: '#FFF7A94D'}}/>
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
                        <Link  to={indexRoute}>
                            <Button label="Cancelar" onClick={() => {
                                this.cancel()
                            }} className="red-button"/>
                        </Link>
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
                            {
                                this.state.showRegisterError ?
                                    <div>
                                        No se pudieron guardar los datos de cliente :(
                                        Ocurri?? un error durante el guardado. Lamentamos las molestias, int??ntelo de
                                        nuevo m??s tarde.
                                    </div> :
                                    <div style={{minWidth: 'auto', height: 'auto'}}>
                                        {this.state.clientUser !== null ?
                                            <div>
                                                {this.state.mandatoryInvalid ?
                                                    <div style={{color: 'red'}}>Por favor, llene todos los
                                                        campos</div> : null}
                                                <div className='client-container-item'>
                                                    <div className="client-user-input-left">Nombres</div>
                                                    <div className="client-user-input-right"><InputText
                                                        maxLength="50" value={this.state.clientUser.firstNames}
                                                        keyfilter={/^[a-z\d\-_\s]+$/i} style={{background: '#FFF7A94D'}}
                                                        onChange={(e) => this.setState({
                                                            clientUser: {
                                                                ...this.state.clientUser,
                                                                firstNames: (e.target.value).toUpperCase()
                                                            }
                                                        })}/>
                                                    </div>
                                                </div>

                                                <div className='client-container-item'>
                                                    <div className="client-user-input-left">Apellidos</div>
                                                    <div className="client-user-input-right"><InputText
                                                        maxLength="50" value={this.state.clientUser.lastNames}
                                                        keyfilter={/^[a-z\d\-_\s]+$/i} style={{background: '#FFF7A94D'}}
                                                        onChange={(e) => this.setState({
                                                            clientUser: {
                                                                ...this.state.clientUser,
                                                                lastNames: (e.target.value).toUpperCase()
                                                            }
                                                        })}/>
                                                    </div>
                                                </div>

                                                <div className='client-container-item'>
                                                    <div className="client-user-input-left">Fecha de nacimiento</div>
                                                    <div className="client-user-input-right">
                                                        <Calendar value={this.state.clientUser.birthday}
                                                                  style={{background: '#FFF7A94D'}}
                                                                  onChange={(e) => this.setState({
                                                                      clientUser: {
                                                                          ...this.state.clientUser,
                                                                          birthday: e.value
                                                                      }
                                                                  })} monthNavigator={true}
                                                                  yearNavigator={true} yearRange="1900:2030"
                                                                  showIcon={true} readOnlyInput={true}/>
                                                    </div>
                                                </div>
                                                {this.state.birthdayInvalid ?
                                                    <div style={{color: 'red', fontSize: '14px'}}>??Est?? seguro de haber
                                                        nacido en esta fecha?</div> : null}


                                                <div className='client-container-item'>
                                                    <div className="client-user-input-left">Tel??fono</div>
                                                    <div className="client-user-input-right"><InputText
                                                        maxLength="20" value={this.state.clientUser.phone}
                                                        keyfilter={/^(\d|-)$/} style={{background: '#FFF7A94D'}}
                                                        onChange={(e) => this.setState({
                                                            clientUser: {
                                                                ...this.state.clientUser,
                                                                phone: e.target.value
                                                            }
                                                        })}/>
                                                    </div>
                                                </div>

                                                <div className='client-container-item'>
                                                    <div className="client-user-input-left">G??nero</div>
                                                    <div className="client-user-input-right">
                                                        <div className='gender-item'>
                                                            <RadioButton inputId="rb" name="gender" value="FEMENINO"
                                                                         onChange={(e) => this.setState({
                                                                             clientUser: {
                                                                                 ...this.state.clientUser,
                                                                                 gender: e.value
                                                                             }
                                                                         })}
                                                                         checked={this.state.clientUser.gender === 'FEMENINO'}/>
                                                            <label htmlFor="rb2"
                                                                   className="p-radiobutton-label">FEMENINO</label>
                                                        </div>
                                                        <div className='gender-item'>
                                                            <RadioButton inputId="rb1" name="gender" value="MASCULINO"
                                                                         onChange={(e) => this.setState({
                                                                             clientUser: {
                                                                                 ...this.state.clientUser,
                                                                                 gender: e.value
                                                                             }
                                                                         })}
                                                                         checked={this.state.clientUser.gender === 'MASCULINO'}/>
                                                            <label htmlFor="rb1"
                                                                   className="p-radiobutton-label">MASCULINO</label>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className='client-container-item'>
                                                    <div className="client-user-input-left">Producto PIL favorito</div>
                                                    <div className="client-user-input-right"><InputText
                                                        maxLength="50" value={this.state.clientUser.favoriteProduct}
                                                        style={{background: '#FFF7A94D'}}
                                                        onChange={(e) => this.setState({
                                                            clientUser: {
                                                                ...this.state.clientUser,
                                                                favoriteProduct: (e.target.value).toUpperCase()
                                                            }
                                                        })}/>
                                                    </div>
                                                </div>

                                                <div className='client-container-item'>
                                                    <div className="client-user-input-left">Correo electr??nico</div>
                                                    <div className="client-user-input-right"><InputText
                                                        maxLength="50" value={this.state.clientUser.email}
                                                        keyfilter='email' style={{background: '#FFF7A94D'}}
                                                        onChange={(e) => this.setState({
                                                            clientUser: {
                                                                ...this.state.clientUser,
                                                                email: e.target.value
                                                            },
                                                            showEmailInUseMessage: false
                                                        })}/>
                                                    </div>
                                                </div>
                                                {this.state.emailInvalid ?
                                                    <div style={{color: 'red', fontSize: '14px'}}>El correo debe seguir
                                                        el formato: test@test.com</div> : null}
                                                {this.state.showEmailInUseMessage ?
                                                    <div style={{color: 'red', fontSize: '14px'}}>El correo ya se
                                                        encuentra registrado</div> : null}

                                                {this.state.clientUser.password === '' ? null :
                                                    <div className='client-container-item'>
                                                        <div className="client-user-input-left">Contrase??a</div>
                                                        <div className="client-user-input-right">
                                                            <TextField
                                                                type='password'
                                                                style={{background: '#FFF7A94D'}}
                                                                value={this.state.clientUser.password}
                                                                disabled={true}/>
                                                        </div>
                                                    </div>}
                                                {this.state.passwordInvalid ?
                                                    <div style={{color: 'red', fontSize: '14px'}}>La contrase??a debe
                                                        tener al menos 6 caracteres</div> : null}

                                                <div className='client-container-item'>
                                                    <div className="client-user-input-left">
                                                        <div>Nueva contrase??a</div>
                                                        {this.state.clientUser.password === '' ? null :
                                                            <div style={{
                                                                fontSize: '14px'
                                                            }}>(Opcional)</div>}
                                                    </div>
                                                    <div className="client-user-input-right">
                                                        <TextField
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                            style={{background: '#FFF7A94D'}}
                                                            value={this.state.password} maxLength="50"
                                                            onChange={this.handleChange('password')}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="Toggle password visibility"
                                                                            onClick={this.handleClickShowPassword}
                                                                        >
                                                                            {this.state.showPassword ?
                                                                                <VisibilityOff/> : <Visibility/>}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                ),
                                                            }}/>
                                                    </div>
                                                </div>
                                            </div>
                                            : null}
                                    </div>
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button label="Guardar" onClick={() => {
                            this.saveClientUser()
                        }} className="green-button" disabled={this.state.showRegisterError}/>
                        <Button label="Cancelar" onClick={() => {
                            this.cancelClientUser()
                        }} className="red-button"/>
                    </DialogActions>
                </div>
            </Dialog>
        );
    };

    validateBirthday = birthday => {
        const valid = birthday <= new Date();
        this.setState({birthdayInvalid: !valid});
        return valid;
    };

    validateEmail = email => {
        const pattern = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\\.[A-Za-z0-9._%+-]+$');
        const valid = pattern.test(email);
        this.setState({emailInvalid: !valid});
        return valid;
    };

    validatePassword = password => {
        const valid = password.length >= 6;
        this.setState({passwordInvalid: !valid});
        return valid;
    };

    validateAllFields = (clientUser) => {
        const incomplete = this.checkIfIncomplete(clientUser);
        const birthdayValid = this.validateBirthday(clientUser.birthday);
        const emailValid = this.validateEmail(clientUser.email);
        const pswValid = this.state.password !== null && this.state.password !== '' ? this.validatePassword(this.state.password) : true;
        if (incomplete)
            this.setState({mandatoryInvalid: true});
        return !incomplete && birthdayValid && emailValid && pswValid;
    };

    dateToString = date => {
        const format = require('date-format');
        return format("yyyy-MM-dd hh:mm:ss", date);
    };

    transformPassword = psw => {
        return encryptMD5(psw);
    };

    saveClientUser = () => {
        const clientUser = {...this.state.clientUser};
        if (!this.validateAllFields(clientUser)) return;
        clientUser.birthday = this.dateToString(clientUser.birthday);
        clientUser.password = this.state.password !== null && this.state.password !== '' ? this.state.password : clientUser.password;
        const email = this.state.originalEmail === '' ? clientUser.email : this.state.originalEmail;
        this.props.saveClientUser(clientUser, email)
            .then(response => {
                switch (response.toString()) {
                    case Constants.CREATED:
                        this.setState({openMessageModal: true, openClientUserModal: false});
                        break;
                    case Constants.UPDATED:
                        this.setState({openMessageModal: true, openClientUserModal: false});
                        break;
                    case Constants.MESSAGE_EXIST_EMAIL:
                        this.setState({showEmailInUseMessage: true});
                        break;
                    default:
                        this.setState({showRegisterError: true});
                        break;
                }
            });
    };

    cancelClientUser = () => {
        if (this.props.questionnaire !== null) {
            this.props.invalidateQuestionnaire();
        }
        this.setState({openClientUserModal: false, showRegisterError: false});
        this.close();
    };

    render() {
        return (
            <ModalContainer>
                {this.renderClientModal()}
                {this.renderClientUserModal()}
                {this.renderClientDataModal()}
            </ModalContainer>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    getClientsByNitOrNameInSystem: (searchTerm, system) => dispatch(getClientsByNitOrNameInSystem(searchTerm, system)),
    getClientUserByClient: value => dispatch(getClientUserByClient(value)),
    saveClientUser: (client, email) => dispatch(saveClientUser(client, email)),
    saveClient: value => dispatch(saveClient(value)),
    saveInterviewedName: value => dispatch(saveInterviewedName(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientVerifier);

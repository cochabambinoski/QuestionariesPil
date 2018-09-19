import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';

class Range extends Component {
    constructor(props) {
        super(props);
        this.addQuestion = this.addQuestion.bind(this);
        this.updateOption = this.updateOption.bind(this);
        this.validateFields = this.validateFields.bind(this);
    }

    validateFields() {
        let emptyOptions = this.props.lsOptions.filter((option) => (option.option === ""));
        if (emptyOptions.length === 0) {
            const min = parseInt(this.props.lsOptions[0].option, 10);
            const max = parseInt(this.props.lsOptions[1].option, 10);
            if (min >= max) {
                this.props.showError("El maximo debe ser mayor al minimo", "");
                return false;
            } else {
                return true;
            }
        } else {
            this.props.showError("Añada rangos", "");
            return false;
        }
    }

    addQuestion() {
        if (this.validateFields())
            this.props.addQuestion();
    }

    updateOption(value, index) {
        this.props.updateOption(value, index);
    }

    componentWillMount() {
        if (this.props.lsOptions.length === 0) {
            this.props.addOption({
                option: '',
                sociedadId: 'BO81',
                usuarioId: this.props.user.username,
                operacionId: 1,
                fechaId: null,
            });
            this.props.addOption({
                option: '',
                sociedadId: 'BO81',
                usuarioId: this.props.user.username,
                operacionId: 1,
                fechaId: null,
            });
        }
    }

    render() {
        return (
            <div className="ui-g" style={{width: '250px', marginBottom: '10px'}}>

                <div className="ui-g">
                    <div className="ui-g-6">
                        <div className="ui-g form-group">
                            {
                                this.props.readOnly ? <div>Minimo: {this.props.lsOptions[0].option}</div> :
                                    <div>
                                        <div className="ui-g-6">
                                            <label htmlFor="input">Minimo</label>
                                        </div>
                                        <div className="ui-g-6">

                                            <InputText value={this.props.lsOptions[0].option} type="text"
                                                       keyfilter="pint"
                                                       onChange={(e) => this.updateOption(e.target.value, 0)}/>

                                        </div>
                                    </div>
                            }
                            {
                                this.props.readOnly ? <div>Maximo: {this.props.lsOptions[1].option}</div> :
                                    <div>
                                        <div className="ui-g-6">
                                            <label htmlFor="input">Maximo</label>
                                        </div>
                                        <div className="ui-g-6">

                                            <InputText value={this.props.lsOptions[1].option} type="text"
                                                       keyfilter="pint"
                                                       onChange={(e) => this.updateOption(e.target.value, 1)}/>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>

                {
                    this.props.readOnly ? <div/> :
                        <div>
                            <span>
                                <Button label="Aceptar" onClick={this.addQuestion}/>
                                <Button label="Cancelar" onClick={this.props.handleClose} className="ui-button-danger"/>
                            </span>
                        </div>
                }
            </div>
        );
    }
}

export default Range
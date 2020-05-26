import React, {Component} from 'react';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Dropdown} from 'primereact/dropdown';
import ButtonAcceptCancel from "./ButtonAcceptCancel";

class FreeAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {option: 'Sin validacion'}
        };
        this.addQuestion = this.addQuestion.bind(this);
        this.updateTypeOption = this.updateTypeOption.bind(this);
        this.addOption = this.addOption.bind(this);
    }

    validateFields(options) {
        let emptyOptions = options.filter((option) => (option.option === ""));
        if (emptyOptions.length === 0)
            this.props.addQuestion();

    }

    addQuestion() {
        this.props.addQuestion();
    }

    addOption() {
        this.props.addOption({
            option: 'Sin validacion',
            sociedadId: 'BO81',
            usuarioId: this.props.user.username,
            operacionId: 1,
            fechaId: null
        });
    }

    updateTypeOption(value, index) {
        this.props.updateOption(value.option, index);
    }

    componentWillMount() {
        if (this.props.lsOptions.length === 0) {
            this.props.addOption({
                option: 'Sin validacion',
                sociedadId: 'BO81',
                usuarioId: this.props.user.username,
                operacionId: 1,
                fechaId: null
            });
        } else {
            this.setState({selected: {option: this.props.lsOptions[0].option}});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selected: {option: nextProps.lsOptions[0].option}});
    }

    render() {
        const validationTypes = [
            {option: 'Sin validacion'},
            {option: 'Texto'},
            {option: 'Numero'},
            {option: 'Decimal'}
        ];
        const {readOnly, lsOptions} = this.props;
        return (
            <div style={{marginBottom: '10px'}}>
                <div>
                    {
                        readOnly ?
                            <div>Tipo de validacion: {lsOptions[0].option}</div> :
                            <div style={{display: 'flex'}}>
                                <Dropdown value={this.state.selected} options={validationTypes}
                                          onChange={(e) => this.updateTypeOption(e.value, 0)}
                                          style={{width: '300px', marginBottom: '20px', marginTop: '20px'}}
                                          placeholder="Seleccione una validacion" optionLabel="option"/>
                            </div>
                    }
                </div>
                {
                    readOnly ? <div/> :
                        <ButtonAcceptCancel addQuestion={this.addQuestion} handleClose={this.props.handleClose}/>
                }
            </div>
        );
    }
}

export default FreeAnswer;

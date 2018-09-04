import React, { Component } from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

class FreeAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            default: { option: 'Sin validacion' },
        }
        this.addQuestion = this.addQuestion.bind(this);
        this.updateTypeOption = this.updateTypeOption.bind(this);
        this.addOption = this.addOption.bind(this);
    }
    validateFields(options) {
        let emptyOptions = options.filter((option) => (option.option == ""));
        if (emptyOptions.length == 0)
            this.props.addQuestion();

    }
    addQuestion() {
        this.props.addQuestion();
    }
    addOption() {
        this.props.addOption({ option: 'Sin validacion' });
    }
    updateTypeOption(value, index) {
        this.props.updateOption(value.option, index);
    }
    componentWillMount(){
        this.props.addOption({ option: 'Sin validacion' });
    }
    render() {
        const validationTypes = [
            { option: 'Sin validacion' },
            { option: 'Texto' },
            { option: 'Numero' },
            { option: 'Decimal' }
        ];
        return (
            <div className="ui-g" style={{ width: '250px', marginBottom: '10px' }}>
                <div>
                    {
                        this.props.readOnly ?
                            <div>{this.props.lsOptions[0].option}</div> :
                            <Dropdown value={this.props.lsOptions[0]} options={validationTypes} onChange={(e) => this.updateTypeOption(e.value, 0)} style={{ width: '300px' }} placeholder="Seleccione una validacion" optionLabel="option" />
                    }
                </div>
                {
                    this.props.readOnly ? <div></div> :
                        <div>
                            <span>
                                <Button label="Aceptar" onClick={this.addQuestion} />
                                <Button label="Cancelar" onClick={this.props.handleClose} className="ui-button-danger" />
                            </span>
                        </div>
                }
            </div>
        );
    }
}

export default FreeAnswer
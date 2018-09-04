import React, { Component } from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

class Image extends Component {
    constructor(props) {
        super(props);
        this.addQuestion = this.addQuestion.bind(this);
    }
    validateFields(options) {
        let emptyOptions = options.filter((option) => (option.option == ""));
        if (emptyOptions.length == 0)
            this.props.addQuestion();

    }
    addQuestion() {
        this.props.addQuestion();
    }
    render() {
        return (
            <div className="ui-g" style={{ width: '250px', marginBottom: '10px' }}>
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

export default Image
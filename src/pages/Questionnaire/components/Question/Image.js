import React, {Component} from 'react';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ButtonAcceptCancel from "./ButtonAcceptCancel";

class Image extends Component {
    constructor(props) {
        super(props);
        this.addQuestion = this.addQuestion.bind(this);
    }

    addQuestion() {
        this.props.addQuestion();
    }

    render() {
        const {readOnly} = this.props;
        return (
            <div className="ui-g" style={{width: '250px', marginTop: '20px'}}>
                {
                    readOnly ? <div/> :
                        <ButtonAcceptCancel addQuestion={this.addQuestion} handleClose={this.props.handleClose}/>
                }
            </div>
        );
    }
}

export default Image

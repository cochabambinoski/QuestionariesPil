import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import Header from "./../PublicQuestionnaires/components/Header";

class AnswerPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header/>
                Componente de respuesta.
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerPageContainer);
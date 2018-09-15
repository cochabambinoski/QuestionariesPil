import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AnswerDetail from "../AnswerDetail/AnswerDetail";
import AnswerList from "../AnswerList/AnswerList";
import Title from "../../../Title/Title";

class AnswerContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentComponent: AnswerList.constructor.name
        }
    }

    changeCurrentComponent(newCurrentComponent){
        this.setState({currentComponent : newCurrentComponent})
    }

    render() {
        return (
            <div>
                <Title tilte={'Encuestas respondidas'}
                       subtitle={'Aqui podra encontrar todas las encuestas respondidas por nuestros clientes.'}/>
                <br/>
                {
                    this.state.currentComponent === AnswerList.constructor.name ?
                        <AnswerList/> :
                        this.state.currentComponent === AnswerDetail.constructor.name ?
                            <AnswerDetail/> : null
                }
            </div>
        );
    }
}

AnswerContainer.propTypes = {

};

export default AnswerContainer;

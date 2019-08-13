import React, {Component, Fragment} from 'react';
import {addTimeout} from "redux-timeout";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from "../../actions";
import {fetchInitialData, getMenuByUser} from "../../actions/indexthunk";
import {getIdUser, getMenu, getUser} from "../../reducers";
import PublicQuestionnaires from "../PublicQuestionnaires/PublicQuestionnairesContainer";
import HomeQuestionnaireContainer from "../homeQuestionnarieModule/HomeQuestionnaireContainer";

class InitialPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadUser: null,
            userIdSvm: null,
        };
        this.getParameterByName = this.getParameterByName.bind(this);
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    componentDidMount() {
        const id = this.getParameterByName('user');
        if (id !== null) {
            this.setState({userIdSvm: id, uploadUser: true});
            this.props.setIdUser(id);
        } else {
            this.setState({uploadUser: false})
        }
    }

    render() {
        let component = null;
        switch (this.state.uploadUser) {
            case true:
                component = <HomeQuestionnaireContainer userIdSvm={this.state.userIdSvm}/>;
                break;
            case false:
                component = <PublicQuestionnaires/>;
                break;
            default:
                return null;
        }
        return (
            this.state.uploadUser === null ?
                <Fragment>
                    <img style={{height: '60%', with: '60%'}} src={require('./../../images/logo.svg')} className="icons"
                         alt="SVM REACT"/>
                </Fragment> :
                <div>
                    {component}
                </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addTimeout: (timeout, action, toDispatch) => {
        dispatch(addTimeout(timeout, action, toDispatch))
    },
    actions: bindActionCreators(actions, dispatch),
    setIdUser: value => dispatch(actions.setIdUser(value)),
    getMenuByUser: value => dispatch(getMenuByUser(value)),
    fetchInitialData: value => dispatch(fetchInitialData(value)),
});

const mapStateToProps = state => (
    {
        idUser: getIdUser(state),
        user: getUser(state),
        idMenu: getMenu(state)
    }
);


export default connect(mapStateToProps, mapDispatchToProps)(InitialPage);

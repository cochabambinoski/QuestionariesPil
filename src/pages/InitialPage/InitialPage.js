import React, {Component, Fragment} from 'react';
import {addTimeout} from "redux-timeout";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from "../../actions";
import {fetchInitialData, getMenuByUser} from "../../actions/indexthunk";
import {getIdUser, getMenu, getUser} from "../../reducers";
import Home from "../Home/pages/Home";
import PublicQuestionnaires from "../PublicQuestionnaires/PublicQuestionnairesContainer";

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
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        const id = decodeURIComponent(results[2].replace(/\+/g, ' '));
        return id;
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
                component = <Home userIdSvm={this.state.userIdSvm}/>;
                break;
            case false:
                component = <PublicQuestionnaires/>;
                break;
        }
        console.log(this.state.uploadUser);
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
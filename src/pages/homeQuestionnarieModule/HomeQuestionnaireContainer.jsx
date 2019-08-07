import React, {Component, Fragment} from 'react';
import {addTimeout, WATCH_ALL} from "redux-timeout";
import {bindActionCreators} from "redux";
import * as actions from "../../actions";
import {connect} from 'react-redux';
import {fetchInitialData, getMenuByUser} from "../../actions/indexthunk";
import {getIdUser, getMenu, getUser} from "../../reducers";
import SplashPage from "../splash/SplashPage";
import HomePage from "./HomePage";
import Constants from "../../Constants";

class HomeQuestionnaireContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: null,
            open: false,
        };
    }

    closeSessionHome = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        window.open(Constants.ROUTE_SVM);
    };

    componentDidMount() {
        this.props.addTimeout(1800000, WATCH_ALL, this.closeSessionHome);
        this.props.getMenuByUser(this.props.userIdSvm).then((response) => {this.setState({menus: response});});
        this.props.fetchInitialData(this.props.userIdSvm);
    }

    render() {
        const {user} = this.props;
        const {menus, open} = this.state;
        let itemsMenu = null;
        if (menus != null) {
            itemsMenu = menus[0]
        }
        return (
            <Fragment>
                {user !== null && menus !== null ? (<HomePage menu={itemsMenu} open={open} handleClose={this.handleClose}/>) : (
                    <SplashPage/>
                )}
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeQuestionnaireContainer);

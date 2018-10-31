import React, {Component, Fragment} from 'react';
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel';
import {AppTopbar} from '../components/AppTopBar/AppTopbar';
import Constants from "../../../Constants";
import classNames from 'classnames';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import '../../../layout/layout.css';
import {connect} from 'react-redux';
import * as actions from '../../../actions'
import {bindActionCreators} from 'redux';
import AppMenuT from "../components/AppMenu/AppMenuT";
import {addTimeout, WATCH_ALL} from 'redux-timeout';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {getIdUser, getMenu, getUser} from "../../../reducers";
import AppInlineProfile from "../components/AppInlineProfile/AppInlineProfile";
import PublicQuestionnaires from "../../PublicQuestionnaires/PublicQuestionnairesContainer";
import {
    getBranches,
    getChargeTypes,
    getCities,
    getMenuByUser,
    getQuestionnaireStateTypes,
    getReachesTypes,
    getSystemsTypes,
    getTypesByClass,
    getUserById
} from "../../../actions/indexthunk";
import {BrowserRouter, Route} from "react-router-dom";
import AnswerContainer from "../../AnswersQuestionnaire/pages/AnswerContainer/AnswerContainer";
import AsigmentQuestionaryContainer from "../../AssignmentScreen/pages/AsigmentQuestionaryContainer";
import QuestionaryContainer from "../../QuestionnairesList/QuestionaryContainer";
import {Start} from "../../Start/Start";
import ListSegment from "../../ListSegments/pages/ListSegments";
import Questionnaire from "../../Questionnaire/pages/Questionnaire/Questionnaire";

class Home extends Component {
    state = {
        open: false,
        close_windows: false,
        idMenuContainer: "1"
    };

    handleChangeContainer = idMenu => {
        this.setState({idMenuContainer: idMenu})
    };

    handleClose = () => {
        window.open(Constants.ROUTE_SVM);
    };

    constructor(props) {
        super(props);
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'light',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menus: []
        };
        this.closeSessionHome = this.closeSessionHome.bind(this);
        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.openMenuComponent = this.openMenuComponent.bind(this);
        this.getParameterByName = this.getParameterByName.bind(this);
    }

    closeSessionHome() {
        this.setState({open: true});
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        const id = decodeURIComponent(results[2].replace(/\+/g, ' '));
        this.props.setIdUser(id);
        return id;
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false,
            })
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (Home.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });

            if (mobileMenuActive)
                Home.removeClass(document.body, 'body-overflow-hidden');
            else
                Home.addClass(document.body, 'body-overflow-hidden');
        }

        event.preventDefault();
    }

    static addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    static removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    static isDesktop() {
        return window.innerWidth > 1024;
    }

    openMenuComponent(menuName) {
        this.growl.show({severity: 'info', summary: 'See' + menuName, detail: ''});
    }

    componentDidMount() {
        this.props.addTimeout(1800000, WATCH_ALL, this.closeSessionHome.bind(this));
        this.props.getMenuByUser(this.getParameterByName('user'))
            .then((response) => {
                this.setState({menus: response});
            });
        this.props.getQuestionnaireStateTypes(Constants.CLASS_NAME_ESTQUEST);
        this.props.getChargeTypes(Constants.CLASS_NAME_CARGOPER);
        this.props.getUserById(this.getParameterByName('user'));
        this.props.getCities();
        this.props.getBranches();
        this.props.getSystemsTypes(Constants.CLASS_NAME_SYSTEM);
        this.props.getReachesTypes(Constants.CLASS_NAME_REACH);
    }

    render() {
        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });
        let sidebarClassName = classNames("layout-sidebar", {'layout-sidebar-dark': this.state.layoutColorMode === 'dark'});
        return (
            <BrowserRouter>
                {/*<Route path="/PublicQuestionnaires" strict exact component={PublicQuestionnaires}/>*/}
                {/*<Route path="/" exact render={Home}/>*/}
                <Fragment>
                    {
                        this.props.user === null ?
                            <PublicQuestionnaires/>
                            :
                            <div className={wrapperClass}>
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description">
                                    <DialogTitle id="alert-dialog-title">{"Sesion Caducada"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Su sesion ha caducado. Por favor cierre esta ventana y vuelva a iniciar su
                                            sesion
                                            en el SVM.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleClose} color="primary" autoFocus>
                                            Aceptar
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                <AppTopbar onToggleMenu={this.onToggleMenu}/>

                                <div className={sidebarClassName}>
                                    <ScrollPanel style={{height: '100%', with: '100%'}}>
                                        <div className="logo"/>
                                        <AppInlineProfile/>
                                        <AppMenuT
                                            menus={this.state.menus}
                                            sessionActive={this.props.sessionActive}
                                            onSelectedMenu={this.handleChangeContainer}/>
                                    </ScrollPanel>
                                </div>
                                <div className="layout-main">
                                    <Route path="" exact component={Start}/>
                                    <Route path="/PublicQuestionnaires" exact component={PublicQuestionnaires}/>
                                    <Route path="/Questionaries" exact component={QuestionaryContainer}/>
                                    <Route path="/Questionaries/New" exact component={Questionnaire}/>
                                    <Route path="/Assigment" exact component={AsigmentQuestionaryContainer}/>
                                    <Route path="/Answers" exact component={AnswerContainer}/>
                                    <Route path="/Segment" exact component={ListSegment}/>
                                </div>
                            </div>
                    }
                </Fragment>
            </BrowserRouter>
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
    getUserById: value => dispatch(getUserById(value)),
    getTypesByClass: value => dispatch(getTypesByClass(value)),
    getCities: value => dispatch(getCities(value)),
    getBranches: value => dispatch(getBranches(value)),
    getQuestionnaireStateTypes: value => dispatch(getQuestionnaireStateTypes(value)),
    getChargeTypes: value => dispatch(getChargeTypes(value)),
    getSystemsTypes: value => dispatch(getSystemsTypes(value)),
    getReachesTypes: value => dispatch(getReachesTypes(value)),
});

const mapStateToProps = state => (
    {
        idUser: getIdUser(state),
        user: getUser(state),
        idMenu: getMenu(state)
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
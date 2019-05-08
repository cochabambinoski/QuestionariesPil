import React, {Component, Fragment} from 'react';
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel';
import {AppTopbar} from '../components/AppTopBar/AppTopbar';
import Constants from "../../../Constants";
import classNames from 'classnames';
import 'primereact/resources/themes/nova-dark/theme.css';
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
import {fetchInitialData, getMenuByUser} from "../../../actions/indexthunk";
import {BrowserRouter, Route} from "react-router-dom";
import AnswerContainer from "../../AnswersQuestionnaire/pages/AnswerContainer/AnswerContainer";
import AsigmentQuestionaryContainer from "../../AssignmentScreen/pages/AsigmentQuestionaryContainer";
import {Start} from "../../Start/Start";
import ListSegment from "../../ListSegments/pages/ListSegments";
import GenerationExpenses from "../../GenerationExpenses/GenerationExpenses"
import Questionnaire from "../../Questionnaire/pages/Questionnaire/Questionnaire";
import SplashPage from "../../SplashPage/SplashPage";
import Questionnaires from "./../../QuestionnairesList/pages/QuestionnairesList";
import AssignmentQuestionary from "../../AssignmentScreen/pages/AssignmentQuestionary";
import GraphicsDetail from "../../AnswersQuestionnaire/pages/GraphicsDetail/GraphicsDetail";
import {Growl} from 'primereact/growl';
import jobsETL from '../../jobsETL/jobsETL'

import {
    answersRoute,
    answersIdRoute,
    assigmentRoute,
    assigmentIdRoute,
    questionariesRoute,
    questionariesEditIdRoute,
    questionariesNewRoute,
    questionariesShowIdRoute,
    segmentRoute,
    expensesGenerationRoute,
    conceptCenterRoute,
    loadBaseInputRoute,
    costConditionsRoute,
    jobsEtlRoute,
    periodAndAccountRegistrationRoute,
    exchangeRateRoute,
    operatingAccountsRoute
} from "../../../routes/PathRoutes";
import LoadBaseInput from "../../LoadBaseInput/LoadBaseInput";
import CostConditions from "../../costConditions/CostConditions";
import PeriodAndAccountRegistration from "../../periodAndAccountRegistration/PeriodAndAccountRegistration";
import ExchangeRate from "../../exchangeRate/ExchangeRate";
import OperatingAccounts from "../../operatingAccounts/OperatingAccounts";
import ConceptCenter from "../../conceptCenter/ConceptCenter";

class Home extends Component {

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
            menus: [],
            title: null,
            detail: null,
            message: null,
            open: false,
            close_windows: false,
            idMenuContainer: "1"
        };
        this.closeSessionHome = this.closeSessionHome.bind(this);
        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.openMenuComponent = this.openMenuComponent.bind(this);
    }

    closeSessionHome() {
        this.setState({open: true});
    }

    onWrapperClick() {
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
            } else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        } else {
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
        this.props.getMenuByUser(this.props.userIdSvm)
            .then((response) => {
                this.setState({menus: response});
            });
        this.props.fetchInitialData(this.props.userIdSvm);
    }

    showMessage = (title, detail) => {
        this.setState({title: title});
        this.setState({detail: detail});
    };

    showSuccess = (title, detail) => {
        this.growl.show({severity: 'success', summary: title, detail: detail});
    };

    handleClick = () => {
        this.setState({open: true});
    };

    renderDialog() {
        return (
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title"
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
        )
    }

    renderContentByRoute() {
        return (
            <div className="layout-main">
                <Growl ref={(el) => this.growl = el}/>
                <Route path="/" exact component={Start}/>
                {/*Questionaries Create Show Edit Delete*/}
                <Route path={questionariesRoute} exact
                       render={(props) => <Questionnaires title={this.state.title}
                                                          detail={this.state.detail}
                                                          showMessage={this.showSuccess}
                                                          {...props}/>}
                />
                <Route path={questionariesNewRoute} exact strict
                       render={(props) => <Questionnaire questionary={null}
                                                         showMessage={this.showSuccess}
                                                         {...props}/>}
                />
                <Route path={questionariesShowIdRoute} exact strict
                       render={props => <Questionnaire questionnaireId={props.match.params.id}
                                                       readOnly={true}
                                                       showMessage={this.showSuccess} {...props}/>}
                />
                <Route path={questionariesEditIdRoute} exact strict
                       render={props => <Questionnaire questionnaireId={props.match.params.id}
                                                       showMessage={this.showSuccess} {...props}/>}
                />
                {/*Assigment Questionnaries*/}

                <Route path={assigmentRoute} exact component={AsigmentQuestionaryContainer}/>
                <Route path={assigmentIdRoute} exact strict
                       render={props => <AssignmentQuestionary
                           idQuestionary={props.match.params.id}
                           onSelectedQuestionary={null}
                           showSuccess={this.showSuccess} {...props}/>}
                />

                {/*Answers Questionnaries*/}
                <Route path={answersRoute} exact component={AnswerContainer}/>
                <Route path={answersIdRoute} exact
                       render={props => <GraphicsDetail
                           idQuestionary={props.match.params.id}
                       />}
                />

                {/*Segment */}
                <Route path={segmentRoute} exact component={ListSegment}/>

                {/*Finanzas */}
                <Route exact path={expensesGenerationRoute} component={GenerationExpenses}/>
                <Route exact path={loadBaseInputRoute} component={LoadBaseInput}/>
                <Route exact path={costConditionsRoute} component={CostConditions}/>
                <Route exact path={periodAndAccountRegistrationRoute} component={PeriodAndAccountRegistration}/>
                <Route exact path={exchangeRateRoute} component={ExchangeRate}/>
                <Route exact path={operatingAccountsRoute} component={OperatingAccounts}/>
                <Route exact path={conceptCenterRoute} component={ConceptCenter}/>
                <Route exact path={jobsEtlRoute} component={jobsETL}/>
            </div>
        )
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
                <Fragment>
                    {
                        this.props.user === null ?
                            <SplashPage/>
                            :
                            <div className={wrapperClass}>
                                {
                                    this.renderDialog()
                                }

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

                                {this.renderContentByRoute()}
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
    fetchInitialData: value => dispatch(fetchInitialData(value)),
});

const mapStateToProps = state => (
    {
        idUser: getIdUser(state),
        user: getUser(state),
        idMenu: getMenu(state)
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

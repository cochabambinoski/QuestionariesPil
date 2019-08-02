import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import Header from "../PublicQuestionnaires/components/Header";
import {getQuetionnaireById} from "../../actions/indexthunk";
import AnswerPage from "./AnswerPage";
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel';
import {QuestionsMenu} from "./QuestionsMenu";
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import classNames from 'classnames';
import {saveClient, saveInterviewedName, setMarkedOptions, triedToSave, updateMarkedOptions} from "../../actions";
import ModalContainer from '../../widgets/Modal/pages/modal';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {Button} from 'primereact/button';

class AnswerPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            menu: null,
            structure: [],
            layoutMode: 'static',
            layoutColorMode: 'light',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            selectedIndex: 0,
            openConfirmationModal: false,
        };
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onWrapperClick = this.onWrapperClick.bind(this);
    }

    componentDidMount = () => {
        this.props.getQuetionnaireById(this.props.questionnaireId)
            .then(response => {
                this.setState({questionnaire: response});
                const structure = this.getQuestionnaireStructure(response.lsQuestions);
                this.createMenu(structure);
            });
    };

    invalidateQuestionnaire = () => {
        this.cleanQuestionnaireAnswers();
        this.props.invalidateQuestionnaire();
    };

    cleanQuestionnaireAnswers = () => {
        this.props.setMarkedOptions({});
        this.props.saveClient(null);
        this.props.saveInterviewedName("");
        this.props.triedToSave(false);
    };

    saveSuccessful = (title, message) => {
        this.cleanQuestionnaireAnswers();
        this.props.showMessageAndInvalidate(title, message, 'success');
        this.handleBackClick();
    };

    handleBackClick = () => {
        this.props.history.goBack();
    };

    saveFailed = (title, message) => {
        this.cleanQuestionnaireAnswers();
        this.props.showMessageAndInvalidate(title, message, 'error');
    };

    getQuestionnaireStructure = (questions) => {
        let finalStructure = [];
        let independentQuestions = [];
        let optionsMap = {};
        questions.forEach(question => {
            if (question.questionOption !== null) {
                optionsMap[question.questionOption.id] = question;
            } else {
                independentQuestions.push(question);
            }
        });
        independentQuestions.forEach(independent => {
            let aux = [];
            this.findAllDependencies(independent, aux, optionsMap);
            finalStructure.push(aux);
        });
        this.setState({structure: finalStructure});
        return finalStructure;
    };

    findAllDependencies = (question, aux, optionsMap) => {
        aux.push(question);
        question.lsQuestionOptions.forEach(option => {
            const dependent = optionsMap[option.id];
            if (dependent !== null && dependent !== undefined)
                this.findAllDependencies(dependent, aux, optionsMap);
        })
    };

    createMenu = structure => {
        const menu = structure.map((questionsList, index) => {
            const independent = questionsList[0];
            return {label: `${independent.question}`, command: () => this.handleMenuClick(index)}
        });
        this.setState({menu});
    };

    handleMenuClick = selectedIndex => {
        this.setState({selectedIndex: selectedIndex});
    };

    onToggleMenu(event) {
        this.menuClick = true;
        if (window.innerWidth > 1024) {
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
                AnswerPageContainer.removeClass(document.body, 'body-overflow-hidden');
            else
                AnswerPageContainer.addClass(document.body, 'body-overflow-hidden');
        }

        event.preventDefault();
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

    onSidebarClick(event) {
        this.menuClick = true;
        setTimeout(() => {
            this.layoutMenuScroller.moveBar();
        }, 500);
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
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

    renderConfirmationDialog() {
        return (
            <Dialog
                open={this.state.openConfirmationModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <div className="dialog-background">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" className="dialog-client-body">
                            <div>
                                <div style={{fontWeight: 'bold', marginBottom: '15px', fontSize: '3vh'}}>Salir del cuestionario</div>
                                <div style={{marginBottom: '15px'}}>Esta seguro de que quiere salir del cuestionario sin
                                    guardar?
                                </div>
                                <DialogActions>
                                    <Button label="Salir" onClick={() => {
                                        this.invalidateQuestionnaire()
                                    }} className="blue-button" style={{margin: '5px'}}/>
                                    <Button label="Cancelar" onClick={() => {
                                        this.setState({openConfirmationModal: false})
                                    }} className="red-button" style={{margin: '5px'}}/>
                                </DialogActions>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </div>
            </Dialog>
        );
    };

    openConfirmationDialog = () => {
        this.setState({openConfirmationModal: true});
    };

    render() {
        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });
        // noinspection JSUnusedGlobalSymbols
        return (
            <div className="container-background">
                <ModalContainer>
                    {this.renderConfirmationDialog()}
                </ModalContainer>
                {
                    this.state.questionnaire ?
                        <div className={wrapperClass} style={{overflow: 'auto'}}>
                            <Header title={this.state.questionnaire.name}
                                    subtitle={this.state.questionnaire.description}
                                    onToggleMenu={this.onToggleMenu}/>

                            <div ref={(el) => this.sidebar = el} className='layout-sidebar navigation-drawer'
                                 onClick={this.onSidebarClick}>
                                <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height: '100%'}}>
                                    <div className="layout-sidebar-scroll-content">
                                        <QuestionsMenu model={this.state.menu} onMenuItemClick={this.onMenuItemClick}
                                        />
                                    </div>
                                </ScrollPanel>
                            </div>


                            <div className="layout-main main">
                                <AnswerPage questionnaire={this.state.questionnaire}
                                            saveSuccessful={this.saveSuccessful}
                                            saveFailed={this.saveFailed}
                                            invalidateQuestionnaire={this.props.invalidateQuestionnaire}
                                            openConfirmationDialog={this.openConfirmationDialog}
                                            structure={this.state.structure}
                                            handleMenuClick={this.handleMenuClick}
                                            selectedIndex={this.state.selectedIndex}/>
                            </div>
                        </div> : <div>Cargando...</div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    getQuetionnaireById: value => dispatch(getQuetionnaireById(value)),
    updateMarkedOptions: value => dispatch(updateMarkedOptions(value)),
    setMarkedOptions: value => dispatch(setMarkedOptions(value)),
    saveClient: value => dispatch(saveClient(value)),
    saveInterviewedName: value => dispatch(saveInterviewedName(value)),
    triedToSave: value => dispatch(triedToSave(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerPageContainer);

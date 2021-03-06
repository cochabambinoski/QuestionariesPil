import React, {Component} from 'react';
import Questionary from "../questionnarie/Questionnaire";
import './styles.scss'
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import {withStyles} from "@material-ui/core";
import {connect} from 'react-redux';
import {getQueryQuestionerAssigment, getQuestionnaries} from "../../../../../../reducers";
import {fetchGetQuestionaries} from "../../../../../../actions/indexthunk";
import ModalContainer from "../../../../../../components/modal/modal";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {Button} from "primereact/button";

const styles = theme => ({
    root: {
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 800,
        marginBottom: 5,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});


class QuestionaryAsignmet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionnaires: null,
            enabledForAssignment: true,
        }
    }

    componentDidMount() {
        this.props.fetchGetQuestionaries();
    }

    filterItems = (questionaries, query) => {
        return questionaries.filter((el) =>
            el.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };

    onSelectedQuestionary = (questionnaire) => {
        if (questionnaire.system !== null && questionnaire.system.nombre === 'POS') {
            this.setState({enabledForAssignment: false});
        } else {
            this.props.onSelectedQuestionary(questionnaire);
        }
    };

    renderModal() {
        return (< ModalContainer>
            <Dialog
                open={!this.state.enabledForAssignment}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" className="titleBody">
                    <h1 className="dialogTitle">Informaci??n</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="dialogBody"
                                       style={{textAlign: 'center'}}>
                        <div style={{marginBottom: '20px'}}>El cuestionario no requiere asignaci??n.</div>
                        <Button label="OK" onClick={() => this.setState({enabledForAssignment: true})}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </ModalContainer>);
    };

    stringToComponent(questionaries) {
        let filterList = questionaries;
        if (this.props.queryMobileSeller !== "") {
            filterList = this.filterItems(questionaries, this.props.queryQuestionaerAssigment);
        }
        return <List className="list" subheader={<li/>}>
            {
                filterList.map((questionary) => (
                    <Questionary questionary={questionary} key={questionary.id}
                                 onSelectedQuestionaryClick={this.onSelectedQuestionary}
                                 parentComponent={QuestionaryAsignmet.name}/>
                ))
            }
        </List>
    };

    render() {
        const questionnaires = this.props.questionnaires;
        return (
            <div>
                {this.renderModal()}
                {
                    questionnaires ? this.stringToComponent(questionnaires) : <CircularProgress style={{width: '50%', height: '50%'}}/>
                }
            </div>
        );
    }
}

QuestionaryAsignmet.propTypes = {
    onSelectedQuestionary: PropTypes.func,
};

const mapStateToProps = state => ({
    queryQuestionaerAssigment: getQueryQuestionerAssigment(state),
    questionnaires: getQuestionnaries(state),
});

const mapDispatchToProps = dispatch => ({
    fetchGetQuestionaries: () => dispatch(fetchGetQuestionaries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(QuestionaryAsignmet));

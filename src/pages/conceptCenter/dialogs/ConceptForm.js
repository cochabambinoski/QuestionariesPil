import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {createConceptServerBi, updateConceptServerBi} from "../../../actions/indexthunk";
import TextField from "@material-ui/core/TextField/TextField";
import {withStyles} from "@material-ui/core";
import JsxStyles from "../../../styles/JsxStyles";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Title from "../../Title/Title";
import Button from "@material-ui/core/Button/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel"
import {getConcepts} from "../../../reducers";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: 'relative',
        minHeight: 200
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class ConceptForm extends Component {

    constructor(props) {
        super(props);
        let concept = props.concept;
        this.state = {
            id: concept.id,
            name: concept.name,
            abbreviation: concept.abbreviation,
            disabled: true,
            process: 1
        }
    };

    componentDidMount() {
        console.log(this.props);
        if (this.props.concept === 0) {
            this.setState({disabled: false});
        }
    }

    shouldComponentUpdate(next_props, next_state) {
        return true;
    }

    createConcept = (data) => {
        this.props.createConcept(data)
            .then((response) => {
                let state = response;
                console.log(response, state);
                if (state === null || state === undefined) {
                    if (state === 2) {
                        this.setState({process: 1});
                        this.props.onClose(state);
                    }
                } else {
                    this.setState({process: state});
                    this.props.onClose(state);
                }
            });
    };

    updateConcept = (data) => {
        this.props.updateConcept(data)
            .then((response) => {
                let state = response;
                console.log(response, state);
                if (state === null || state === undefined) {
                    if (state === 2) {
                        this.setState({process: 1});
                        this.props.onClose(state);
                    }
                } else {
                    this.setState({process: state});
                    this.props.onClose(state);
                }
            });
    };

    setConcept = (data) => {
        if (this.props.concept === 0)
            this.createConcept(data);
        else
            this.updateConcept(data);
    };

    handleSaveConcept = () => {
        if (this.state.id !== null && this.state.name !== null && this.state.abbreviation !== null) {
            this.setState({process: 0});
            this.setConcept({
                "id": this.state.id,
                "name": this.state.name,
                "abbreviation": this.state.abbreviation
            });
        }
    };

    renderForm() {
        console.log(this.props);
        const {classes} = this.props;
        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        required
                        disabled={this.state.disabled}
                        id="id"
                        label="Id"
                        errorText="This field is required"
                        className={classes.textField}
                        margin="normal"
                        value={this.state.id}
                        onChange={(e) => this.setState({id: e.target.value})}/>
                    <TextField
                        required
                        id="name"
                        label="Nombre"
                        errorText="This field is required"
                        className={classes.textField}
                        margin="normal"
                        rows="4"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}/>
                    <TextField
                        required
                        id="abbreviation"
                        label="Abreviatura"
                        className={classes.textField}
                        margin="normal"
                        value={this.state.abbreviation}
                        onChange={(e) => this.setState({abbreviation: e.target.value})}/>
                </form>
                <div className="row between-xs" style={{padding: '0.5em'}}>
                    <div className="col-auto">
                        <div className="box">
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={event => this.handleSaveConcept(event)}>
                                <SaveIcon className={classes.leftIcon}/>
                                Guardar
                            </Button>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="box">
                            <Button variant="contained" color="default" className={classes.button}
                                    onClick={this.props.onClose}>
                                <CancelIcon className={classes.leftIcon}/>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {process} = this.state;
        return (
            <div>
                <Title tilte={this.state.title} subtitle={this.state.subtitle}/>
                {
                    process ? this.renderForm() :
                        <CircularProgress size={500} style={{color: '#2196f3'[200]}} thickness={5}/>
                }
            </div>
        );
    }
}

ConceptForm.propTypes = {
    classes: PropTypes.object.isRequired,
    concept: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    reducerVariable: getConcepts(state) //no tocar
});

const mapDispatchToProps = dispatch => ({
    createConcept: concept => dispatch(createConceptServerBi(concept)),
    updateConcept: concept => dispatch(updateConceptServerBi(concept))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, JsxStyles)(ConceptForm));
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {createTypeServerBi, getAllConceptsBi, updateTypeServerBi} from "../../../actions/indexthunk";
import TextField from "@material-ui/core/TextField/TextField";
import {withStyles} from "@material-ui/core";
import JsxStyles from "../../../styles/JsxStyles";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Title from "../../Title/Title";
import Button from "@material-ui/core/Button/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel"
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
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
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: 'relative',
        minHeight: 200,
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
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class ConceptForm extends Component {

    constructor(props) {
        super(props);
        let type = props.type;
        this.state = {
            id: type.id,
            idConcept: type.idConcept,
            codeType: type.codeType,
            name: type.name,
            abbreviation: type.abbreviation,
            disabled: true,
            process: 1,
            concepts: [],
            concept: null,
            labelWidth: 0,
        };
    };

    componentWillMount() {
        this.chargeList();
        if (this.props.concept === 0) {
            this.setState({disabled: false});
        }
        let type = this.props.type;
        if (type !== 0) {
            this.setState({concept: type.idConcept});
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {concepts} = nextProps.reducerVariable;
        console.log(concepts);
        if (concepts !== null && this.state.concepts.length === 0) {
            console.log(concepts);
            this.setState({concepts: concepts});
        }
        return true;
    }

    chargeList = () => {
        this.props.getAllConcepts();
    };

    createType = (data) => {
        this.props.createType(data);
        this.props.onClose(1);
    };

    updateType = (data) => {
        this.props.updateType(data);
        this.props.onClose(1);
    };

    closeType = () => {
        this.props.onClose(0);
    };

    setType = (data) => {
        if (this.props.type === 0)
            this.createType(data);
        else
            this.updateType(data);
    };

    handleSaveConcept = () => {
        if (this.state.id !== null && this.state.single !== null && this.state.codeType !== null && this.state.name !== null && this.state.abbreviation !== null) {
            this.setState({process: 0});
            this.setType({
                "id": this.state.id,
                "idConcept": this.state.idConcept,
                "codeType": this.state.codeType,
                "name": this.state.name,
                "abbreviation": this.state.abbreviation
            });
        }
    };

    handleChange = event => {
        this.setState({idConcept: event.target.value});
    };

    renderOptions() {
        console.log(this.state.concepts);
        return this.state.concepts.map((concepts, i) => {
            return (
                <MenuItem
                    label="Select a country"
                    value={concepts.id}
                    key={i} name={concepts.name}>{concepts.name}</MenuItem>

            );
        });
    }

    renderForm() {
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
                        label="Codigo Tipo"
                        errorText="This field is required"
                        className={classes.textField}
                        margin="normal"
                        rows="4"
                        value={this.state.codeType}
                        onChange={(e) => this.setState({codeType: e.target.value})}/>
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
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Conceptos</InputLabel>
                        <Select
                            className={classes.textField}
                            value={this.state.idConcept}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'name',
                                id: 'id',
                            }}
                        >
                            {this.renderOptions()}
                        </Select>
                    </FormControl>
                </form>
                <div
                    className="row between-xs"
                    style={{padding: '0.5em'}}>
                    <div
                        className="col-auto">
                        <div
                            className="box">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={event => this.handleSaveConcept(event)}>
                                <SaveIcon
                                    className={classes.leftIcon}/>
                                Guardar
                            </Button>
                        </div>
                    </div>
                    <div
                        className="col-auto">
                        <div
                            className="box">
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                onClick={this.closeType}>
                                <CancelIcon
                                    className={classes.leftIcon}/>
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
    createType: concept => dispatch(createTypeServerBi(concept)),
    updateType: concept => dispatch(updateTypeServerBi(concept)),
    getAllConcepts: () => dispatch(getAllConceptsBi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, JsxStyles)(ConceptForm));
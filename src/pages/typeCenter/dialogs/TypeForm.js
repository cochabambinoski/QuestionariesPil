import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {createTypeBi, getAllConceptsBi, updateTypeBi} from "../../../actions/indexthunk";
import TextField from "@material-ui/core/TextField/TextField";
import {withStyles} from "@material-ui/core";
import JsxStyles from "../../../styles/JsxStyles";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Title from "../../Title/Title";
import Button from "@material-ui/core/Button/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel"
import NoSsr from '@material-ui/core/NoSsr';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from 'react-select';
import {emphasize} from '@material-ui/core/styles/colorManipulator';

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
    textSelect: {
        position: 'absolute',
        width: 500,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {},
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({inputRef, ...props}) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class ConceptForm extends Component {

    constructor(props) {
        console.log(props);
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
            suggestion: [],
            single: null,
        }
    };

    componentDidMount() {
        console.log(this.props);
        this.chargeList();
        if (this.props.concept === 0) {
            this.setState({disabled: false});
        }
    }

    chargeList = () => {
        this.props.getAllConcepts()
            .then((data) => {
                console.log(data);
                this.setState(() => ({
                    concepts: data
                }));
            });
    };

    shouldComponentUpdate(next_props, next_state) {
        return true;
    }

    createType = (data) => {
        this.props.createType(data)
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

    updateType = (data) => {
        this.props.updateType(data)
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
                "idConcept": this.state.single.value,
                "codeType": this.state.codeType,
                "name": this.state.name,
                "abbreviation": this.state.abbreviation
            });
        }
    };

    handleChange = name => value => {
        this.setState({
            [name]: value,
        });
    };

    renderForm() {
        console.log(this.props);
        const {classes} = this.props;
        console.log(this.state.concepts);
        const selectStyles = {
            input: base => ({
                ...base,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        const suggestions = this.state.concepts.map(concepts => ({
            value: concepts.id,
            label: concepts.name,
        }));
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
                        onChange={(e) => this.setState({name: e.target.value})}/>
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
                    <NoSsr>
                        <Select
                            classes={classes.textSelect}
                            styles={selectStyles}
                            options={suggestions}
                            components={components}
                            value={this.state.single}
                            onChange={this.handleChange('single')}
                            isClearable
                            textFieldProps={{
                                label: 'Concepto',
                                InputLabelProps: {
                                    shrink: true,
                                },
                            }}
                        />
                    </NoSsr>
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
                                onClick={this.props.onClose}>
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

const mapDispatchToProps = dispatch => ({
    createType: concept => dispatch(createTypeBi(concept)),
    updateType: concept => dispatch(updateTypeBi(concept)),
    getAllConcepts: () => dispatch(getAllConceptsBi()),
});

export default connect(null, mapDispatchToProps)(withStyles(styles, JsxStyles)(ConceptForm));
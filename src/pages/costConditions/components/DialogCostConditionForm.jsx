import React, {Component} from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Button from "@material-ui/core/es/Button/Button";
import IconSave from "@material-ui/icons/Save";
import IconDelete from "@material-ui/icons/Delete";
import IconCancel from "@material-ui/icons/Cancel";
import Title from "../../Title/Title";
import {deleteCenterCostConditionServerBi, updateCenterCostConditionSeverBi} from "../../../actions/indexthunk";
import JsxStyles from "../../../styles/JsxStyles";
import withStyles from "@material-ui/core/es/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import * as PropTypes from "prop-types";

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
    }
});

class DialogCostConditionForm extends Component {

    constructor(props) {
        super(props);
        const {item} = props;
        if (item) {
            this.state = {
                costCondition: item,
                id: item.id,
                business: item.business,
                centerCost: item.centerCost,
                channel: item.channel,
                lineCost: item.lineCost,
                organization: item.organization,
                region: item.region,
                subRegion: item.subRegion,
                title: 'Edición o Elimninación',
                subtitle:'',
                toDelete: null,
            }
        }
    }

    handleCancel = () => {
        this.props.onClose();
    };

    handleSave = () => {
        this.props.updateCenterCostCondition(this.state.costCondition).then((response) => {
            let state = response;
            if (state === null || state === undefined) {
                if (state === 2) {
                    this.setState({process: 1});
                    this.props.onClose(false);
                }
            } else {
                this.setState({process: state});
                this.props.onClose(false);
            }
        });
    };

    handleDeleteClick = () => {
        this.props.deleteCenterCostCondition(this.state.id)
            .then((response) => {
                let state = response;
                if (state === null || state === undefined) {
                    if (state === 2) {
                        this.setState({process: 1});
                        this.props.onClose(false);
                    }
                } else {
                    this.setState({process: state});
                    this.props.onClose(false);
                }
            });
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {
        const {business, centerCost, channel, lineCost, organization, region, subRegion, classes} = this.props;
        return (
            <div>
                <div>
                    <Title title={this.state.title} subtitle={this.state.subtitle}/>
                </div>
                <div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            disabled
                            id={'standard-disabled'}
                            label={'Id'}
                            defaultValue={this.state.id}
                            margin={"normal"}/>
                        <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                            <InputLabel>Centro de Costo</InputLabel>
                            <Select
                                value={this.state.centerCost}
                                onChange={this.handleChange}
                                inputProps={{name: 'centerCost'}}>
                                {centerCost.map(item => {
                                    return <MenuItem value={item.id}>{item.code + " " + item.center}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                            <InputLabel>Negocio</InputLabel>
                            <Select
                                value={this.state.business}
                                onChange={this.handleChange}
                                inputProps={{name: 'business'}}>
                                {business.map(item => {
                                    return <MenuItem value={item.id}>{item.business}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                            <InputLabel>Linea</InputLabel>
                            <Select
                                value={this.state.lineCost}
                                onChange={this.handleChange}
                                inputProps={{name: 'lineCost'}}>
                                {lineCost.map(item => {
                                    return <MenuItem value={item.id}>{item.line}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                            <InputLabel>Organización</InputLabel>
                            <Select
                                value={this.state.organization}
                                onChange={this.handleChange}
                                inputProps={{name: 'organization'}}>
                                {organization.map(item => {
                                    return <MenuItem value={item.id}>{item.organization}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                            <InputLabel>Canal</InputLabel>
                            <Select
                                value={this.state.channel}
                                onChange={this.handleChange}
                                inputProps={{name: 'channel'}}>
                                {channel.map(item => {
                                    return <MenuItem value={item.id}>{item.channel}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                            <InputLabel>Region</InputLabel>
                            <Select
                                value={this.state.region}
                                onChange={this.handleChange}
                                inputProps={{name: 'region'}}>
                                {region.map(item => {
                                    return <MenuItem value={item.id}>{item.region}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                            <InputLabel>SubRegion</InputLabel>
                            <Select
                                value={this.state.subRegion}
                                onChange={this.handleChange}
                                inputProps={{name: 'subRegion'}}>
                                {subRegion.map(item => {
                                    return <MenuItem value={item.id}>{item.subRegion}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </form>
                </div>
                <Toolbar>
                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={this.handleSave}>
                        <IconSave/>
                        Guardar
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={this.handleDeleteClick}>
                        <IconDelete/>
                        Eliminar
                    </Button>
                    <Button variant="contained" color="default" className={classes.button}
                            onClick={this.props.onClose}>
                        <IconCancel className={classes.leftIcon}/>
                        Cancelar
                    </Button>
                </Toolbar>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    deleteCenterCostCondition: (id) => dispatch(deleteCenterCostConditionServerBi(id)),
    updateCenterCostCondition: (costCondition) => dispatch(updateCenterCostConditionSeverBi(costCondition)),
});

DialogCostConditionForm.propTypes = {
    classes: PropTypes.object.isRequired,
    concept: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(styles, JsxStyles)(DialogCostConditionForm));

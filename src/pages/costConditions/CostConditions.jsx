import React, {Component} from 'react';
import JsxStyles from '../../styles/JsxStyles';
import {withStyles} from '@material-ui/core/styles';
import {Messages} from 'primereact/messages';
import Paper from "@material-ui/core/es/Paper/Paper";
import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableFooter from "@material-ui/core/es/TableFooter/TableFooter";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TablePagination from "@material-ui/core/es/TablePagination/TablePagination";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import connect from "react-redux/es/connect/connect";
import {centerCostConditions, getCreateCenterMasterAndCost} from "../../reducers";
import {
    createCenterCostConditionServerBi,
    filterDataCenterCostConditionServerBi,
    getInitialDataCenterCostConditionServerBi
} from "../../actions/indexthunk";
import Button from "@material-ui/core/es/Button";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import ModalGeneric from "../../components/modal/components/ModalGeneric";
import DialogCostConditionForm from "./components/DialogCostConditionForm";
import CostCondition from "../../models/CostCondition";
import Title from "../Title/Title";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import IconFilterList from "@material-ui/icons/FilterList";
import IconSave from "@material-ui/icons/Save";
import IconClear from "@material-ui/icons/Clear";
import classNames from 'classnames';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});


class CostConditions extends Component {

    constructor(props) {
        super(props);
        const itemDefault = new CostCondition();
        this.state = {
            title: "Centro de Costo Condiciones",
            subtitle: "Generaci??n de condiciones",
            page: 0,
            open: false,
            itemSelected: itemDefault,
            rowsPerPage: 5,
            id: null,
            business: 0,
            centerCost: 0,
            channel: 0,
            lineCost: 0,
            organization: 0,
            region: 0,
            subRegion: 0
        };
    }

    componentWillMount() {
        this.props.initialDataCenterCostConditionServerBi()
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        let conditions = nextProps.reducerVariable;
        if (conditions.centerCost !== undefined && conditions.centerCost.length > 0 && this.state.centerCost === 0) {
            this.setState({centerCost: conditions.centerCost[0].id});
            this.props.filterCenterCostConditionServerBi(conditions.centerCost[0].id, 0, 0, 0, 0, 0, 0)
        }
    }

    showSuccess = (title, message) => {
        this.messages.show({life: 5000, severity: 'success', summary: title, detail: message});
    };

    showInfo = (title, message) => {
        this.messages.show({life: 5000, severity: 'info', summary: title, detail: message});
    };

    showWarn = (title, message) => {
        this.messages.show({life: 5000, severity: 'warn', summary: title, detail: message});
    };

    showError = (title, message) => {
        this.messages.show({life: 5000, severity: 'error', summary: title, detail: message});
    };

    showResponse = (response) => {
        if (response === 1)
            this.showSuccess('Procesado', 'La transacci??n se realiz?? correctamente');
        else if (response === 3)
            this.showWarn('No Procesado', 'El concepto no se guardo porque ya existe uno registrado con similares datos');
        else
            this.showError('Error', 'Ocurri?? un error al procesar la transacci??n');

    };

    handleChangePage = (event, page) => {
        this.setState({page})
    };

    handleChangeRowsPerPage = event => {
        this.setState({page: 0, rowsPerPage: event.target.value})
    };

    handleFilter = () => {
        if (this.state.centerCost > 0) {
            this.props.filterCenterCostConditionServerBi(this.state.centerCost, this.state.business, this.state.lineCost, this.state.organization, this.state.channel, this.state.region, this.state.subRegion);
        } else
            this.showInfo("Filtro", "Debe tener Centro costo para poder filtrar la lista")
    };

    handleClean = () => {
        this.setState({
            business: 0,
            channel: 0,
            lineCost: 0,
            organization: 0,
            region: 0,
            subRegion: 0
        });
    };

    handleCreate = () => {
        if (this.state.centerCost > 0 && this.state.business > 0 && this.state.lineCost > 0 && this.state.channel > 0 && this.state.organization > 0 && this.state.region > 0 && this.state.subRegion > 0) {
            this.props.createCenterCostConditionServerBi(this.state.centerCost, this.state.business, this.state.lineCost, this.state.channel, this.state.organization, this.state.region, this.state.subRegion)
                .then((response) => {
                    let state = response;
                    if (state !== null || state !== undefined) {
                        this.showResponse(state);
                        if (state === 1) {
                            this.setState({
                                business: 0,
                                channel: 0,
                                lineCost: 0,
                                organization: 0,
                                region: 0,
                                subRegion: 0
                            });
                        }
                    }
                });
        } else this.showInfo("No guardado", "Debe elegir todas las opciones para poder guardar")
    };

    renderError() {
        const status = this.props.reduxVariable.errorRequest.status;
        return (
            <React.Fragment>
                <h1> Error {status}</h1>
                <Button color={"primary"} variant="contained" style={{background: "red"}}
                        onClick={this.props.cleanResponse}>Aceptar</Button>
            </React.Fragment>
        )
    }

    handleCloseDialogEditItem = () => {
        this.setState({open: false, itemSelected: null});
        this.setState({
            business: 0,
            channel: 0,
            lineCost: 0,
            organization: 0,
            region: 0,
            subRegion: 0
        });
        this.props.filterCenterCostConditionServerBi(this.state.centerCost, 0, 0, 0, 0, 0, 0)
    };

    handleOpenClickItem = (item) => {
        let itemSelected = {
            id: item[0],
            centerCost: item[1],
            business: item[3],
            lineCost: item[5],
            organization: item[7],
            channel: item[9],
            region: item[11],
            subRegion: item[13]
        };
        this.setState({open: true, itemSelected: itemSelected})
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    renderForm() {
        const {
            business, centerCost,
            channel, lineCost, organization, region, subRegion
        } = this.props.reducerVariable;
        return (
            <div>
                <ModalGeneric open={this.state.open} onClose={this.handleCloseDialogEditItem}>
                    <DialogCostConditionForm
                        item={this.state.itemSelected}
                        business={business}
                        centerCost={centerCost}
                        channel={channel}
                        lineCost={lineCost}
                        organization={organization}
                        region={region}
                        subRegion={subRegion}
                        onClose={this.handleCloseDialogEditItem}/>
                </ModalGeneric>
            </div>
        )
    }

    renderFilter() {
        const {
            business, centerCost,
            channel, lineCost, organization, region, subRegion
        } = this.props.reducerVariable;
        return (
            <div>
                <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                    <InputLabel>Centro de Costo</InputLabel>
                    <Select
                        value={this.state.centerCost}
                        onChange={this.handleChange}
                        inputProps={{name: 'centerCost'}}>
                        {centerCost === undefined ? [] : centerCost.map(item => {
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
                        {business === undefined ? [] : business.map(item => {
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
                        {lineCost === undefined ? [] : lineCost.map(item => {
                            return <MenuItem value={item.id}>{item.line}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                    <InputLabel>Organizaci??n</InputLabel>
                    <Select
                        value={this.state.organization}
                        onChange={this.handleChange}
                        inputProps={{name: 'organization'}}>
                        {organization === undefined ? [] : organization.map(item => {
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
                        {channel === undefined ? [] : channel.map(item => {
                            return <MenuItem value={item.id}>{item.channel}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                    <InputLabel>Regi??n</InputLabel>
                    <Select
                        value={this.state.region}
                        onChange={this.handleChange}
                        inputProps={{name: 'region'}}>
                        {region === undefined ? [] : region.map(item => {
                            return <MenuItem value={item.id}>{item.region}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                    <InputLabel>Subregi??n</InputLabel>
                    <Select
                        value={this.state.subRegion}
                        onChange={this.handleChange}
                        inputProps={{name: 'subRegion'}}>
                        {subRegion === undefined ? [] : subRegion.map(item => {
                            return <MenuItem value={item.id}>{item.subRegion}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        )
    }

    renderTable() {
        const {classes} = this.props;
        const {centerCostConditions} = this.props.reducerCostCondition;
        const {rowsPerPage, page} = this.state;
        if (this.props.reducerCostCondition.errorRequest) {
            return this.renderError()
        }
        return (
            <div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>ID</CustomTableCell>
                                    <CustomTableCell align="left">Centro Costo </CustomTableCell>
                                    <CustomTableCell align="left">Negocio</CustomTableCell>
                                    <CustomTableCell align="left">Linea </CustomTableCell>
                                    <CustomTableCell align="left">Organizaci??n</CustomTableCell>
                                    <CustomTableCell align="left">Canal</CustomTableCell>
                                    <CustomTableCell align="left">Regi??n </CustomTableCell>
                                    <CustomTableCell align="left">Sub-Regi??n </CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {centerCostConditions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                                    <TableRow hover onClick={() => this.handleOpenClickItem(item)}
                                              key={item[0]}>
                                        <TableCell component={"th"} scope={"row"}>{item[0]}</TableCell>
                                        <TableCell>{item[2]}</TableCell>
                                        <TableCell>{item[4]}</TableCell>
                                        <TableCell>{item[6]}</TableCell>
                                        <TableCell>{item[8]}</TableCell>
                                        <TableCell>{item[10]}</TableCell>
                                        <TableCell>{item[12]}</TableCell>
                                        <TableCell>{item[14]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={centerCostConditions.length}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        page={page}
                                        rowsPerPage={rowsPerPage}/>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>
            </div>
        )
    }

    render() {
        const {classes} = this.props;
        const {load} = this.props.reducerVariable;
        if (this.props.reducerVariable.errorRequest) {
            return this.renderError()
        }
        return (
            <div>
                <div>
                    {this.renderForm()}
                    <div>
                        <Title title={this.state.title} subtitle={this.state.subtitle}/>
                    </div>
                    <div>
                        <Messages ref={(el) => this.messages = el}/>
                    </div>
                </div>
                {
                    load ?
                        <CircularProgress size={500} style={{
                            color: '#03A8E4'[200],
                            marginTop: '1em',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} thickness={5}/> :
                        <div>
                            <Toolbar style={{background: '#FFFFFF', marginTop: '1em'}}>
                                {this.renderFilter()}
                                <Button variant="contained" color={"secondary"} className={classes.button}
                                        onClick={this.handleClean}>
                                    <IconClear/>
                                </Button>
                                <Button variant="contained" color={"default"} className={classes.button}
                                        onClick={this.handleFilter}>
                                    <IconFilterList className={classNames(classes.leftIcon, classes.iconSmall)}/>
                                    Filtrar
                                </Button>
                                <Button variant="contained" color={"primary"} className={classes.button}
                                        onClick={this.handleCreate}>
                                    <IconSave className={classNames(classes.leftIcon, classes.iconSmall)}/>
                                    Crear
                                </Button>
                            </Toolbar>
                            {this.renderTable()}
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reducerVariable: getCreateCenterMasterAndCost(state),
    reducerCostCondition: centerCostConditions(state)
});

const mapDispatchToProps = dispatch => ({
    createCenterCostConditionServerBi: (center, business, line, organization, channel, region, subRegion) => dispatch(createCenterCostConditionServerBi(center, business, line, organization, channel, region, subRegion)),
    initialDataCenterCostConditionServerBi: () => dispatch(getInitialDataCenterCostConditionServerBi()),
    filterCenterCostConditionServerBi: (center, business, line, organization, channel, region, subRegion) => dispatch(filterDataCenterCostConditionServerBi(center, business, line, organization, channel, region, subRegion))

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, JsxStyles)(CostConditions));

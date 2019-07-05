import React, {Component} from 'react';
import classNames from 'classnames';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Paper from "@material-ui/core/es/Paper/Paper";
import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableFooter from "@material-ui/core/es/TableFooter/TableFooter";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TablePagination from "@material-ui/core/es/TablePagination/TablePagination";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import withStyles from "@material-ui/core/es/styles/withStyles";
import JsxStyles from "../../styles/JsxStyles";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/es/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";
import {Messages} from "primereact/messages";
import Title from "../Title/Title";
import AnswerDialog from "./dialogs/AnswerDialog";
import {getProcessConfirmation, parameters} from "../../reducers";
import {getMasterParametersServerBi} from "../../actions/indexthunk";
import {changeStateParameter, cleanRequestResponse} from "../../actions";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        backgroundColor: "#8bc34a",
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class MasterJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Centro Condiciones de costo",
            subtitle: "Generación de condiciones de costo",
            page: 0,
            selectedDate: new Date(),
            itemSelected: null,
            rowsPerPage: 5,
            parameters: this.props.parameter,
            parameter: null,
            answerOpen: false,
            toExecute: false,
            position : -1
        }
    }

    componentDidMount() {
        this.getInitialData();
    }

    getInitialData = () => {
        this.props.getMasterParametersServerBi()
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
    }

    showSuccess = (title, message) => {
        this.messages.show({life: 5000, severity: 'success', summary: title, detail: message});
    };

    showError = (title, message) => {
        this.messages.show({life: 5000, severity: 'error', summary: title, detail: message});
    };

    handleExecuteClick = () => {
        this.setState({answerOpen: false});
        this.props.jobEtl(this.state.toExecute.code);
        this.props.changeState(this.state.position);
    };

    handleDateChange = () => {
        this.getInitialData();
    };

    handleChangePage = (event, page) => {
        this.setState({page})
    };

    handleChangeRowsPerPage = event => {
        this.setState({page: 0, rowsPerPage: event.target.value})
    };

    handleAnswer = (event, item, index) => {
        this.setState({answerOpen: true, toExecute: item, position: index})
    };

    handleClose = () => {
        this.setState({answerOpen: false, toExecute: null});
    };

    showResponse() {
        if (this.props.execute.errorRequest !== null && this.props.execute.responseRequest === null) {
            this.showError('Error', 'Ocurrió un error al procesar la transacción');
        } else if (this.props.execute.errorRequest === null) {
            const {codeResult} = this.props.execute.jobExectute;
            if (codeResult !== null) {
                if (codeResult === 1) {
                    this.showSuccess('Procesado', 'La transacción se realizó correctamente');
                    this.props.cleanRequestResponse();
                    this.getInitialData()
                } else {
                    this.props.cleanRequestResponse();
                    this.showError('Error', 'Ocurrió un error al procesar la transacción');
                    this.getInitialData()
                }
            }
        }
    };

    renderAnswerDialog() {
        return (
            <AnswerDialog answerOpen={this.state.answerOpen} handleClose={this.handleClose}
                          handleAnswer={this.handleExecuteClick} execute={this.state.toExecute}/>
        );
    }

    renderTable() {
        const {classes} = this.props;
        const {parameter} = this.props.parameter;
        const {rowsPerPage, page} = this.state;
        if (this.props.parameter.errorRequest) {
            return this.renderError()
        }
        return (
            <div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>Codigo</CustomTableCell>
                                    <CustomTableCell align="left">Nombre</CustomTableCell>
                                    <CustomTableCell align="left">Grupo</CustomTableCell>
                                    <CustomTableCell align="left">Orden</CustomTableCell>
                                    <CustomTableCell align="left">Ejecutar</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {parameter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                    const isProcess = item.state === "Procesando";
                                    const isExecute = item.state === "Ejecutado";
                                    return (<TableRow hover key={item.id}>
                                        <TableCell component={"th"} scope={"row"}>{item.code}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.groupName}</TableCell>
                                        <TableCell>{item.order}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" size="small" className={classes.button}
                                                    disabled={isProcess}
                                                    onClick={event => this.handleAnswer(event, item, index)}>
                                                <PlayArrow className={classNames(classes.leftIcon, classes.iconSmall)}/>
                                            </Button>

                                        </TableCell>
                                    </TableRow>)
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={parameter.length}
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
        const {selectedDate} = this.state;
        {
            if (this.props.execute.jobExectute !== null) {
                this.showResponse()
            }
        }
        return (
            <div>
                <div>
                    <Title title={'Ejecución de Jobs Maestros SAP'}
                           subtitle={'En esta sección podras ejecuatar Jobs de manera completa o por partes segun su orden de prioridad de Maestros SAP'}/>
                    <Messages ref={(el) => this.messages = el}/>
                </div>
                <div>{this.renderAnswerDialog()}</div>
                <div>
                    <Toolbar style={{background: '#FFFFFF', marginTop: '1em'}}>

                    </Toolbar>
                    <div>
                        {this.renderTable()}
                    </div>
                </div>
            </div>
        );
    }
}

MasterJobs.propTypes = {};
const mapStateToProps = state => ({
    parameter: parameters(state),
    execute: getProcessConfirmation(state),
});

const mapDispatchToProps = dispatch => ({
    jobEtl: (code, date) => dispatch(jobMasterEtlServerBi(code, date)),
    getMasterParametersServerBi: () => dispatch(getMasterParametersServerBi()),
    cleanRequestResponse: () => dispatch(cleanRequestResponse()),
    changeState: (position) => dispatch(changeStateParameter(position))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, JsxStyles)(MasterJobs));
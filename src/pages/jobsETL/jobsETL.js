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
import {getProcessConfirmation, parameters} from "../../reducers";
import {getInitialDataParametersServerBi, jobEtlServerBi} from "../../actions/indexthunk";
import Button from "@material-ui/core/es/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";
import {DatePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import {format} from 'date-fns/esm'
import esLocale from "date-fns/locale/es";
import startOfMonth from "date-fns/startOfMonth"
import {Messages} from "primereact/messages";
import Title from "../Title/Title";
import AnswerDialog from "./dialogs/AnswerDialog";
import {cleanRequestResponse} from "../../actions";

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

class JobsEtl extends Component {

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
            toExecute: false
        }
    }

    componentDidMount() {
        this.getInitialData(new Date());
    }

    getInitialData = (date) => {
        const dataParam = startOfMonth(date);
        this.props.getInitialDataParameters(format(dataParam, 'yyyyMMdd'))
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
        const date = startOfMonth(this.state.selectedDate);
        this.props.jobEtl(this.state.toExecute.code, format(date, 'yyyyMMdd'));
    };

    handleDateChange = date => {
        this.setState({selectedDate: date});
        this.getInitialData(date);
    };

    handleChangePage = (event, page) => {
        this.setState({page})
    };

    handleChangeRowsPerPage = event => {
        this.setState({page: 0, rowsPerPage: event.target.value})
    };

    handleAnswer = (event, item) => {
        this.setState({answerOpen: true, toExecute: item})
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
                    this.getInitialData(this.state.selectedDate)
                } else {
                    this.props.cleanRequestResponse();
                    this.showError('Error', 'Ocurrió un error al procesar la transacción');
                    this.getInitialData(this.state.selectedDate)
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
        parameter.sort((a, b) => (a.group > b.group) ? 1 : (a.group === b.group) ? ((a.order > b.order) ? 1 : -1) : -1);
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
                                    <CustomTableCell align="left">Estado</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {parameter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
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
                                                    onClick={event => this.handleAnswer(event, item)}>
                                                <PlayArrow className={classNames(classes.leftIcon, classes.iconSmall)}/>
                                            </Button>

                                        </TableCell>
                                        <TableCell
                                            style={isProcess ? {color: 'red'} : isExecute ? {color: 'green'} : {color: 'black'}}>{item.state}</TableCell>
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
                    <Title title={'Ejecución de Jobs'}
                           subtitle={'En esta sección podras ejecuatar Jobs de manera completa o por partes segun su orden de prioridad'}/>
                    <Messages ref={(el) => this.messages = el}/>
                </div>
                <div>{this.renderAnswerDialog()}</div>
                <div>
                    <Toolbar style={{background: '#FFFFFF', marginTop: '1em'}}>
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                <DatePicker
                                    format={format(selectedDate, '\'MMMM, yyyy\'')}
                                    keyboard
                                    clearable
                                    label="Mes de ejecución"
                                    value={selectedDate}
                                    onChange={this.handleDateChange}
                                    animateYearScrolling={true}
                                    minDate={new Date('01/01/2019')}
                                    onInputChange={e => console.log("Keyboard Input:", e.target.value)}/>
                            </MuiPickersUtilsProvider>
                        </div>
                    </Toolbar>
                    <div>
                        {this.renderTable()}
                    </div>
                </div>
            </div>
        );
    }
}

JobsEtl.propTypes = {};

const mapStateToProps = state => ({
    parameter: parameters(state),
    execute: getProcessConfirmation(state),
});

const mapDispatchToProps = dispatch => ({
    jobEtl: (code, date) => dispatch(jobEtlServerBi(code, date)),
    getInitialDataParameters: (dataParam) => dispatch(getInitialDataParametersServerBi(dataParam)),
    cleanRequestResponse: () => dispatch(cleanRequestResponse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, JsxStyles)(JobsEtl));

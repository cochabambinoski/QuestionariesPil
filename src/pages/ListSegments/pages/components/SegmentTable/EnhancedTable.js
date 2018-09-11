/**
 * Created by smirandaz on 08/29/2018.
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {Messages} from 'primereact/messages';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EnhancedTableToolbar from "../SegmentTable/EnhancedTableToolbar";
import EnhancedTableHead from "../SegmentTable/EnhacedTableHead";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/FileCopy";
import EditSeg from "@material-ui/icons/Edit";
import EditBas from "@material-ui/icons/Edit";
import Constants from "../../../../../Constants.json";
import * as utilDate from "../../../../../utils/dateUtils";
import BaseGenerator from "../../../../BaseGenerator/pages/BaseGenerator";
import SegmentationGenerator from "../../../../SegementationGenerator/pages/SegmentationGenerator";
import {Button} from "primereact/button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
    },
    table: {
        minWidth: 720,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends Component {

    constructor() {
        super();

        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 5,
            filter: null,
            startDate: utilDate.firstDayOfMonth(),
            endDate: utilDate.getNow(),
            deleteOpen: false,
            reportOpen: false,
            toDelete: null,
            toReport: null,
            segment: null,
        };

        this.showSuccess = this.showSuccess.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.showWarn = this.showWarn.bind(this);
        this.showError = this.showError.bind(this);
    }

    componentDidMount() {
        this.chargeTable(this.state.startDate, this.state.endDate)
    };

    /**
     * show message success
     * @param title
     * @param message
     */
    showSuccess = (title, message) => {
        this.messages.show({severity: 'success', summary: title, detail: message});
    };

    /**
     * show message info
     * @param title
     * @param message
     */
    showInfo = (title, message) => {
        this.messages.show({severity: 'info', summary: title, detail: message});
    };

    /**
     * show message warn
     * @param title
     * @param message
     */
    showWarn = (title, message) => {
        this.messages.show({severity: 'warn', summary: title, detail: message});
    };

    /**
     * show message error
     * @param title
     * @param message
     */
    showError = (title, message) => {
        this.messages.show({severity: 'error', summary: title, detail: message});
    };

    showResponse = (response) => {
        console.log('response: ', response);
        if (response === 0) {
            this.showError('Segmentación Base', 'Algo salio mal en la transacción');
        } else {
            this.showSuccess('Segmentación Base', 'Se creo correctamente la nueva segmentación base');
        }
    };

    /**
     * close dialog and cancel delete
     */
    handleCloseDelete = () => {
        this.setState({deleteOpen: false});
        this.setState({toDelete: null})
    };

    /**
     * init order delete
     * @param event
     * @param id
     */
    handleDeleteClick = (event, id) => {
        this.showWarn('Alerta', 'esta iniciando una funcion de eliminación')
        this.setState({deleteOpen: true});
        this.setState({toDelete: id})
    };

    /**
     * close dialog report
     */
    handleCloseReport = () => {
        this.setState({reportOpen: false});
        this.setState({toDelete: null})
    };

    /**
     * open dialog report
     * @param event
     * @param id
     */
    handleReportClick = (event, id) => {
        this.setState({reportOpen: true});
        this.setState({toReport: id})
    };

    /**
     *Accpet delete from dialog
     */
    handleDelete = () => {
        this.deleteSegment();
    };

    /**
     * deleteDialog
     */
    deleteSegment = () => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.DEL_CLIENT_KILOLITER}/${this.state.toDelete}`;
        console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .catch(error => {
                console.error('Error:', error)
                this.showError('Error', 'No se pudo eliminar la segmentación');
            })
            .then(response => {
                console.log("Success: ", response);

                this.chargeTable(this.state.startDate, this.state.endDate)
                this.handleClose();
                if (response !== undefined || response !== null)
                    this.showSuccess('Eliminado', 'Se elimino una segmentación');
            });
    };

    /**
     * get data for table
     * @param start
     * @param end
     */
    chargeTable = (start, end) => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.GET_CLIENT_KILOLITERS_RANGE}/${utilDate.dateToISO(start)}/${utilDate.dateToISO(end)}`;
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState(prevState => ({
                data: data,
            }));
        });
    };

    /**
     * get report
     * @param url
     */
    getReport = (url) => {
        let win = window.open(url, '_blank');
        win.focus();
        this.showSuccess('Reporte', 'Se descargo su reporte correctamente');
    };

    /**
     * click PDF
     */
    handlePDFReport = () => {
        console.log('segment: ', this.state.toReport);
        let url = `${Constants.ROUTE_WEB_BI}${Constants.REPORT_PDF}/${this.state.toReport}`;
        console.log('url: ', url);
        this.getReport(url);
    };

    /**
     * click XLS
     */
    handleXLSReport = () => {
        console.log('segment: ', this.state.toReport);
        let url = `${Constants.ROUTE_WEB_BI}${Constants.REPORT_XLS}/${this.state.toReport}`;
        console.log('url: ', url);
        this.getReport(url);
    };

    /**
     * click TXT
     */
    handleTXTReport = () => {
        console.log('segment: ', this.state.toReport);
        let url = `${Constants.ROUTE_WEB_BI}${Constants.REPORT_TXT}/${this.state.toReport}`;
        console.log('url: ', url);
        this.getReport(url);
    };

    /**
     * change order by columns
     * @param event
     * @param property
     */
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    /**
     * controller by order ascending or descending
     * @param a
     * @param b
     * @param orderBy
     * @returns {number}
     */
    desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    /**
     * order list
     * @param order
     * @param orderBy
     * @returns {*}
     */
    getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
    }

    /**
     * update table with range dates
     * @param fromDate
     * @param todate
     */
    updateDates = (fromDate, todate) => {
        let start = fromDate.getTime() === this.state.startDate.getTime();
        let finish = todate.getTime() === this.state.endDate.getTime();
        if (!start || !finish) {
            this.state.startDate = fromDate;
            this.state.endDate = todate;
            this.chargeTable(this.state.startDate, this.state.endDate)
        }
    }

    /**
     * change page
     * @param event
     * @param page
     */
    handleChangePage = (event, page) => {
        this.setState({page});
    };

    /**
     * change num rows per page
     * @param event
     */
    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleBase = (event, id) => {
        this.setState({segment: id});
        this.setState({baseOpen: true});
    };

    handleSegment = (event, id) => {
        this.setState({segment: id});
        this.setState({segmentOpen: true});
    };

    handleClose = (response) => {
        this.setState({baseOpen: false});
        this.setState({deleteOpen: false});
        this.setState({toDelete: null});
        this.setState({segmentOpen: false});
        this.chargeTable(this.state.startDate, this.state.endDate);
        this.showResponse(response);
    };

    renderBase() {
        const {classes} = this.props;
        return (
            <Dialog
                open={this.state.baseOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"
                             style={{backgroundColor: '#5B5D74'}}>{"Generación de Segmentación Base"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <BaseGenerator segment={this.state.segment} refresh={this.handleClose}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button label="Cancelar" icon="pi pi-times" onClick={this.handleClose}
                            className="ui-button-secondary"/>
                </DialogActions>
            </Dialog>

        );
    }

    renderSegment() {
        const {classes} = this.props;
        return (
            <Dialog
                open={this.state.segmentOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"
                             style={{backgroundColor: '#5B5D74'}}>{"Generación de parametros para la segmentación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <SegmentationGenerator segment={this.state.segment} refresh={this.handleClose}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button label="Cancelar" icon="pi pi-times" onClick={this.handleClose}
                            className="ui-button-secondary"/>
                </DialogActions>
            </Dialog>
        );
    }

    /**
     * render for Dialog
     * @returns {XML}
     */
    renderDeleteDialog() {
        return (
            <Dialog
                open={this.state.deleteOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Alerta"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Esta seguro de eliminar esta Segmentacion Base?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button label="Eliminar" icon="pi pi-check" onClick={this.handleDelete}
                            className="ui-button-danger"/>
                    <Button label="Cancelar" icon="pi pi-times" onClick={this.handleClose}
                            className="ui-button-secondary"/>
                </DialogActions>
            </Dialog>
        );
    }

    /**
     * show dialog Report
     * @returns {XML}
     */
    renderReportDialog() {
        return (
            <Dialog
                open={this.state.reportOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Generación de Reportes"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Button label="PDF" onClick={this.handlePDFReport}
                                className="ui-button-danger" style={{width: '90px'}}>
                            <img src={require('./../../../../../images/pdf.svg')} style={{height: '45px'}}/>
                        </Button>
                        <Button label="EXCEL" onClick={this.handleXLSReport}
                                className="ui-button-success" style={{width: '90px'}}>
                            <img src={require('./../../../../../images/excel.svg')} style={{height: '45px'}}/>
                        </Button>
                        <Button label="TEXTO" onClick={this.handleTXTReport}
                                className="ui-button-info" style={{width: '90px'}}>
                            <img src={require('./../../../../../images/txt.svg')} style={{height: '45px'}}/>
                        </Button>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button label="Cancelar" icon="pi pi-times" onClick={this.handleCloseReport}
                            className="ui-button-secondary"/>
                </DialogActions>
            </Dialog>
        );
    }

    renderCell() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} dateStart={this.state.startDate}
                                      dateEnd={this.state.endDate} updateDates={this.updateDates}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data
                                .sort(this.getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={n.id}>
                                            <TableCell component="th" scope="row" numeric>
                                                {n.idClientKiloliter}
                                            </TableCell>
                                            <TableCell>
                                                {utilDate.getDateFormat(n.dateRegister)}
                                            </TableCell>
                                            <TableCell>
                                                {n.description}
                                            </TableCell>
                                            <TableCell >
                                                <IconButton aria-label="Editar Base"
                                                            onClick={event => this.handleBase(event, n)}>
                                                    <EditBas/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell >
                                                <IconButton aria-label="Editar Segmentación"
                                                            onClick={event => this.handleSegment(event, n)}>
                                                    <EditSeg/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell >
                                                <IconButton aria-label="Reporte"
                                                            onClick={event => this.handleReportClick(event, n.idClientKiloliter)}>
                                                    <ReportIcon/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell >
                                                <IconButton aria-label="Borrar"
                                                            onClick={event => this.handleDeleteClick(event, n.idClientKiloliter)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div>
                    {this.renderBase()}
                    {this.renderSegment()}
                </div>
                <div>
                    {this.renderDeleteDialog()}
                    {this.renderReportDialog()}
                </div>
                <div>
                    <Messages ref={(el) => this.messages = el}/>
                </div>
                {this.renderCell()}
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    updateDates: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnhancedTable);
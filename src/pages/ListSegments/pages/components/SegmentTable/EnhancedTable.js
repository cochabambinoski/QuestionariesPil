/**
 * Created by smirandaz on 08/29/2018.
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {Messages} from 'primereact/messages';
import Constants from "../../../../../Constants.json";
import * as utilDate from "../../../../../utils/dateUtils";
import {connect} from 'react-redux';
import {deleteSegment, getSegment, getSegmentationData} from "../../../../../actions/indexthunk";
import Segment from "../SegmentList/Segment";
import DeleteDialog from "../SegmentList/DeleteDialog";
import ReportDialog from "../SegmentList/ReportDialog";
import BaseSegment from "../SegmentList/BaseSegment";
import TableSegment from "./TableSegment";

class EnhancedTable extends Component {

    constructor(props) {
        super(props);
        this.BaseGenerator = React.createRef();
        this.SegmentationGenerator = React.createRef();
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
            segment: null
        };

        this.showSuccess = this.showSuccess.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.showWarn = this.showWarn.bind(this);
        this.showError = this.showError.bind(this);
    }

    componentDidMount() {
        this.chargeTable(this.state.startDate, this.state.endDate);
    };

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
        if (response > 0) {
            this.showSuccess('Procesado', 'La transacción se realizó correctamente');
        } else {
            this.showError('Error', 'Ocurrió un error al procesar la transacción');
        }
    };

    handleCloseDelete = () => {
        this.setState({deleteOpen: false});
        this.setState({toDelete: null});
    };

    handleDeleteClick = (event, id) => {
        this.showWarn('Alerta', 'esta iniciando una funcion de eliminación');
        this.setState({deleteOpen: true});
        this.setState({toDelete: id});
    };

    handleCloseReport = () => {
        this.setState({reportOpen: false});
        this.setState({toDelete: null});
    };

    handleReportClick = (event, id) => {
        this.setState({reportOpen: true});
        this.setState({toReport: id});
    };

    handleDelete = () => {
        this.deleteSegment();
    };

    deleteSegment = () => {
        this.props.deleteSegment(this.state.toDelete)
            .then((result) => {
                if (result === "ERROR") {
                    this.showError('Error', 'No se pudo eliminar la segmentación');
                } else {
                    this.chargeTable(this.state.startDate, this.state.endDate);
                    this.handleClose();
                    if (result !== undefined || result !== null)
                        this.showSuccess('Eliminado', 'Se elimino una segmentación');
                }
            });
    };

    chargeTable = (start, end) => {
        this.props.getSegmentationData(start, end)
            .then((data) => {
                this.setState(prevState => ({
                    data: data
                }));
            });
    };

    getReport = (url) => {
        let win = window.open(url, '_blank');
        win.focus();
        this.showSuccess('Reporte', 'Se descargo su reporte correctamente');
    };

    handlePDFReport = () => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.REPORT_PDF}/${this.state.toReport}`;
        this.getReport(url);
    };

    handleXLSReport = () => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.REPORT_XLS}/${this.state.toReport}`;
        this.getReport(url);
    };

    handleTXTReport = () => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.REPORT_TXT}/${this.state.toReport}`;
        this.getReport(url);
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
    }

    updateDates = (fromDate, todate) => {
        const {startDate, endDate} = this.state;
        let start = fromDate.getTime() === startDate.getTime();
        let finish = todate.getTime() === endDate.getTime();
        if (!start || !finish) {
            this.setState({startDate: fromDate, endDate: todate});
            this.chargeTable(fromDate, todate);
        }
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

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
        this.setState({deleteOpen: false});
        this.setState({toDelete: null});
        this.chargeTable(this.state.startDate, this.state.endDate);
    };

    getSegment(id) {
        this.props.getSegment(id)
            .then((data) => {
                this.setState(prevState => ({
                    segment: data
                }));
                this.setState({segmentOpen: true});
            });
    }

    handleCloseBase = (response) => {
        this.setState({baseOpen: false});
        this.chargeTable(this.state.startDate, this.state.endDate);
        if (response >= 0)
            this.showResponse(response);
        if (response > 0 && this.state.segment === 0) {
            this.getSegment(response);
            this.showInfo("Paso 2: ", "Debe crear los parametros de Segmentación");
        }
    };

    handleCloseSegment = (response) => {
        this.setState({segmentOpen: false});
        this.chargeTable(this.state.startDate, this.state.endDate);
        if (response >= 0) {
            this.showResponse(response);

        }
    };

    saveBase = () => {
        this.BaseGenerator.current.handleSaveBase();
    };

    renderBase() {
        return (
            <BaseSegment
                segment={this.state.segment}
                baseOpen={this.state.baseOpen}
                setBaseClick={click => this.clickChild = click}
                handleCloseBase={this.handleCloseBase}/>
        );
    }

    renderSegment() {
        return (
            <Segment
                segmentOpen={this.state.segmentOpen}
                segment={this.state.segment}
                handleCloseSegment={this.handleCloseSegment}/>
        );
    }

    renderDeleteDialog() {
        return (
            <DeleteDialog deleteOpen={this.state.deleteOpen}
                          handleClose={this.handleClose}
                          handleDelete={this.handleDelete}/>
        );
    }

    renderReportDialog() {
        return (
            <ReportDialog reportOpen={this.state.reportOpen}
                          handleClose={this.handleClose}
                          handleCloseReport={this.handleCloseReport}
                          handlePDFReport={this.handlePDFReport}
                          handleXLSReport={this.handleXLSReport}
                          handleTXTReport={this.handleTXTReport}/>
        );
    }

    renderCell() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        return (
            <TableSegment
                clases={classes} startDate={this.state.startDate} endDate={this.state.endDate}
                data={data} order={order} orderBy={orderBy} selected={selected} rowsPerPage={rowsPerPage}
                page={page}
                updateDates={this.updateDates}
                handleBase={this.handleBase}
                handleRequestSort={this.handleRequestSort}
                getSorting={this.getSorting}
                handleSegment={this.handleSegment}
                handleReportClick={this.handleReportClick}
                handleDeleteClick={this.handleDeleteClick}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
        );
    }

    render() {
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
                <div>
                    {this.renderCell()}
                </div>
            </div>
        );
    }
}

const styles = () => ({
    tableWrapper: {
        overflowX: 'auto'
    }
});

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    updateDates: PropTypes.func.isRequired,
    newBase: PropTypes.func.isRequired,
    setBase: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    getSegment: value => dispatch(getSegment(value)),
    getSegmentationData: (start, end) => dispatch(getSegmentationData(start, end)),
    deleteSegment: value => dispatch(deleteSegment(value)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(EnhancedTable));

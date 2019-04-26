import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';
import Card from '@material-ui/core/Card';
import * as utilDate from "../../../../../utils/dateUtils";
import {Button} from 'primereact/button';
import FButton from '@material-ui/core/Button';
import Constants from '../../../../../Constants.json';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Messages} from 'primereact/messages';
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import {Calendar} from "primereact/calendar";
import {deleteSegment, getSegment, getSegmentationData} from "../../../../../actions/indexthunk";
import {connect} from 'react-redux';
import DeleteDialog from "./DeleteDialog";
import ReportDialog from "./ReportDialog";
import Segment from "./Segment";
import BaseSegment from "./BaseSegment";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: 'relative',
        minHeight: 200
    },
    fab: {
        top: 'auto',
        right: '20px',
        bottom: '20px',
        left: 'auto',
        position: 'fixed !important'
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500]
    }
});

class SegmentList extends Component {

    constructor(props) {
        super(props);

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;

        let minDate = new Date();
        minDate.setMonth(prevMonth);
        minDate.setFullYear(prevYear);
        let maxDate = new Date();
        maxDate.setMonth(nextMonth);
        maxDate.setFullYear(nextYear);

        this.BaseGenerator = React.createRef();
        this.SegmentationGenerator = React.createRef();
        this.state = {
            segments: [],
            filter: null,
            startDate: utilDate.firstDayOfMonth(),
            endDate: utilDate.getNow(),
            deleteOpen: false,
            reportOpen: false,
            toDelete: null,
            toReport: null,
            segment: null,
            currentItem: -1,
            updateView: true
        };
    }

    componentDidMount() {
        this.setState({dates: [this.state.startDate, this.state.endDate]});
        this.chargeList(this.state.startDate, this.state.endDate);
    }

    /**
     * click filter by dates range
     */
    handlerFilter = () => {
        if (this.state.dates[0] !== null && this.state.dates[1] !== null) {
            this.setState({startDate: this.state.dates[0], endDate: this.state.dates[1]});
            this.updateDates(this.state.startDate, this.state.endDate);
        }
    };

    /**
     * update table with range dates
     * @param fromDate
     * @param todate
     */
    updateDates = (fromDate, todate) => {
        let start = fromDate.getTime() === this.state.startDate.getTime();
        let finish = todate.getTime() === this.state.endDate.getTime();
        if (!start || !finish) {
            this.setState({startDate: fromDate, endDate: todate});
            this.chargeList(fromDate, todate);
        }
    };

    /**
     * show message success
     * @param title
     * @param message
     */
    showSuccess = (title, message) => {
        this.messages.show({life: 5000, severity: 'success', summary: title, detail: message});
    };

    /**
     * show message info
     * @param title
     * @param message
     */
    showInfo = (title, message) => {
        this.messages.show({life: 5000, severity: 'info', summary: title, detail: message});
    };

    /**
     * show message warn
     * @param title
     * @param message
     */
    showWarn = (title, message) => {
        this.messages.show({life: 5000, severity: 'warn', summary: title, detail: message});
    };

    /**
     * show message error
     * @param title
     * @param message
     */
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

    handleBase = (event, id) => {
        this.setState({segment: id});
        this.setState({baseOpen: true});
    };

    handleCloseBase = (response) => {
        this.setState({baseOpen: false});
        this.chargeList(this.state.startDate, this.state.endDate);
        if (response >= 0)
            this.showResponse(response);
        if (response > 0 && this.state.segment === 0) {
            this.getSegment(response);
            this.showInfo("Paso 2: ", "Debe crear los parametros de Segmentación");
        }
    };

    getSegment(id) {
        this.props.getSegment(id)
            .then((data) => {
                this.setState(() => ({
                    segment: data
                }));
                this.setState({segmentOpen: true});
            });
    }

    handleSegment = (event, id) => {
        this.setState({segment: id});
        this.setState({segmentOpen: true});
    };

    handleCloseSegment = (response) => {
        this.setState({segmentOpen: false});
        this.chargeList(this.state.startDate, this.state.endDate);
        if (response >= 0)
            this.showResponse(response);
    };

    handleReportClick = (event, id) => {
        this.setState({reportOpen: true});
        this.setState({toReport: id});
    };

    handleCloseReport = () => {
        this.setState({reportOpen: false});
        this.setState({toDelete: null});
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

    handleDeleteClick = (event, id) => {
        this.showWarn('Alerta', 'esta iniciando una funcion de eliminación');
        this.setState({deleteOpen: true});
        this.setState({toDelete: id});
    };

    handleClose = () => {
        this.setState({deleteOpen: false});
        this.setState({toDelete: null});
        this.chargeList(this.state.startDate, this.state.endDate);
    };

    renderBase() {
        return (
            <BaseSegment segment={this.state.segment}
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
            <DeleteDialog deleteOpen={this.state.deleteOpen} handleClose={this.handleClose}
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

    chargeList = (start, end) => {
        this.props.getSegmentationData(start, end)
            .then((data) => {
                this.setState(() => ({
                    segments: data
                }));
            });
    };

    renderToolbar() {
        return (
            <Toolbar classes="" className="toolbarFullWidth">
                <div className="spacer"/>
                <div>
                    <Calendar dateFormat="dd/mm/yy" value={this.state.dates}
                              onChange={(e) => this.setState({dates: e.value})}
                              selectionMode="range" readOnlyInput="true" className="calendar"/>
                </div>
                <div>
                    <Button label="Buscar" onClick={this.handlerFilter} className="buttonBlue"/>
                </div>
            </Toolbar>
        );
    }

    renderList() {
        return (
            <div>{
                this.state.segments.map((item) => {
                    return (
                        <div style={{marginTop: '1em'}}>
                            <Card key={item.idClientKiloliter}>
                                <CardContent>
                                    <div className="row between-xs" style={{marginRight: '1em'}}>
                                        <div className="col-auto">
                                            <div className="box">
                                                <h1 className='titleA'> {item.description}</h1>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="box">
                                                <h2 className='titleB'>{item.idClientKiloliter}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-auto">
                                            <div className="box">
                                                <label
                                                    className='label'>{utilDate.getDateFormat(item.dateRegister)}</label>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <div className="row between-xs" style={{padding: '0.5em'}}>
                                        <div className="col-auto">
                                            <div className="box">
                                                <Button
                                                    label="Base" onClick={event => this.handleBase(event, item)}/>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="box">
                                                <Button
                                                    label="Segmentación"
                                                    onClick={event => this.handleSegment(event, item)}/>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="box">
                                                <Button
                                                    label="Reporte"
                                                    onClick={event => this.handleReportClick(event, item.idClientKiloliter)}/>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="box">
                                                <Button label="Eliminar"
                                                        className="ui-button-danger"
                                                        onClick={event => this.handleDeleteClick(event, item.idClientKiloliter)}/>
                                            </div>
                                        </div>
                                    </div>
                                </CardActions>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        const {classes} = this.props;
        const fab = {
            color: "primary",
            className: classes.fab,
            icon: <AddIcon/>
        };
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
                {this.renderToolbar()}
                {this.renderList()}
                <FButton variant="fab" className={fab.className} color={fab.color}
                         onClick={event => this.handleBase(event, 0)}>
                    {fab.icon}
                </FButton>
            </div>

        );
    }
}

SegmentList.propTypes = {
    theme: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
    getSegment: value => dispatch(getSegment(value)),
    getSegmentationData: (start, end) => dispatch(getSegmentationData(start, end)),
    deleteSegment: value => dispatch(deleteSegment(value)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(SegmentList));

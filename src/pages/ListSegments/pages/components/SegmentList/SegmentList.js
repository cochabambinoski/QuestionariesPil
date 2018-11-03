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
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Messages} from 'primereact/messages';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import SegmentationGenerator from "../../../../SegementationGenerator/pages/SegmentationGenerator";
import BaseGenerator from "../../../../BaseGenerator/pages/BaseGenerator";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import {Calendar} from "primereact/calendar";
import {deleteSegment, getSegment, getSegmentationData} from "../../../../../actions/indexthunk";
import {connect} from 'react-redux';

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
    };

    /**
     * click filter by dates range
     * @param event
     */
    handlerFilter = event => {
        if (this.state.dates[0] !== null && this.state.dates[1] !== null) {
            this.state.startDate = this.state.dates[0];
            this.state.enDate = this.state.dates[1];
            this.updateDates(this.state.startDate, this.state.enDate);
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
        }
        else {
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
                this.setState(prevState => ({
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

    /**
     * open dialog report
     * @param event
     * @param id
     */
    handleReportClick = (event, id) => {
        this.setState({reportOpen: true});
        this.setState({toReport: id});
    };

    /**
     * close dialog report
     */
    handleCloseReport = () => {
        this.setState({reportOpen: false});
        this.setState({toDelete: null});
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
        let url = `${Constants.ROUTE_WEB_BI}${Constants.REPORT_PDF}/${this.state.toReport}`;
        this.getReport(url);
    };

    /**
     * click XLS
     */
    handleXLSReport = () => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.REPORT_XLS}/${this.state.toReport}`;
        this.getReport(url);
    };

    /**
     * click TXT
     */
    handleTXTReport = () => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.REPORT_TXT}/${this.state.toReport}`;
        this.getReport(url);
    };

    /**
     * init order delete
     * @param event
     * @param id
     */
    handleDeleteClick = (event, id) => {
        this.showWarn('Alerta', 'esta iniciando una funcion de eliminación');
        this.setState({deleteOpen: true});
        this.setState({toDelete: id});
    };

    handleClose = (response) => {
        this.setState({deleteOpen: false});
        this.setState({toDelete: null});
        this.chargeList(this.state.startDate, this.state.endDate);
    };

    /**
     * Dialog Generated Base Segmentation Form
     * @returns {XML}
     */
    renderBase() {
        const {classes} = this.props;
        return (
            <Dialog
                className="fullDialog"
                fullScreen
                open={this.state.baseOpen}
                onClose={this.handleCloseBase}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title"
                             className="titleBody">
                    <h1 className="dialogTitle">{"Generación de Segmentación Base"}</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="dialogBody">
                        <BaseGenerator segment={this.state.segment} refresh={this.handleCloseBase}
                                       setBaseClick={click => this.clickChild = click}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button label="Guardar" icon="pi pi-check" onClick={() => this.clickChild()}
                            className="buttonBlue"/>
                    <Button label="Cancelar" icon="pi pi-times" onClick={this.handleCloseBase}
                            className="ui-button-secondary buttonSecundary"/>
                </DialogActions>
            </Dialog>
        );
    }

    /**
     * Dialog Generated Segmentation Form
     * @returns {XML}
     */
    renderSegment() {
        const {classes} = this.props;
        return (
            <Dialog
                open={this.state.segmentOpen}
                onClose={this.handleCloseSegment}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="titleBody">
                    <h1 className="dialogTitle">{"Generación de parametros para la segmentación"}</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="dialogBody">
                        <SegmentationGenerator segment={this.state.segment} refresh={this.handleCloseSegment}
                                               setSegmentClick={click => this.clickChild = click}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button label="Guardar" icon="pi pi-check" onClick={() => this.clickChild()}
                            className="buttonBlue"/>
                    <Button label="Cancelar" icon="pi pi-times" onClick={this.handleCloseSegment}
                            className="ui-button-secondary buttonSecundary"/>
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
                <DialogTitle id="alert-dialog-title"
                             className="titleBody">
                    <h1 className="dialogTitle">{"Alerta"}</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="dialogBody">
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
                <DialogTitle id="alert-dialog-title" className="titleBody">
                    <h1 className="dialogTitle">{"Generación de Reportes"}</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="dialogBody">
                        <img src={require('./../../../../../images/file-pdf.svg')} className="icons"
                             onClick={this.handlePDFReport}/>
                        <img src={require('./../../../../../images/file-excel.svg')} className="icons"
                             onClick={this.handleXLSReport}/>
                        <img src={require('./../../../../../images/file-document.svg')} className="icons"
                             onClick={this.handleTXTReport}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button label="Cancelar" icon="pi pi-times" onClick={this.handleCloseReport}
                            className="ui-button-secondary"/>
                </DialogActions>
            </Dialog>
        );
    }

    chargeList = (start, end) => {
        this.props.getSegmentationData(start, end)
            .then((data) => {
                this.setState(prevState => ({
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
        const {classes, theme} = this.props;
        const fab = {
            color: "primary",
            className: classes.fab,
            icon: <AddIcon/>
        };
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
                                                    label="Segmentación" onClick={event => this.handleSegment(event, item)}/>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="box">
                                                <Button
                                                    label="Reporte" onClick={event => this.handleReportClick(event, item.idClientKiloliter)}/>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="box">
                                                <Button label="Eliminar"
                                                        className="ui-button-danger" onClick={event => this.handleDeleteClick(event, item.idClientKiloliter)}/>
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
    };

    render() {
        const {classes, theme} = this.props;
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
                <FButton variant="fab" className={fab.className} color={fab.color} onClick={event => this.handleBase(event, 0)}>
                    {fab.icon}
                </FButton>
            </div>

        );
    };
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
/**
 * Created by smirandaz on 08/29/2018.
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from 'primereact/button';


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
            todelete: null,
        };
    }

    componentDidMount() {
        this.chargeTable(this.state.startDate, this.state.endDate)
    };

    handleClose = () => {
        this.setState({deleteOpen: false});
        this.setState({toDelete: null})
    };

    handleClick = (event, id) => {
        this.setState({deleteOpen: true});
        this.setState({toDelete: id})
    };

    handleDelete = () => {
        this.deleteSegment();
    };

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
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log("Success: ", response.codeResult);
                if (response.codeResult === 1) {
                    this.chargeTable(this.state.startDate, this.state.endDate)
                    this.handleClose();
                }
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
        var start = fromDate.getTime() === this.state.startDate.getTime();
        var finish = todate.getTime() === this.state.endDate.getTime();
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

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <div>
                <div>
                    {this.renderDeleteDialog()}
                </div>
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
                                                <TableCell>{utilDate.getDateFormat(n.dateRegister)}</TableCell>
                                                <TableCell>{n.description}</TableCell>
                                                <TableCell >
                                                    <IconButton aria-label="Delete">
                                                        <EditBas/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell >
                                                    <IconButton aria-label="Delete">
                                                        <EditSeg/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell >
                                                    <IconButton aria-label="Delete">
                                                        <ReportIcon/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell >
                                                    <IconButton aria-label="Delete"
                                                                onClick={event => this.handleClick(event, n.idClientKiloliter)}>
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
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    dates: PropTypes.any.isRequired,
    updateDates: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnhancedTable);
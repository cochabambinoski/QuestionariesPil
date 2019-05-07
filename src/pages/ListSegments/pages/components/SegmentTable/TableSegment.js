import React from 'react';
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import Table from "@material-ui/core/Table";
import EnhancedTableHead from "./EnhacedTableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import * as utilDate from "../../../../../utils/dateUtils";
import IconButton from "@material-ui/core/IconButton";
import EditBas from "@material-ui/core/SvgIcon/SvgIcon";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/FileCopy";
import EditSeg from "@material-ui/icons/EditOutlined";

function TableSegment(props) {
    const { startDate, endDate} = props;
    const {data, order, orderBy, selected, rowsPerPage, page} = props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return(
        <Paper className="root" classes="">
            <EnhancedTableToolbar className="toolbarTable" numSelected={selected.length}
                                  dateStart={startDate}
                                  dateEnd={endDate} updateDates={props.updateDates}
                                  newBase={event => props.handleBase(event, 0)}/>
            <div style={{ overflowX: 'auto'}} >
                <Table children="" classes="" className="table" aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={props.handleRequestSort}
                        rowCount={data.length}/>
                    <TableBody classes="">
                        {data
                            .sort(props.getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(n => {
                                return (
                                    <TableRow
                                        classes=""
                                        hover
                                        tabIndex={-1}
                                        key={n.id}>
                                        <TableCell classes="" component="th" scope="row" numeric className="cells">
                                            {n.idClientKiloliter}
                                        </TableCell>
                                        <TableCell classes="" className="cells">
                                            {utilDate.getDateFormat(n.dateRegister)}
                                        </TableCell>
                                        <TableCell classes="" className="cells">
                                            {n.description}
                                        </TableCell>
                                        <TableCell classes="" className="cells">
                                            <IconButton classes="" aria-label="Editar Base"
                                                        onClick={event => props.handleBase(event, n)}>
                                                <EditBas className="iconButton"/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell classes="" className="cells">
                                            <IconButton classes="" aria-label="Editar Segmentación"
                                                        onClick={event => props.handleSegment(event, n)}>
                                                <EditSeg className="iconButton"/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell classes="" className="cells">
                                            <IconButton classes="" aria-label="Reporte"
                                                        onClick={event => props.handleReportClick(event, n.idClientKiloliter)}>
                                                <ReportIcon className="iconButton"/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell classes="" className="cells">
                                            <IconButton classes="" aria-label="Borrar" className="iconButtonDel"
                                                        onClick={event => props.handleDeleteClick(event, n.idClientKiloliter)}>
                                                <DeleteIcon className="iconButtonDel"/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 57 * emptyRows}}>
                                <TableCell colSpan={7}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Filas por página:"
                rowsPerPageOptions={[5, 10, 25, 50]}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Página Anterior'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Siguiente Página'
                }}
                onChangePage={props.handleChangePage}
                onChangeRowsPerPage={props.handleChangeRowsPerPage}
                classes=""/>
        </Paper>
    )
}

export default TableSegment;

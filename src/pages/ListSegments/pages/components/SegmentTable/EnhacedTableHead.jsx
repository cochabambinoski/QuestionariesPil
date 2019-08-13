/**
 * Created by smirandaz on 08/29/2018.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

class EnhancedTableHead extends Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    rows = [
        {id: 'idClientKiloliter', numeric: true, disablePadding: false, label: 'Codigo'},
        {id: 'dateRegister', numeric: false, disablePadding: false, label: 'Fecha'},
        {id: 'description', numeric: false, disablePadding: false, label: 'Descripción'}
    ];

    render() {
        const { order, orderBy} = this.props;
        return (
            <TableHead classes="">
                <TableRow>
                    {this.rows.map(row => {
                        return (
                            <TableCell
                                key={row.id} numeric={row.numeric} padding='2px'
                                sortDirection={orderBy === row.id ? order : false} className="headTable" classes="">
                                <Tooltip title="Ordenar" placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                         enterDelay={300} className="head" classes="">
                                    <TableSortLabel active={orderBy === row.id} direction={order}
                                                    onClick={this.createSortHandler(row.id)}>
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                    <TableCell className="headTable">
                        Base
                    </TableCell>
                        <TableCell className="headTable">
                            Segmentación
                        </TableCell>
                        <TableCell className="headTable">
                            Reporte
                        </TableCell>
                        <TableCell className="headTable">
                            Borrar
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;
/**
 * Created by smirandaz on 08/29/2018.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    head: {
        backgroundColor: '#5B5D74',
        color: theme.palette.common.white,
        fontFamily: 'Open Sans',
        fontSize: '18px',
        fontweight: '700'
    },
    sortLabel: {
        color: theme.palette.common.white,
    }
});

class EnhancedTableHead extends Component {
    constructor() {
        super()
    }

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    rows = [
        {id: 'idClientKiloliter', numeric: true, disablePadding: false, label: 'Codigo'},
        {id: 'dateRegister', numeric: false, disablePadding: false, label: 'Fecha'},
        {id: 'description', numeric: false, disablePadding: false, label: 'Descripción'},
    ];

    render() {
        const {classes} = this.props;
        const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;
        return (
            <TableHead>
                <TableRow>
                    {this.rows.map(row => {
                        return (
                            <TableCell
                                key={row.id} numeric={row.numeric} padding='2px'
                                sortDirection={orderBy === row.id ? order : false} className={classes.head}>
                                <Tooltip title="Ordenar" placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                         enterDelay={300} className={classes.head}>
                                    <TableSortLabel active={orderBy === row.id} direction={order}
                                                    onClick={this.createSortHandler(row.id)} className={classes.head}>
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                    <TableCell className={classes.head}>
                        Base
                    </TableCell>
                    <TableCell className={classes.head}>
                        Segmentación
                    </TableCell>
                    <TableCell className={classes.head}>
                        Reporte
                    </TableCell>
                    <TableCell className={classes.head}>
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
    rowCount: PropTypes.number.isRequired,
};

export default withStyles(styles)(EnhancedTableHead);
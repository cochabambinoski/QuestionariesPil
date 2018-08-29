/**
 * Created by smirandaz on 08/29/2018.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditSeg from '@material-ui/icons/Edit';
import EditBas from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import Constants from '../../../../../Constants.json';

const rows = [
    {id: 'idClientKiloliter', numeric: true, disablePadding: false, label: 'Codigo'},
    {id: 'dateRegister', numeric: false, disablePadding: false, label: 'Fecha'},
    {id: 'description', numeric: false, disablePadding: false, label: 'Descripción'},
];

class EnhancedTableHead extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding='2px'
                                sortDirection={orderBy === row.id ? order : false}>
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}>
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}>
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                    <TableCell>
                        Segmentación
                    </TableCell>
                    <TableCell>
                        Base
                    </TableCell>
                    <TableCell>
                        Borrar
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {};

export default EnhancedTableHead;
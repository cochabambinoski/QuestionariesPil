import React, {Component, Fragment} from 'react';
import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

const styles = theme => ({
    root: {width: '100%', marginTop: theme.spacing.unit * 3,},
    table: {minWidth: 500,},
    tableWrapper: {overflowX: 'auto',},
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class TablePaginationCustom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: null, errorRequest: null, isLoading: true, cant: null, pivot: 1, ant: false,
            page: 0, rowsPerPage: 50,
        }
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value})
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    render() {
        const {classes, rows, page, rowsPerPage, columns} = this.props;
        return (
            <Fragment>
                {rows == null ? (<h1>Cargando Pregunta</h1>) : (<Paper className={classes.root}>
                    <div>
                        <Table Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column, index) => {
                                        return <TableCell key={index}>{column}</TableCell>
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.children}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination rowsPerPageOptions={[50]} colSpan={3} count={rows.length}
                                                     rowsPerPage={rowsPerPage} page={page} SelectProps={{native: true,}}
                                                     onChangePage={this.props.handleChangePage}
                                                     onChangeRowsPerPage={this.props.handleChangeRowsPerPage}/>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>)
                }
            </Fragment>
        );
    }
}

export default withStyles(styles)(TablePaginationCustom);

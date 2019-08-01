import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Constants from "../../../../../Constants";
import * as StringFormatUtil from "../../../../../Util/StringFormatUtil";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class FreeAnswerTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: null,
            errorRequest: null,
            isLoading: true,
            cant: null,
            pivot: 1,
            ant: false,
            page: 0,
            rowsPerPage: 50,
        }
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value})
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    componentDidMount() {
        const {pivot, ant} = this.state;
        const urlAnswers = `${Constants.ROUTE_WEB_SERVICES}${StringFormatUtil.format(Constants.GET_DATA_OF_FREE_QUESTION, this.props.question.id, ant, pivot)}`;
        const urlCantData = `${Constants.ROUTE_WEB_SERVICES}${StringFormatUtil.format(Constants.GET_CANT_ANSWER_BY_QUESTION, this.props.question.id, this.props.question.type.codigoSap)}`;
        Promise.all([
            fetch(urlAnswers),
            fetch(urlCantData)
        ]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()])).then(([answers, cant]) => {
            if (answers.status === undefined && cant.status === undefined) {
                this.setState({answers: answers, cant: cant, errorRequest: null, isLoading: false})
            } else {
                if (answers.status !== undefined) {
                    this.setState({answers: null, errorRequest: answers, isLoading: false})
                } else {
                    this.setState({answers: null, errorRequest: cant, isLoading: false})
                }
            }
        }).catch(error => {
            this.setState({answers: null, errorRequest: error, isLoading: false})
        });
    }

    render() {
        const arrayColumns = ["Cliente", "Repuesta"];
        const {classes} = this.props;
        const {answers, rowsPerPage, page} = this.state;
        let emptyRows = null;
        if (answers != null) {
            emptyRows = rowsPerPage - Math.min(rowsPerPage, answers.length - page * rowsPerPage);
        }
        return (
            <Fragment>
                {
                    answers == null ? (<h1>Cargando Pregunta</h1>) : (
                        <Paper className={classes.root}>
                            <div>
                                <Table Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            {
                                                arrayColumns.map((colums, index) => {
                                                    return <TableCell key={index}>{colums}</TableCell>
                                                })
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {answers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(answer => (
                                            <TableRow key={answer.id}>
                                                <CustomTableCell component="th"
                                                                 scope="row"> {answer.answer.interviewedName !== null ? answer.answer.interviewedName : answer.answer.client.nombreFactura}</CustomTableCell>
                                                <CustomTableCell style={{textAlign: 'left',}}
                                                                 numeric> {answer.answerDetail}</CustomTableCell>
                                            </TableRow>
                                        ))}
                                        {emptyRows > 0 && (
                                            <TableRow style={{height: 48 * emptyRows}}>
                                                <TableCell colSpan={6}/>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[50]}
                                                colSpan={3}
                                                count={answers.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                onChangePage={this.handleChangePage}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                        </Paper>
                    )
                }
            </Fragment>
        );
    }
}

export default withStyles(styles)(FreeAnswerTable);

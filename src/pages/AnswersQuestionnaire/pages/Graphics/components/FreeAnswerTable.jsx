import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Constants from "../../../../../Constants";
import * as StringFormatUtil from "../../../../../utils/StringFormatUtil";
import TablePaginationCustom from "../../../../../components/tablePagination/TablePaginationCustom";

const CustomTableCell = withStyles(theme => ({
    head: {backgroundColor: theme.palette.common.black, color: theme.palette.common.white,},
    body: {fontSize: 14,},
}))(TableCell);

class FreeAnswerTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: null, errorRequest: null, isLoading: true, cant: null, pivot: 1, ant: false, page: 0,
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
        Promise.all([fetch(urlAnswers), fetch(urlCantData)]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()])).then(([answers, cant]) => {
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
        const {answers, rowsPerPage, page} = this.state;
        const columns = ["Cliente", "Repuesta"];
        let emptyRows = null;
        if (answers != null) {
            emptyRows = rowsPerPage - Math.min(rowsPerPage, answers.length - page * rowsPerPage);
        }
        return (
            <Fragment >
                {answers == null ? (<h1>Cargando Pregunta</h1>) : (
                    <TablePaginationCustom rows={answers} page={page} rowsPerPage={rowsPerPage} columns={columns}
                                           handleChangePage={this.handleChangePage}
                                           handleChangeRowsPerPage={this.handleChangeRowsPerPage}>
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
                    </TablePaginationCustom>
                )}
            </Fragment>
        );
    }
}

export default FreeAnswerTable;

import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class FreeAnswerTable extends Component {

    render() {
        const arrayColums =["Cliente", "Repuesta"];
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Table Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                arrayColums.map((colums, index) => {
                                    return <TableCell key={index}>{colums}</TableCell>
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.data.data.answers.map((answer) => {
                                return(
                                    <TableRow key={answer.id}>
                                        <CustomTableCell component="th" scope="row"> {answer.answer.interviewedName !== null ? answer.answer.interviewedName : answer.answer.client.nombreFactura }</CustomTableCell>
                                        <CustomTableCell style={{textAlign: 'left',}} numeric> {answer.answerDetail}</CustomTableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

            </Paper>
        );
    }
}

export default withStyles(styles) (FreeAnswerTable);
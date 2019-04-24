import React, {Component} from 'react';
import JsxStyles from '../../styles/JsxStyles';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/es/Paper/Paper";
import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableFooter from "@material-ui/core/es/TableFooter/TableFooter";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TablePagination from "@material-ui/core/es/TablePagination/TablePagination";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import connect from "react-redux/es/connect/connect";
import {getCreateCenterMasterAndCost} from "../../reducers";
import {
    createCenterCostConditionServerBi,
    deleteCenterCostConditionServerBi,
    getBusinessServerBi,
    getCenterCostConditionServerBi, getChannelServerBi,
    getCostCenterServerBi,
    getLineCostServerBi,
    getOrganizationServerBi, getRegionServerBi, getSubRegionServerBi, updateCenterCostConditionSeverBi
} from "../../actions/indexthunk";
import Button from "@material-ui/core/es/Button";

let counter = 0;

function createData(name, calories, fat) {
    counter += 1;
    return {id: counter, name, calories, fat};
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class CostConditions extends Component {

    state = {
        rows: [
            createData('Cupcake', 305, 3.7),
            createData('Donut', 452, 25.0),
            createData('Eclair', 262, 16.0),
            createData('Frozen yoghurt', 159, 6.0),
            createData('Gingerbread', 356, 16.0),
            createData('Honeycomb', 408, 3.2),
            createData('Ice cream sandwich', 237, 9.0),
            createData('Jelly Bean', 375, 0.0),
            createData('KitKat', 518, 26.0),
            createData('Lollipop', 392, 0.2),
            createData('Marshmallow', 318, 0),
            createData('Nougat', 360, 19.0),
            createData('Oreo', 437, 18.0),
        ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
        page: 0,
        rowsPerPage: 5,
    };

    handleChangePage = (event, page) => {
        this.setState({page})
    };

    handleChangeRowsPerPage = event => {
        this.setState({page: 0, rowsPerPage: event.target.value})
    };

    renderError() {
        const status = this.props.reduxVariable.errorRequest.status;
        return (
            <React.Fragment>
                <h1> Error {status}</h1>
                <Button color={"primary"} variant="contained" style={{background: "red"}}
                        onClick={this.props.cleanResponse}> Aceptar</Button>
            </React.Fragment>
        )
    }

    render() {
        const {classes} = this.props;
        const {rows, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        if (this.props.reducerVariable.errorRequest) {
            return this.renderError()
        }

        return (
            <div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell >UNO</CustomTableCell>
                                    <CustomTableCell align="right">UNO </CustomTableCell>
                                    <CustomTableCell align="right">UNO </CustomTableCell>
                                    <CustomTableCell align="right">UNO </CustomTableCell>
                                    <CustomTableCell align="right"> UNO</CustomTableCell>
                                    <CustomTableCell align="right">UNO </CustomTableCell>
                                    <CustomTableCell align="right">UNO </CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                    <TableRow>
                                        <TableCell component={"th"} scope={"row"}>{row.name}</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>4</TableCell>
                                        <TableCell>5</TableCell>
                                        <TableCell>6</TableCell>
                                        <TableCell>7</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={rows.length}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        page={page}
                                        rowsPerPage={rowsPerPage}/>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>
            </div>
        );
    }

    componentDidMount() {

    }
}

const mapStateToProps = state => ({
    reducerVariable: getCreateCenterMasterAndCost(state),
});

const mapDispatchToProps = dispatch => ({
    getCenterCostConditionBi: () => dispatch(getCenterCostConditionServerBi()),
    getCostCenterBi: () => dispatch(getCostCenterServerBi()),
    getBusinessBi:() => dispatch(getBusinessServerBi()),
    getLineCostBi:() => dispatch(getLineCostServerBi()),
    getOrganizationBi: () => dispatch(getOrganizationServerBi()),
    getChannelBi:() => dispatch(getChannelServerBi()),
    getRegionBi:() => dispatch(getRegionServerBi()),
    getSubRegionBi:() => dispatch(getSubRegionServerBi()),
    deleteCenterCostCondition:(id) => dispatch(deleteCenterCostConditionServerBi(id)),
    updateCenterCostCondition:(id, center, business, line, organization, channel, region, subRegion) => dispatch(updateCenterCostConditionSeverBi(id, center, business, line, organization, channel, region, subRegion)),
    createCenterCostConditionServerBi:(id, center, business, line, organization, channel, region, subRegion) => dispatch(createCenterCostConditionServerBi(id, center, business, line, organization, channel, region, subRegion))
});

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(JsxStyles)(CostConditions));

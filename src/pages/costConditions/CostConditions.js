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
    getInitialDataCenterCostConditionServerBi,
    updateCenterCostConditionSeverBi
} from "../../actions/indexthunk";
import Button from "@material-ui/core/es/Button";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import ModalGeneric from "../../widgets/Modal/components/ModalGeneric";
import DialogEditCostCondition from "./components/DialogEditCostCondition";
import CostCondition from "../../models/CostCondition";

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

    constructor(props){
        super(props);
        const itemDefault = new CostCondition();
        this.state = {
            page: 0,
            open: false,
            itemSelected: itemDefault,
            rowsPerPage: 5,
        };
    }

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

    handleCloseDialogEditItem = () => {
        this.setState({open: false, itemSelected: null})
    };

    handleOpenClickItem = (item) => {
        this.setState({open: true, itemSelected: item})
    };

    render() {
        const {classes} = this.props;
        const {centerCostConditions, load, business, centerCost,
            channel, lineCost, organization, region, subRegion} = this.props.reducerVariable;
        const {rowsPerPage, page} = this.state;
        if (this.props.reducerVariable.errorRequest) {
            return this.renderError()
        }
        console.log(this.props.reducerVariable);
        return (
            <div>
                {
                    load ?
                        <CircularProgress size={500} style={{color: '#03A8E4'[200]}} thickness={5}/> :
                        <div>
                            <ModalGeneric open={this.state.open} onClose={this.handleCloseDialogEditItem}>
                                <DialogEditCostCondition
                                    item={this.state.itemSelected}
                                    business={business}
                                    centerCost={centerCost}
                                    channel={channel}
                                    lineCost={lineCost}
                                    organization={organization}
                                    region={region}
                                    subRegion={subRegion}/>
                            </ModalGeneric>
                            <Toolbar>
                                <Button variant="contained" color={"primary"}> Nuevo </Button>
                            </Toolbar>
                            <Paper className={classes.root}>
                                <div className={classes.tableWrapper}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <CustomTableCell>ID</CustomTableCell>
                                                <CustomTableCell align="left">CenterCost </CustomTableCell>
                                                <CustomTableCell align="left">Business</CustomTableCell>
                                                <CustomTableCell align="left">Channel </CustomTableCell>
                                                <CustomTableCell align="left">LineCost</CustomTableCell>
                                                <CustomTableCell align="left">Organization</CustomTableCell>
                                                <CustomTableCell align="left">Region </CustomTableCell>
                                                <CustomTableCell align="left">SubRegion </CustomTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {console.log(centerCostConditions)}
                                            {centerCostConditions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                                                <TableRow hover onClick={() => this.handleOpenClickItem(item)} key={item.id}>
                                                <TableCell component={"th"} scope={"row"}>{item.id}</TableCell>
                                                <TableCell>{item.centerCost}</TableCell>
                                                <TableCell>{item.business}</TableCell>
                                                <TableCell>{item.channel}</TableCell>
                                                <TableCell>{item.line}</TableCell>
                                                <TableCell>{item.organization}</TableCell>
                                                <TableCell>{item.region}</TableCell>
                                                <TableCell>{item.subRegion}</TableCell>
                                                </TableRow>
                                                ))}
                                        </TableBody>

                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    count={centerCostConditions.length}
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
                }
            </div>
        );
    }

    componentDidMount() {
        this.props.initialDataCenterCostConditionServerBi()
    }
}

const mapStateToProps = state => ({
    reducerVariable: getCreateCenterMasterAndCost(state),
});

const mapDispatchToProps = dispatch => ({
    deleteCenterCostCondition: (id) => dispatch(deleteCenterCostConditionServerBi(id)),
    updateCenterCostCondition: (id, center, business, line, organization, channel, region, subRegion) => dispatch(updateCenterCostConditionSeverBi(id, center, business, line, organization, channel, region, subRegion)),
    createCenterCostConditionServerBi: (id, center, business, line, organization, channel, region, subRegion) => dispatch(createCenterCostConditionServerBi(id, center, business, line, organization, channel, region, subRegion)),
    initialDataCenterCostConditionServerBi: () => dispatch(getInitialDataCenterCostConditionServerBi())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(JsxStyles)(CostConditions));

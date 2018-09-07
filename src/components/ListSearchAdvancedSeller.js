import React, {Component} from 'react';
import Constants from "../Constants";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import classNames from "classnames";
import {withStyles} from '@material-ui/core/styles';
import connect from "react-redux/es/connect/connect";
import {
    getAllBranch,
    getAllCity, getBranchByIdCity, getBranchesById,
    getMobileAssignement,
    getQueryMobileSellerAssignedBranch,
    getQueryMobileSellerAssignedType,
    getQueryMobileSellerBranch,
    getQueryMobileSellerType,
    getTypeByCodSapQuestionerQuestionary,
    getTypesSeller,
    getUser
} from "../reducers";
import {
    addAssignementUser,
    addParamFilterMobileSellerAssignedBranch,
    addParamFilterMobileSellerAssignedType,
    addParamFilterMobileSellerBranch,
    addParamFilterMobileSellerType, concatFilterMobileSellerAssignedBranch, concatFilterMobileSellerBranch,
    deleteParamFilterMObileSelledeleterAssignedType, deleteParamFilterMobileSellerAssignedBranch,
    deleteParamFilterMobileSellerBranch,
    deleteParamFilterMobileSellerType
} from "../actions";
import {existElementInList, getIndexQuestionary, remove, filter} from '../Util/ArrayFilterUtil';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

class ListSearchAdvancedSeller extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: [0],
            citiesSelectedList: [],
            branchesList:[]
        }
    }

    handleCheck(item, typeList){
        switch (typeList) {
            case Constants.SELLER_LIST: {
                if (!existElementInList(item, this.props.querySearchSellerByType)){
                    this.props.addParamFilterMobileSellerType(item)
                } else {
                    this.props.deleteParamFilterMobileSellerType(item)
                }
            }
            case Constants.CITIES_LIST: {
                const citiesSelected = this.state.citiesSelectedList;
                if (existElementInList(item, citiesSelected)){
                    remove(citiesSelected, item)
                } else {
                    citiesSelected.push(item)
                }
                this.setState({citiesSelectedList: citiesSelected});
                const branchListCity = getBranchByIdCity(this.props.branches ,item.id);
                this.handleCheck(branchListCity, Constants.ADD_BRANCHES_LIST);

                console.log(branchListCity);
                console.log(this.state.citiesSelectedList)
            }
            case Constants.BRANCHES_LIST:{
                if (!existElementInList(item, this.props.querySearchSellerByBranch)){
                    this.props.addParamFilterMobileSellerBranch(item)
                } else {
                    this.props.deleteParamFilterMobileSellerBranch(item)
                }
            }
            case Constants.ADD_BRANCHES_LIST:{
                this.props.concatParamFilterMobileSellerBranch(item)
            }
            default:{

            }
        }
        return this.isChecked(item)
    }

    isChecked(item){
       let exist = getIndexQuestionary(this.props.querySearchSellerByType,item);
       return exist !== -1;
    }

    render() {
        const {classes} = this.props;
        let innerComponent = null;
        switch (this.props.type) {
            case Constants.LIST_TYPE_SELLERS:{
                innerComponent = <div className={classes.column}>
                    <h2>Tipos de Usuario</h2>
                    <List className={this.props.classes.root} subheader={<li />}>
                        {this.props.list.map(typeSeller => (
                            <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                <ListItemText primary={typeSeller.nombre } />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        onChange={() => this.handleCheck(typeSeller, Constants.SELLER_LIST)}
                                        checked={this.isChecked(typeSeller)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>;
                break;
            }
            case Constants.LIST_CITY:{
                innerComponent = <div className={classNames(classes.column, classes.helper)}>
                    <h2>Ciudades</h2>
                    <List className={this.props.classes.root} subheader={<li />}>
                        {this.props.list.map(typeSeller => (
                            <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                <ListItemText primary={typeSeller.nombre } />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        onChange={() => this.handleCheck(typeSeller, Constants.CITIES_LIST)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>;
                    break;
            }
            case Constants.LIST_BRANCHES:{
                innerComponent = <div className={classNames(classes.column, classes.helper)}>
                    <h2>Sucursales</h2>
                    <List className={this.props.classes.root} subheader={<li />}>
                        {this.state.branchesList.map(typeSeller => (
                            <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                <ListItemText primary={typeSeller.nombre } />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        onChange={() => this.handleCheck(typeSeller, Constants.BRANCHES_LIST)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>;
                    break;
            }
        }

        return (
            <div>
                {innerComponent}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    assignmentUser: getMobileAssignement(state),
    typeQuestionerQuestionary: getTypeByCodSapQuestionerQuestionary(state, Constants.CODSAP_QUESTIONER_QUESTIONARY_OPEN),
    querySearchView: state.queryMobileSeller,
    user: getUser(state),
    typeSeller: getTypesSeller(state),
    cities: getAllCity(state),
    branches: getAllBranch(state),
    querySearchSellerByType: getQueryMobileSellerType(state),
    querySearchSellerByBranch: getQueryMobileSellerBranch(state),
    querySearchSellerAssignedByType: getQueryMobileSellerAssignedType(state),
    querySearchSellerAssignedByBranch: getQueryMobileSellerAssignedBranch(state),
});

const mapDispatchToProps = dispatch => ({
    addAssignementUser: value => dispatch(addAssignementUser(value)),
    addParamFilterMobileSellerType: value => dispatch(addParamFilterMobileSellerType(value)),
    addParamFilterMobileSellerBranch: value => dispatch(addParamFilterMobileSellerBranch(value)),
    concatParamFilterMobileSellerBranch: value => dispatch(concatFilterMobileSellerBranch(value)),
    addParamFilterMobileSellerAssignedType: value => dispatch(addParamFilterMobileSellerAssignedType(value)),
    addParamFilterMobileSellerAssignedBranch: value => dispatch(addParamFilterMobileSellerAssignedBranch(value)),
    concatParamFilterMobileSellerAssignedBranch: value => dispatch(concatFilterMobileSellerAssignedBranch(value)),
    deleteParamFilterMobileSellerType: value => dispatch(deleteParamFilterMobileSellerType(value)),
    deleteParamFilterMobileSellerBranch: value => dispatch(deleteParamFilterMobileSellerBranch(value)),
    deleteParamFilterMObileSelledeleterAssignedType: value => dispatch(deleteParamFilterMObileSelledeleterAssignedType(value)),
    deleteParamFilterMobileSellerAssignedBranch: value => dispatch(deleteParamFilterMobileSellerAssignedBranch(value)),

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListSearchAdvancedSeller));
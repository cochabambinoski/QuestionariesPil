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
import {ScrollPanel} from "primereact/scrollpanel";


import {
    getAllBranch,
    getAllCity,
    getBranchByIdCity,
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
    addParamFilterMobileSellerType, changeOperationIdBranchSeller, changeOperationIdBranchSellerAssigned, cleanFilter,
    concatFilterMobileSellerAssignedBranch,
    concatFilterMobileSellerBranch,
    deleteParamFilterMobileSellerAssignedBranch,
    deleteParamFilterMobileSellerAssignedType,
    deleteParamFilterMobileSellerBranch,
    deleteParamFilterMobileSellerType
} from "../actions";
import {
    existElementInList,
    getIndexQuestionary,
    remove,
    filter,
    getIndexItem,
    changeOperationId
} from '../Util/ArrayFilterUtil';

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
    listItem: {
        marginBottom: '5px',
    },
});

class ListSearchAdvancedSeller extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: [0],
            citiesSelectedList: [],
            branchesList: []
        }
    }


    OperationId(id, operacionId) {
        this.id = id;
        this.operacionId = operacionId;
    }

    typeSearchAdvances = () => {
        if (this.props.typeSearch === Constants.TYPE_SEARCH_MOBILE_SELLER) {
            return true
        } else {
            return false
        }
    };

    handleCheck(item, typeList) {
        switch (typeList) {
            case Constants.SELLER_LIST: {
                switch (this.props.typeSearch) {
                    case Constants.TYPE_SEARCH_MOBILE_SELLER: {
                        if (!existElementInList(item, this.props.querySearchSellerByType)) {
                            this.props.addParamFilterMobileSellerType(item)
                            return;
                        } else {
                            this.props.deleteParamFilterMobileSellerType(item)
                            return;
                        }
                    }
                    case Constants.TYPE_SEARCH_MOBILE_SELLER_ASSIGNED: {
                        if (!existElementInList(item, this.props.querySearchSellerAssignedByType)) {
                            this.props.addParamFilterMobileSellerAssignedType(item)
                            return;
                        } else {
                            this.props.deleteParamFilterMObileSelledeleterAssignedType(item)
                            return;
                        }
                    }
                    default: {
                        return;
                    }
                }
            }
            case Constants.CITIES_LIST: {
                const citiesSelected = this.state.citiesSelectedList;
                if (existElementInList(item, citiesSelected)) {
                    remove(citiesSelected, item);
                    const branchListCity = getBranchByIdCity(this.props.branches, item.id);
                    console.log(branchListCity)
                    branchListCity.forEach((branch) => (this.typeSearchAdvances() ? this.props.deleteParamFilterMobileSellerBranch(branch) :
                        this.props.deleteParamFilterMobileSellerAssignedBranch(branch)));
                } else {
                    citiesSelected.push(item);
                    const branchListCity = getBranchByIdCity(this.props.branches, item.id);
                    console.log(branchListCity)
                    branchListCity.forEach((branch) => (this.typeSearchAdvances() ? this.props.addParamFilterMobileSellerBranch(branch) :
                        this.props.addParamFilterMobileSellerAssignedBranch(branch)));
                }
                this.setState({citiesSelectedList: citiesSelected});
                return;
            }
            case Constants.BRANCHES_LIST: {
                if (this.typeSearchAdvances()) {
                    if (item.operacionId === 1) {
                        this.props.changeOperationIdBranchSeller(new this.OperationId(item.id, 0))
                    } else {
                        this.props.changeOperationIdBranchSeller(new this.OperationId(item.id, 1))
                    }
                } else {
                    if (item.operacionId === 1) {
                        this.props.changeOperationIdBranchSellerAssigned(new this.OperationId(item.id, 0))
                    } else {
                        this.props.changeOperationIdBranchSellerAssigned(new this.OperationId(item.id, 1))
                    }
                }
                return;
            }
            default: {
                console.log("error");
                return;
            }
        }
    }

    branchAvailable(list, item) {
        let available = false;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === item.id) {
                if (item.operacionId === 1) {
                    return available = true;
                }
            }
        }

        return available
    }

    isChecked(item) {
        let exist = getIndexQuestionary(this.props.querySearchSellerByType, item);
        return exist !== -1;
    }

    existBranchInTheList(city) {
        let branches = null;
        if (this.typeSearchAdvances()) {
            branches = filter.call(this.props.querySearchSellerByBranch, function (branch) {
                return branch.departamento.id === city.id
            })
        } else {
            branches = filter.call(this.props.querySearchSellerAssignedByBranch, function (branch) {
                return branch.departamento.id === city.id
            })
        }

        if (branches.length > 0) {
            return true
        } else {
            return false
        }

    }

    componentWillUnmount() {
        this.props.cleanFilter()
    }

    render() {
        const {classes} = this.props;
        let innerComponent = null;
        switch (this.props.type) {
            case Constants.LIST_TYPE_SELLERS: {
                innerComponent = <div className={classes.column}>
                    <h2>Tipos de Usuario</h2>
                    <ScrollPanel style={{width: '100%', height: '250px'}} className="custom">
                        <List className={this.props.classes.root} subheader={<li/>}>
                            {this.props.list.map(typeSeller => (
                                <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                    <ListItemText primary={typeSeller.nombre}/>
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            onChange={() => this.handleCheck(typeSeller, Constants.SELLER_LIST)}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </ScrollPanel>
                </div>;
                break;
            }
            case Constants.LIST_CITY: {
                innerComponent = <div className={classNames(classes.column, classes.helper)}>
                    <h2>Ciudades</h2>
                    <ScrollPanel style={{width: '100%', height: '250px'}} className="custom">
                        <List className={this.props.classes.root} subheader={<li/>}>
                            {this.props.list.map(city => (
                                <ListItem key={city.id} dense button className={classes.listItem}>
                                    <ListItemText primary={city.nombre}/>
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            checked={this.existBranchInTheList(city)}
                                            onChange={() => this.handleCheck(city, Constants.CITIES_LIST)}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </ScrollPanel>
                </div>;
                break;
            }
            case Constants.LIST_BRANCHES: {
                innerComponent = <div className={classNames(classes.column, classes.helper)}>
                    <h2>Sucursales</h2>
                    <ScrollPanel style={{width: '100%', height: '250px'}} className="custom">
                        <List className={this.props.classes.root} subheader={<li/>}>
                            {
                                this.typeSearchAdvances() ?
                                    this.props.querySearchSellerByBranch.map(branch => (
                                        <ListItem key={branch.id} dense button className={classes.listItem}>
                                            <ListItemText primary={branch.nombre}/>
                                            <ListItemSecondaryAction>
                                                <Checkbox
                                                    checked={this.branchAvailable(this.props.querySearchSellerByBranch, branch)}
                                                    onChange={() => this.handleCheck(branch, Constants.BRANCHES_LIST)}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )) :
                                    this.props.querySearchSellerAssignedByBranch.map(branch => (
                                        <ListItem key={branch.id} dense button className={classes.listItem}>
                                            <ListItemText primary={branch.nombre}/>
                                            <ListItemSecondaryAction>
                                                <Checkbox
                                                    checked={this.branchAvailable(this.props.querySearchSellerAssignedByBranch, branch)}
                                                    onChange={() => this.handleCheck(branch, Constants.BRANCHES_LIST)}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                            }
                        </List>
                    </ScrollPanel>
                </div>;
                break;
            }
            default: {
                return null;
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
    addParamFilterMobileSellerAssignedType: value => dispatch(addParamFilterMobileSellerAssignedType(value)),
    addParamFilterMobileSellerAssignedBranch: value => dispatch(addParamFilterMobileSellerAssignedBranch(value)),
    deleteParamFilterMobileSellerType: value => dispatch(deleteParamFilterMobileSellerType(value)),
    deleteParamFilterMobileSellerBranch: value => dispatch(deleteParamFilterMobileSellerBranch(value)),
    changeOperationIdBranchSeller: value => dispatch(changeOperationIdBranchSeller(value)),
    deleteParamFilterMObileSelledeleterAssignedType: value => dispatch(deleteParamFilterMobileSellerAssignedType(value)),
    deleteParamFilterMobileSellerAssignedBranch: value => dispatch(deleteParamFilterMobileSellerAssignedBranch(value)),
    changeOperationIdBranchSellerAssigned: value => dispatch(changeOperationIdBranchSellerAssigned(value)),
    cleanFilter: () => dispatch(cleanFilter(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListSearchAdvancedSeller));
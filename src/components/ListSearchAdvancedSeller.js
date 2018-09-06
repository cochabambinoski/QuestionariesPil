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
    getAllCity,
    getMobileAssignement,
    getTypeByCodSapQuestionerQuestionary,
    getTypesSeller,
    getUser
} from "../reducers";
import {
    addAssignementUser,
    deleteAllAssignementUser,
    deleteAssignementUser,
    deleteMobileSellers,
    editQueryTextAssignedQuestionary,
    editQueryTextMobileSellerAssignedList,
    editQueryTextMobileSellerList
} from "../actions";

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

    state = {
        checked: [0],
    };

    handleCheck(item, checked){
        console.log(item.nombre);
        console.log(checked)
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
                                        onChange={() => this.handleCheck(typeSeller, this.state.checked.indexOf(typeSeller) !== -1)}
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
                                        onChange={() => this.handleCheck(typeSeller, this.checked)}
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
                        {this.props.list.map(typeSeller => (
                            <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                <ListItemText primary={typeSeller.nombre } />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        onChange={() => this.handleCheck(typeSeller, this.checked)}
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
    cities: getAllCity(state)
});

const mapDispatchToProps = dispatch => ({
    addAssignementUser: value => dispatch(addAssignementUser(value)),
    deleteAssignementUser: value => dispatch(deleteAssignementUser(value)),
    deleteAllAssignementUser: value => dispatch(deleteAllAssignementUser()),
    deleteMobileSeller: value => dispatch(deleteMobileSellers(value)),
    editQueryTextMobileSellerList: value => dispatch(editQueryTextMobileSellerList(value)),
    editQueryTextMobileSellerAssignedList: value => dispatch(editQueryTextMobileSellerAssignedList(value)),
    editQueryTextAssignedQuestionary: value => dispatch(editQueryTextAssignedQuestionary(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListSearchAdvancedSeller));
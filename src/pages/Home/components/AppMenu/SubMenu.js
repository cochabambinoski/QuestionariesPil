import React, {Component} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {setMenuContainer} from '../../../../actions'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    answersRoute,
    assigmentRoute,
    conceptCenterRoute,
    costConditionsRoute,
    expensesGenerationRoute,
    indexRoute,
    loadBaseInputRoute,
    questionariesRoute,
    segmentRoute,
    typeCenterRoute
} from "../../../../routes/PathRoutes";

const styles = () => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#3b3e47',
        background: '#3b3e47',
        important: 'true',
    },
    menuItem: {
        background: '#3b3e47',
        '&:hover': {
            backgroundColor: '#2471a3',
            '& $primary, & $icon': {
                color: '#2471a3',
            },
        },
    },
    important: 'true',
});

class SubMenu extends Component {

    state = {
        anchorEl: null,
        selectedIndex: 1,
    };

    handleClickListItem = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (event, index, option) => {
        let idSubMenu = this.props.menus[index].id;
        this.props.setIdMenu(option);
        this.setState({selectedIndex: idSubMenu, anchorEl: null});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    getUrl = (option) => {
        switch (option.transaccion.ruta) {
            case 'Start':
                return "/";
            case 'QuestionaryContainer':
                return questionariesRoute;
            case 'AssignmentQuestionary':
                return assigmentRoute;
            case 'AnwserQuestionaryContainer':
                return answersRoute;
            case 'ListSegment':
                return segmentRoute;
            case 'expensesGeneration':
                return expensesGenerationRoute;
            case 'loadInputAndExpensesBase':
                return loadBaseInputRoute;
            case 'costCondition':
                return costConditionsRoute;
            case 'conceptCenter':
                return conceptCenterRoute;
            case 'typeCenter':
                return typeCenterRoute;
            default:
                return indexRoute;
        }
    };

    render() {
        const {classes, title, menus} = this.props;
        const {anchorEl} = this.state;
        return (
            <div className={classes.root}>
                <div className="content-section implementation">
                    <List component="nav" className={classes.root}>
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="When device is locked"
                            onClick={this.handleClickListItem}
                            className="navItemBackground">
                            <ListItemText>
                                <div className="navItemsColor">{title}</div>
                            </ListItemText>
                        </ListItem>
                    </List>
                </div>
                <Menu style={{padding: 0, margin: 0}}
                      id="lock-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleClose}>
                    {menus.map((option, index) => (
                        <Link to={{pathname: this.getUrl(option)}} key={option.id}>
                            <MenuItem style={{padding: 20}}
                                      key={option.id}
                                      onClick={event => this.handleMenuItemClick(event, index, option)}
                                      className={classes.menuItem}>
                                <div className="navItemsColor">{option.label}</div>
                            </MenuItem>
                        </Link>
                    ))}
                </Menu>
            </div>
        )
    }

}

const mapDispatchToPropsActions = dispatch => (
    {
        setIdMenu: value => dispatch(setMenuContainer(value))
    }
);

export default connect(null, mapDispatchToPropsActions)(withStyles(styles)(SubMenu));

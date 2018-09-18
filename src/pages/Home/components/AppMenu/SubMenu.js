import React, {Component} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {setMenuContainer} from '../../../../actions'
import {connect} from 'react-redux';

const styles = withStyles => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#3b3e47',
        background: '#3b3e47' ,
        important: 'true',

    },
    navItemBackground:{
        hover:{
            background: '#2471a3' ,
            important: 'true',
        },
        background: '#2471a3' ,
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
        let idSubMenu = this.props.submenus[index].id;
        this.props.setIdMenu(option);
        this.setState({selectedIndex: idSubMenu, anchorEl: null});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes, title, submenus} = this.props;
        const {anchorEl} = this.state;
        console.log(submenus)
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
                            <ListItemText >
                                <div className="navItemsColor">{title}</div>
                            </ListItemText>
                        </ListItem>
                    </List>

                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}>
                        className={classes.root}
                        {submenus.map((option, index) => (
                            <MenuItem
                                key={option.id}
                                selected={index === this.state.selectedIndex}
                                onClick={event => this.handleMenuItemClick(event, index, option)}
                                className={classes.root}
                            >
                                <div className="navItemsColor">{option.label}</div>
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
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
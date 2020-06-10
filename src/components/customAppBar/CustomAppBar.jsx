import React, {Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import SubMenu from "../subMenu/SubMenu";
import pilLogo from "../../images/pil.png";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#4d505b'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: '#4d505b'
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#4d505b'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    nameUser: {
        textAlign: 'center',
        color: 'white'
    },
    iconColor: {
        color: "white"
    }
});

function CustomAppBar(props) {

    const {menu} = props;
    const {classes} = props;
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }
    return (
        <Fragment>
            <CssBaseline/>
            <AppBar position={"fixed"}
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}>
                <Toolbar>
                    <IconButton color={"inherit"} aria-label={"open drawer"} onClick={handleDrawerOpen}
                                edge={"start"} className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant={"persistent"} anchor={"left"} open={open}
                    classes={{paper: classes.drawerPaper}}>
                <div className={classes.drawerHeader}>
                    <IconButton className={classes.iconColor} onClick={handleDrawerClose}>
                        { <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <img src={pilLogo} alt={'logo'}/>
                <h4 className={classes.nameUser}>{props.user.username}</h4>
                <List>
                    {menu.items.map((itemMenu) => {
                        return <SubMenu menu={itemMenu} key={itemMenu.id} handleDrawerClose={handleDrawerClose}/>
                    })}
                </List>
            </Drawer>
            <main >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        </Fragment>
    );
}
export default withStyles(useStyles)(CustomAppBar)
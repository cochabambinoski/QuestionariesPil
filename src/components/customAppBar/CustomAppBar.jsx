import React, {Fragment} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useTheme} from "@material-ui/styles";
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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
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
        padding: theme.spacing(3),
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
}));

export default function CustomAppBar(props) {

    const {menu} = props;
    console.log(menu)
    const classes = useStyles();
    const theme = useTheme();
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
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {menu.items.map((itemMenu) => {
                        return <SubMenu menu={itemMenu} key={itemMenu.id}/>
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

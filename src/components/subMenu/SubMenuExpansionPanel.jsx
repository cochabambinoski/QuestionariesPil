import React, {Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
    answersRoute,
    assigmentRoute,
    conceptCenterRoute,
    costConditionsRoute,
    exchangeRateRoute,
    expensesGenerationRoute, indexRoute,
    jobsEtlRoute,
    loadBaseInputRoute,
    operatingAccountsRoute,
    periodAndAccountRegistrationRoute,
    questionariesRoute,
    segmentRoute,
    typeCenterRoute
} from "../../routes/PathRoutes";

const useStyles = theme => ({
    root: {
        width: '100%',
        textAlign: 'left',
        color: 'white',
        fontWeight: 100,
    },
    heading: {
        fontSize: theme.typography.pxToRem(12),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(12),
        color: theme.palette.text.secondary,
    },
    text_menu_item: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#4d505b',
        '&:hover': {
            background: "#116fbf",
        },
        typography: {
            "fontWeight": 100,
        }
    }
});

function SubMenuExpansionPanel(props) {
    const {menu, handleDrawerClose} = props;
    const {classes} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const getUrl  = (option) => {
        const {transaccion} = option;
        const {ruta} = transaccion;
        switch (ruta) {
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
            case 'accountPeriod':
                return periodAndAccountRegistrationRoute;
            case 'exchangeRate':
                return exchangeRateRoute;
            case 'operatingAccounts':
                return operatingAccountsRoute;
            case 'conceptCenter':
                return conceptCenterRoute;
            case 'typeCenter':
                return typeCenterRoute;
            case 'jobsETL':
                return jobsEtlRoute;
            default:
                return indexRoute;
        }
    };

    function closeNavAndMenu(props) {
        handleClose();
        props.handleDrawerClose()
    }

    return (
        <Fragment>
            <div>
                <h3 onClick={handleClick} className={classes.root}>{menu.label}</h3>
                <Menu id={menu.id} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    {menu.items.map((item) => {
                        return (
                            <Link to={{pathname: getUrl(item)}} key={item.id} onClick={() => closeNavAndMenu(props)}>
                                <MenuItem className={classes.text_menu_item}>
                                    {item.label}
                                </MenuItem>
                            </Link>
                        )})}
                </Menu>
            </div>
        </Fragment>
    );
}
export default withStyles(useStyles)(SubMenuExpansionPanel)
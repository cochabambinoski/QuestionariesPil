import React, {Fragment} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function SubMenuExpansionPanel(props) {
    const {menu} = props;
    const classes = useStyles();
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

    return (
        <Fragment>
            <div>
                <h3 onClick={handleClick} className={classes.root}>{menu.label}</h3>
                <Menu id={menu.id} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    {menu.items.map((item) => {
                        return (
                            <Link to={{pathname: getUrl(item)}} key={item.id}>
                                <MenuItem>
                                    {item.label}
                                </MenuItem>
                            </Link>
                        )})}
                </Menu>
            </div>
        </Fragment>
    );
}

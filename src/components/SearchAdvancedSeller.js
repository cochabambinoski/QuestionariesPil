import React, {Component} from 'react';
import {
    getAllCity,
    getMobileAssignement,
    getTypeByCodSapQuestionerQuestionary,
    getTypesSeller,
    getUser
} from "../reducers";
import Constants from "../Constants";
import {InputText} from 'primereact/inputtext';
import {editQueryTextMobileSellerAssignedList, editQueryTextMobileSellerList} from "../actions";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {connect} from 'react-redux';
import ListSearchAdvancedSeller from "./ListSearchAdvancedSeller";

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

class SearchAdvancedSeller extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: null,
            questionerQuestionaryList: [],
            expandFirstSellerSearch: false,
            expandSecondSearch: false,
            hasNewAssignments: false,

        }
    }

    handleSetStateFirstSellerSearch = () => {
        const isExpanded = this.state.expandFirstSellerSearch;
        if (isExpanded) {
            this.setState({expandFirstSellerSearch: false});
        } else {
            this.setState({expandFirstSellerSearch: true});
        }
    };

    typeSearchAdvances = () => {
        if (this.props.typeSearch === Constants.TYPE_SEARCH_MOBILE_SELLER) {
            return Constants.TYPE_SEARCH_MOBILE_SELLER
        } else {
            return Constants.TYPE_SEARCH_MOBILE_SELLER_ASSIGNED
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <ExpansionPanel expanded={this.state.expandFirstSellerSearch}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                        this.handleSetStateFirstSellerSearch()
                    }}/>}>
                        <div className={classes.column}>
                            <InputText value={this.state.value1} onChange={(e) =>
                                this.props.typeSearch === Constants.TYPE_SEARCH_MOBILE_SELLER ? this.props.editQueryTextMobileSellerList(e.target.value) :
                                    this.props.editQueryTextMobileSellerAssignedList(e.target.value)} placeholder={'Nombre del vendedor'}/>
                        </div>
                        <div>
                            {this.props.typeSearch === Constants.TYPE_SEARCH_MOBILE_SELLER ?
                                <Typography className={classes.heading}>Vendedores Disponibles</Typography> :
                                <Typography className={classes.heading}>Vendedores Asignados</Typography>}

                        </div>
                    </ExpansionPanelSummary>
                    <Divider/>
                    <ExpansionPanelDetails className={classes.details}>

                        <ListSearchAdvancedSeller
                            typeSearch={this.props.typeSearch} list={this.props.typeSeller}
                            type={Constants.LIST_TYPE_SELLERS} idQuestionary={this.props.idQuestionary}/>
                        <ListSearchAdvancedSeller
                            typeSearch={this.props.typeSearch} list={this.props.cities} type={Constants.LIST_CITY} idQuestionary={this.props.idQuestionary}/>
                        <ListSearchAdvancedSeller
                            typeSearch={this.props.typeSearch} list={this.props.typeSeller}
                            type={Constants.LIST_BRANCHES} idQuestionary={this.props.idQuestionary}/>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <br/>
            </div>
        );
    }
}

SearchAdvancedSeller.propTypes = {};

const mapStateToProps = state => ({
    assignmentUser: getMobileAssignement(state),
    typeQuestionerQuestionary: getTypeByCodSapQuestionerQuestionary(state, Constants.CODSAP_QUESTIONER_QUESTIONARY_OPEN),
    querySearchView: state.queryMobileSeller,
    user: getUser(state),
    typeSeller: getTypesSeller(state),
    cities: getAllCity(state)
});

const mapDispatchToProps = dispatch => ({
    editQueryTextMobileSellerList: value => dispatch(editQueryTextMobileSellerList(value)),
    editQueryTextMobileSellerAssignedList: value => dispatch(editQueryTextMobileSellerAssignedList(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchAdvancedSeller));

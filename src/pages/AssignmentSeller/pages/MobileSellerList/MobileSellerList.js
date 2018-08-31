import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import Constants from "../../../../Constants";
import MobileSellerItem from "./components/MobileSellerItem/MobileSellerItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {connect} from 'react-redux';
import {addAssignementUser, addMobileSellers, deleteAssignementUser, editAssignementUser} from "../../../../actions";
import {getMobileAssignement, getMobileSellers, getQueryMobileSeller} from "../../../../reducers";

const styles = theme => ({
    root: {
        width: '100%',
        height: '20%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 820,
        marginBottom: 5,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});

class MobileSellerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: props.idQuestionary,
            isEdit: props.isEdit,
            filterListMobileSeller: null,
        }
    }

    getMobileSellers = (idQuestionary) => {
        console.log(this.props.queryMobileSeller);
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_MOBILE_SELLER_BY_ID_QUESTIONARY + idQuestionary)
            .then(results => {
                return results.json();
            }).then(data => {
            this.props.addMobileSellers(data);
            console.log(this.state.filterListMobileSeller)
        });
    };

    componentDidMount() {
        this.getMobileSellers(this.state.idQuestionary);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.idQuestionary !== this.props.idQuestionary) {

            this.getMobileSellers(nextProps.idQuestionary);
        }

    }

    filterItems = (mobileSellers ,query) => {
        console.log(mobileSellers)
        return mobileSellers.filter((el) =>
            el.vendedor.persona.nombre.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };

    renderMobileSellersItem() {
        console.log(this.props.mobileSellers);
        let filterList = this.props.mobileSellers;
        if(this.props.mobileSellers !== ""){
            filterList = this.filterItems(this.props.mobileSellers, this.props.queryMobileSeller);
        }
        return <List className={this.props.classes.root} subheader={<li />}>
            {filterList.map(mobileSeller => (
                <MobileSellerItem
                    mobileSeller={mobileSeller}
                    isEdit={this.state.isEdit}
                    key={mobileSeller.id}/>
            ))}
        </List>
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mobileSellers !== []) {
            this.renderMobileSellersItem();
        }

    }

    render() {
        const {mobilsellers} = this.state;
        return (
            <div>
                {
                    this.props.mobileSellers.length >0 ? this.renderMobileSellersItem() : <CircularProgress style={{width: '20%', height: '20%'}}/>
                }
            </div>
        );
    }
}

MobileSellerList.propTypes = {
    idQuestionary: PropTypes.string.isRequired,
    isEdit: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    queryMobileSeller: getQueryMobileSeller(state),
    assignmentUser: getMobileAssignement(state),
    mobileSellers: getMobileSellers(state)
});

const mapDispatchToProps = dispatch => ({
    addAssignementUser: value => dispatch(addAssignementUser(value)),
    deleteAssignementUser: value => dispatch(deleteAssignementUser(value)),
    editAssignementUser: value => dispatch(editAssignementUser(value)),
    addMobileSellers: value => dispatch(addMobileSellers(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MobileSellerList));
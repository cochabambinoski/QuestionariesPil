import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import MobileSellerItem from "./components/MobileSellerItem/MobileSellerItem";
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {connect} from 'react-redux';
import {
    addAssignementUser,
    deleteAssignementUser,
    editAssignementUser,
    saveMobileSellerListAux,
} from "../../../../actions";
import {
    getMobileAssignement,
    getMobileSellers,
    getMobileSellersAux,
    getQueryMobileSeller,
    getQueryMobileSellerBranch,
    getQueryMobileSellerType,
} from "../../../../reducers";
import {getMobileSellersByQuestionnaire} from "../../../../actions/indexthunk";

const styles = theme => ({
    root: {
        width: '100%',
        height: '20%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 800,
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
        };
    }

    getMobileSellers = (idQuestionary) => {
        this.props.getMobileSellersByQuestionnaire(idQuestionary);
    };

    filterItems = (mobileSellers, query) => {
        return mobileSellers.filter((el) =>
            el.vendedor.persona.nombre.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };

    filterTypeSeller = (mobileSellers, typesSeller) => {
        let list = [];
        typesSeller.forEach(function (typeSeller) {
            list = list.concat(mobileSellers.filter((mobileSeller) =>
                mobileSeller.type.id === typeSeller.id
            ));
        });
        if (typesSeller.length > 0) {
            return list
        } else {
            return mobileSellers
        }

    };
    filterSellerByBranch = (mobileSellers, branches) => {
        let list = [];
        branches.forEach(function (branch) {
            list = list.concat(mobileSellers.filter((mobileSeller) =>
                mobileSeller.vendedor.sucursal.id === branch.id && branch.operacionId === 1
            ));
        });
        if (branches.length > 0) {
            return list
        } else {
            return mobileSellers
        }
    };

    renderMobileSellersItem() {
        let filterList = this.props.mobileSellers;
        if (this.props.mobileSellers !== "") {
            filterList = this.filterItems(this.props.mobileSellers, this.props.queryMobileSeller);
        }
        filterList = this.filterTypeSeller(filterList, this.props.queryMobileSellerType);
        filterList = this.filterSellerByBranch(filterList, this.props.queryMobileSellerBranch);
        this.saveListAux(filterList);
        return <List className="list" subheader={<li/>}>
            {filterList.map(mobileSeller => (
                <MobileSellerItem
                    mobileSeller={mobileSeller}
                    isEdit={this.state.isEdit}
                    key={mobileSeller.id}
                    getAssignment={this.props.getAssignment}
                    handleAddSeller={this.props.handleAddSeller}
                    showRoutes={this.props.showRoutes}/>
            ))}
        </List>
    }

    saveListAux(filterList) {
        if (filterList.length !== this.props.mobileSellersAux.length) {
            this.props.saveMobileSellerListAux(filterList);
        }
    }

    componentDidMount() {
        this.getMobileSellers(this.state.idQuestionary);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.idQuestionary !== this.props.idQuestionary) {
            this.getMobileSellers(nextProps.idQuestionary);
        }
        if (nextProps.queryMobileSellerType.length !== this.props.queryMobileSellerType.length ||
            nextProps.queryMobileSellerType !== this.props.queryMobileSellerType) {
            this.renderMobileSellersItem()
        }
    }

    render() {
        return (
            <div>
                {
                    this.renderMobileSellersItem()
                }
            </div>
        );
    }
}

MobileSellerList.propTypes = {
    isEdit: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    queryMobileSeller: getQueryMobileSeller(state),
    assignmentUser: getMobileAssignement(state),
    mobileSellers: getMobileSellers(state),
    mobileSellersAux: getMobileSellersAux(state),
    queryMobileSellerType: getQueryMobileSellerType(state),
    queryMobileSellerBranch: getQueryMobileSellerBranch(state),
});

const mapDispatchToProps = dispatch => ({
    addAssignementUser: value => dispatch(addAssignementUser(value)),
    deleteAssignementUser: value => dispatch(deleteAssignementUser(value)),
    editAssignementUser: value => dispatch(editAssignementUser(value)),
    saveMobileSellerListAux: value => dispatch(saveMobileSellerListAux(value)),
    getMobileSellersByQuestionnaire: value => dispatch(getMobileSellersByQuestionnaire(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MobileSellerList));

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import MobileSellerItem from "../../components/MobileSellerItem/MobileSellerItem";
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {connect} from 'react-redux';
import {
    getMobileAssignement,
    getQueryMobileSellerAssigment,
    getQueryMobileSellerAssignedBranch,
    getQueryMobileSellerAssignedType
} from "../../../../../../reducers";
import Constants from "../../../../../../Constants.json";
import {saveMobileSellerAssignedListAux} from "../../../../../../actions";

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

class MobileSellerListAssigment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: props.idQuestionary,
            mobilsellers: null,
            isEdit: props.isEdit,
        }
    }

    filterItems = (mobileSellers, query) => {
        return mobileSellers.filter((el) =>
            el.vendedor.persona.nombre.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };

    filterTypeSeller = (mobileSellers, typesSeller) => {
        let list = [];
        typesSeller.forEach(function (typeSeller) {
            let listAux = mobileSellers;
            list = list.concat(listAux.filter((mobileSeller) =>
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
        let filterList = this.props.assignmentUser.entities;
        if (this.props.queryMobileSeller !== "") {
            filterList = this.filterItems(this.props.assignmentUser.entities, this.props.queryMobileSellerAssigment);
        }
        filterList = this.filterTypeSeller(filterList, this.props.queryMobileSellerAssignedType);
        filterList = this.filterSellerByBranch(filterList, this.props.queryMobileSellerAssignedBranch);
        this.saveListAux(filterList);
        return <List className="list" subheader={<li/>}>
            {filterList.map(mobileSeller => (
                <MobileSellerItem
                    mobileSeller={mobileSeller}
                    isEdit={this.state.isEdit}
                    key={mobileSeller.id}
                    deleteAssignement={this.props.deleteAssignement}
                    getAssignment={this.props.getAssignment}/>
            ))}
        </List>
    }

    saveListAux(filterList){
        if (filterList.length !== this.props.assignmentUser.mobileSellerAssignedAux.length) {
            this.props.saveMobileSellerAssignedListAux(filterList);
        }
    }

    getAssignedMobileSellers = (idQuestionary) => {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ASSIGNMENTS_BY_ID_QUESTIONARY + idQuestionary)
            .then(results => {
                return results.json();
            }).then(data => {
            this.props.loadAssignments(data);
        });
    };

    componentDidMount() {
        this.getAssignedMobileSellers(this.state.idQuestionary);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.idQuestionary !== this.props.idQuestionary) {
            this.getMobileSellers(nextProps.idQuestionary);
        }
        if (nextProps.queryMobileSellerAssignedType !== this.props.queryMobileSellerAssignedType ||
            nextProps.queryMobileSellerAssignedBranch !== this.props.queryMobileSellerAssignedBranch) {
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

MobileSellerListAssigment.propTypes = {
    idQuestionary: PropTypes.string.isRequired,
    isEdit: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    assignmentUser: getMobileAssignement(state),
    queryMobileSellerAssigment: getQueryMobileSellerAssigment(state),
    queryMobileSellerAssignedType: getQueryMobileSellerAssignedType(state),
    queryMobileSellerAssignedBranch: getQueryMobileSellerAssignedBranch(state),
});


const mapDispatchToProps = dispatch => ({
    saveMobileSellerAssignedListAux: value => dispatch(saveMobileSellerAssignedListAux(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MobileSellerListAssigment));
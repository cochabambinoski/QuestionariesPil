import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import MobileSellerItem from "../../components/MobileSellerItem/MobileSellerItem";
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {connect} from 'react-redux';
import {getMobileAssignement, getQueryMobileSellerAssigment} from "../../../../../../reducers";
import Constants from "../../../../../../Constants.json";

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

class MobileSellerListAssigment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: props.idQuestionary,
            mobilsellers: null,
            isEdit: props.isEdit,
        }
    }

    filterItems = (mobileSellers ,query) => {
        return mobileSellers.filter((el) =>
            el.vendedor.persona.nombre.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };

    renderMobileSellersItem() {
        let filterList = this.props.assignmentUser.entities;
        if(this.props.queryMobileSeller !== ""){
            filterList = this.filterItems(this.props.assignmentUser.entities, this.props.queryMobileSellerAssigment);
        }
        return <List className={this.props.classes.root} subheader={<li />}>
            {filterList.map(mobileSeller => (
                <MobileSellerItem
                    mobileSeller={mobileSeller}
                    isEdit={this.state.isEdit}
                    key={mobileSeller.id}
                    deleteAssignement={this.props.deleteAssignement}
                    getAssignment={this.props.getAssignment} />
            ))}
        </List>
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
        if (nextProps.assignmentUser.entities !== this.props.entities) {
            this.renderMobileSellersItem();
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

const mapStateToProps = state => ({assignmentUser: getMobileAssignement(state),
    queryMobileSellerAssigment: getQueryMobileSellerAssigment(state)});

export default connect(mapStateToProps, null)( withStyles(styles)(MobileSellerListAssigment));
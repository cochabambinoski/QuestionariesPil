import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import MobileSellerItem from "../../components/MobileSellerItem/MobileSellerItem";
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {connect} from 'react-redux';
import {getMobileAssignement} from "../../../../../../reducers";

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

    renderMobileSellersItem() {
        return <List className={this.props.classes.root} subheader={<li />}>
            {this.props.assignmentUser.entities.map(mobileSeller => (
                <MobileSellerItem
                    mobileSeller={mobileSeller}
                    isEdit={this.state.isEdit}
                    key={mobileSeller.id}/>
            ))}
        </List>
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

const mapStateToProps = state => ({assignmentUser: getMobileAssignement(state)});

export default connect(mapStateToProps, null)( withStyles(styles)(MobileSellerListAssigment));
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import Constants from "../../../../Constants";
import MobileSellerItem from "./components/MobileSellerItem/MobileSellerItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

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
            mobilsellers: null,
            isEdit: props.isEdit,
        }
    }

    getMobileSellers = (idQuestionary) => {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_MOBILE_SELLER_BY_ID_QUESTIONARY + idQuestionary)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState(prevState => ({
                mobilsellers: data,
            }));
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

    renderMobileSellersItem(mobileSellers) {
        return <List className={this.props.classes.root} subheader={<li />}>
            {mobileSellers.map(mobileSeller => (
                <MobileSellerItem
                    mobileSeller={mobileSeller}
                    isEdit={this.state.isEdit}
                    key={mobileSeller.id}/>
            ))}
        </List>
    }

    render() {
        const {mobilsellers} = this.state;
        return (
            <div>
                {
                    mobilsellers ? this.renderMobileSellersItem(mobilsellers) : <CircularProgress style={{width: '20%', height: '20%'}}/>
                }
            </div>
        );
    }
}

MobileSellerList.propTypes = {
    idQuestionary: PropTypes.string.isRequired,
    isEdit: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MobileSellerList);
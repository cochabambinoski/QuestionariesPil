import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import './styles.css';
import Constants from "../../Constants";
import MobileSellerItem from "../AssignmentScreen/components/MobileSellerItem/MobileSellerItem";

class MobileSellerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: props.idQuestionary,
            mobilsellers: [],
        }
    }

    getMobileSellers = () => {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_MOBILE_SELLER_BY_ID_QUESTIONARY + this.state.idQuestionary)
            .then(results => {
                return results.json();
            }).then(data => {
            console.log(data);
            this.setState({mobilsellers: data});
        });
    };

    componentDidMount() {
        this.getMobileSellers();
    }

    render() {

        return (
            <div>
                {
                    this.state.mobilsellers.map((mobileSeller) =>(
                        <MobileSellerItem mobileSeller={mobileSeller} key={mobileSeller.id}/>
                    ))
                }
            </div>
        );
    }
}

MobileSellerList.propTypes = {
    idQuestionary: PropTypes.string.isRequired,
};

export default MobileSellerList;
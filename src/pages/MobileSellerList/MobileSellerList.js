import React, { Component } from 'react';
import PropTypes from 'prop-types'

class MobileSellerList extends Component {

    constructor({idQuestionary}){
        super();
        this.state = {
            idQuestionary,
            data: null,
        }
    }

    getMobileSellers = () => {
        fetch().then(data => {
            this.setState(data);
        }).catch({

        });
    };

    componentDidMount(){
        this.getMobileSellers
    }

    render() {
        return (
            <div>
                <h2>Asignacion Cuestionarios</h2>
                {console.log("asdasdasdasdasdasd")}
            </div>
        );
    }
}

MobileSellerList.propTypes = {
    idQuestionary: PropTypes.string.isRequired,
};

export default MobileSellerList;
import React, {Component} from 'react';
import {Button} from "../../../../../../../node_modules/primereact/button";
import {Card} from "../../../../../../../node_modules/primereact/card";
import './styles.css';
import { connect } from 'react-redux';
import { addAssignementUser, deleteAssignementUser, editAssignementUser } from '../../../../../../actions/index';

class MobileSellerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileSeller: props.mobileSeller,
            isEdit: props.isEdit,
            initialDate:null,
            finalDate:null,
        }
    }

    handleAddSeller = (seller) => {
        this.props.addAssignementUser(seller);
    };

    handleDeleteSeller = (seller) => {
        this.props.deleteAssignement(seller);
    };

    handleEditSeller = (seller) => {
        this.props.editAssignementUser(seller);
    };

    getDates = (seller) => {
        const format = require('date-format');
        const assignment = this.props.getAssignment(seller);
        if(assignment != null){
            this.setState({initialDate: format("yyyy-MM-dd", new Date(assignment.initialDate))});
            this.setState({finalDate: format("yyyy-MM-dd", new Date(assignment.finalDate))});
       }
    };

    componentDidMount() {
        this.getDates(this.props.mobileSeller);
    }

    render() {
        const {isEdit} = this.state;
        return (
            <div>
                <Card className="cardMobileSeller" key={this.state.mobileSeller.id}>
                    <div>
                        <h2 className="light-text">Nombre del vendedor</h2>
                        <div className="normal-text">{this.state.mobileSeller.vendedor.persona.nombre}</div>
                        <h2 className="light-text">Tipo</h2>
                        <div className="normal-text">{this.state.mobileSeller.type.nombre}</div>
                        {
                            this.state.initialDate != null && this.state.finalDate != null ?
                                <div>
                                    <h2 className="light-text">Validez</h2>
                                    <div className="normal-text">Del {this.state.initialDate} al {this.state.finalDate}</div>
                                </div>:null
                        }
                        
                        <br/>
                        {
                            isEdit === false ?
                                <Button label="Asignar" onClick={() => {
                                    this.handleAddSeller(this.state.mobileSeller)
                                }} /> :
                                <Button label="Eliminar" className="ui-button-danger"
                                        onClick={() => {
                                            this.handleDeleteSeller(this.state.mobileSeller)
                                        }}
                                />
                        }
                    </div>
                </Card>
            </div>
        );
    }
}

MobileSellerItem.propTypes = {};

const mapDispatchToProps = dispatch => ({
    addAssignementUser: value => dispatch(addAssignementUser(value)),
    deleteAssignementUser: value => dispatch(deleteAssignementUser(value)),
    editAssignementUser: value => dispatch(editAssignementUser(value))
});

export default connect(null , mapDispatchToProps)(MobileSellerItem);

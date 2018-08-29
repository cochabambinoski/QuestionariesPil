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
        }
    }

    handleAddSeller = (seller) => {
        this.props.addAssignementUser(seller);
    };

    handleDeleteSeller = (seller) => {
        this.props.deleteAssignementUser(seller);
    };

    handleEditSeller = (seller) => {
        this.props.editAssignementUser(seller);
    };

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

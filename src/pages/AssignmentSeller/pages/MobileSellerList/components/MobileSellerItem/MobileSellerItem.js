import React, {Component} from 'react';
import {Button} from "../../../../../../../node_modules/primereact/button";
import {Card} from "../../../../../../../node_modules/primereact/card";
import './styles.css';

class MobileSellerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileSeller: props.mobileSeller,
            isEdit: props.isEdit,
        }
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
                        <br/>
                        {
                            isEdit === false ? <Button label="Asignar"/> :
                                <Button label="Eliminar" className="ui-button-danger"/>
                        }
                    </div>
                </Card>
            </div>
        );
    }
}

MobileSellerItem.propTypes = {};

export default MobileSellerItem;

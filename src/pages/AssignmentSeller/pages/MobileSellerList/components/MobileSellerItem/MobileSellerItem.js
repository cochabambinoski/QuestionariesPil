import React, {Component} from 'react';
import {Button} from "../../../../../../../node_modules/primereact/button";
import {Card} from "../../../../../../../node_modules/primereact/card";
import './styles.css';

class MobileSellerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileSeller: props.mobileSeller,
        }
    }

    render() {
        return (
            <div>
                <Card className="cardMobileSeller" key={this.state.mobileSeller.id}>
                    <div>
                        <div className="light-text">Nombre del vendedor</div>
                        <div className="normal-text">{this.state.mobileSeller.vendedor.persona.nombre}</div>
                        <div className="light-text">Tipo</div>
                        <div className="normal-text">{this.state.mobileSeller.type.nombre}</div>
                        <br/>
                        <span>
                          <Button label="Asignar"/>
                        </span>
                    </div>
                </Card>
            </div>
        );
    }
}

MobileSellerItem.propTypes = {};

export default MobileSellerItem;

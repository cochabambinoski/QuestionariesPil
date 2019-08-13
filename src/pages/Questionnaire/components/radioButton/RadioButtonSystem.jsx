import React from 'react'
import {RadioButton} from "primereact/radiobutton";

function RadioButtonSystem(props) {
    const {systemTypes, readOnly, limitSVM, system, limitPOS} = props;
    return (
        <div>
            Seleccione a qué sistema corresponde la encuesta:
            <div className="radio-container">
                <div className="radio-item">
                    <RadioButton inputId="rb1"
                                 name="system"
                                 value={systemTypes[0]}
                                 onChange={props.onHandleChange}
                                 checked={system && system.nombre === systemTypes[0].nombre}
                                 disabled={readOnly || limitPOS}/>
                    <label htmlFor="rb1"
                           className="p-radiobutton-label">{systemTypes[0].nombre}</label>
                </div>

                <div className="radio-item">
                    <RadioButton inputId="rb2"
                                 name="system"
                                 value={systemTypes[1]}
                                 onChange={props.onHandleChange}
                                 checked={system && system.nombre === systemTypes[1].nombre}
                                 disabled={readOnly || limitSVM}/>
                    <label htmlFor="rb2"
                           className="p-radiobutton-label">{systemTypes[1].nombre}</label>
                </div>
            </div>
        </div>
    )
}

export default RadioButtonSystem;

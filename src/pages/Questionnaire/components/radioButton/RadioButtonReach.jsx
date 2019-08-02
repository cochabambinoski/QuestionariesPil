import React from 'react';
import {RadioButton} from "primereact/radiobutton";

function RadioButtonReach(props) {
    const {reachTypes, reach, readOnly} = props;
    return (
        <div>
            Seleccione el alcance de la encuesta:
            <div className="radio-container">
                <div className="radio-item">
                    <RadioButton inputId="rb3"
                                 name="reach"
                                 value={reachTypes[0]}
                                 onChange={props.onHandleChange}
                                 checked={reach && reach.nombre === reachTypes[0].nombre}
                                 disabled={readOnly}/>
                    <label htmlFor="rb3"
                           className="p-radiobutton-label">{reachTypes[0].nombre}</label>
                </div>

                <div className="radio-item">
                    <RadioButton inputId="rb4"
                                 name="reach"
                                 value={reachTypes[1]}
                                 onChange={props.onHandleChange}
                                 checked={reach && reach.nombre === reachTypes[1].nombre}
                                 disabled={readOnly}/>
                    <label htmlFor="rb4"
                           className="p-radiobutton-label">{reachTypes[1].nombre}</label>
                </div>
            </div>
        </div>
    )
}

export default RadioButtonReach;

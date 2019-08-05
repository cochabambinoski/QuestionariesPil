import React from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";

function EditTextQuestionnaire(props) {
    const { readOnly, name, description} = props;
    return(
        <div>
            <div>
                {readOnly ?
                    <h1>{name}</h1>
                    :
                    <div>
                        <InputText id="float-input" placeholder="Nombre del cuestionario"
                                   type="text" style={{marginBottom: '15px'}}
                                   required
                                   maxLength="50"
                                   size="51"
                                   value={name}
                                   name={'name'}
                                   onChange={props.onHandleChange}/>
                    </div>
                }
            </div>
            <div>
                {readOnly ?
                    <p>{description}</p>
                    :
                    <InputTextarea className="description"
                                   placeholder="Descripcion (opcional)"
                                   type="text" maxLength="255"
                                   style={{width: '385px'}}
                                   value={description}
                                   onChange={props.onHandleChange}
                                   rows={4}
                                   name={'description'}
                                   autoResize={false}/>
                }
            </div>
        </div>
    )
}

export default EditTextQuestionnaire;

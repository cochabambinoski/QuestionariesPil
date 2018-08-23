import React from 'react';
import {PanelMenu} from 'primereact/panelmenu';

function SubMenu(props) {
    function openComponent(){
        console.log("OpenComponent")
    }

    props.submenus.map((item) => {
            item.items.map((items)=>{
                if (items.items!=null){
                    if (items.items.length>0){
                        items.items = null;
                        return null
                    } else {
                        items.items = null;
                        return null
                    }
                }
            })

    } );
    return(
        <div>
            <div className="content-section implementation">
                <PanelMenu model={props.submenus} style={{width:'300px'}} />
            </div>
        </div>
    )
}

export default SubMenu;
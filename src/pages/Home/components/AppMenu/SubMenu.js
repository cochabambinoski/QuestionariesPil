import React from 'react';
import {PanelMenu} from 'primereact/panelmenu';

const SubMenu = ({submenus}) => {
    submenus.map((item) => {
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
                <PanelMenu model={submenus} style={{width:'300px'}} />
            </div>
        </div>
    )
};


export default SubMenu;
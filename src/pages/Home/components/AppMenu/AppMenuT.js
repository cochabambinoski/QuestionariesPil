import React from 'react';
import SubMenu from "./SubMenu";
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import '../../layout.css'

function AppMenuT({menus, onSelectedMenu}) {

    return (
        <div className="Menus">
            {
                menus.map((item) => {
                    return item.items.map((itemMenu) => {
                        return itemMenu.label === "Supervision" ?
                            <SubMenu submenus={itemMenu.items} title={itemMenu.label} key={item.id}/> : null
                    })
                })
            }
        </div>
    );
}

export default AppMenuT
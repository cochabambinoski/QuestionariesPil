import React from 'react';
import SubMenu from "./SubMenu";
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import '../../layout.css'

function AppMenuT(props) {
    console.log(props.menus);
        return (
            <div className="Menus">
                {
                    props.menus.map((item)=> {
                        return <SubMenu
                            submenus={item.items} key={item.id}/>
                    })
                }
            </div>
        );
}

export default AppMenuT
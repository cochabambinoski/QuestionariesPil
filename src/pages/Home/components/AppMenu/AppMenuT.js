import React from 'react';
import SubMenu from "./SubMenu";
import MenuItem from '@material-ui/core/MenuItem';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import '../../../../layout/layout.css'

function AppMenuT({menus, onSelectedMenu}) {

    return (
        <div className="Menus">
            {
                menus.map((item) => {
                    return item.items.map((itemMenu) => {
                        switch (itemMenu.label) {
                            case "Supervision":
                                return <SubMenu
                                    submenus={itemMenu.items} title={itemMenu.label} key={item.id}/>;
                            case "Segmentación de clientes":
                                    return <SubMenu
                                        submenus={itemMenu.items} title={itemMenu.label} key={item.id}/>;
                        }
                    })
                })
            }
                </div>
                );
                }

            export default AppMenuT
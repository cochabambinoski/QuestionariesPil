import React, {Component} from 'react';
import SubMenu from "./SubMenu";
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import '../../../../layout/layout.css'

class AppMenuT extends Component{
    render(){
        const menus = this.props.menus;
        return(
            <div className="Menus">
                {
                    menus.map((item) => {
                        return item.items.map((itemMenu) => {
                            switch (itemMenu.label) {
                                case "Supervision":
                                    return <SubMenu
                                        menus={itemMenu.items} title={itemMenu.label} key={itemMenu.id}/>;
                                case "Segmentación de clientes":
                                    return <SubMenu
                                        menus={itemMenu.items} title={itemMenu.label} key={itemMenu.id}/>;
                                case "Finanzas":
                                    return <SubMenu
                                        menus={itemMenu.items} title={itemMenu.label} key={itemMenu.id}/>;
                                default:
                                    return null;
                            }
                        })
                    })
                }
            </div>
        )
    }

}

export default AppMenuT;

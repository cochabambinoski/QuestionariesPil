import React, {Component} from 'react';
import SubMenu from "./SubMenu";
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import '../../../../layout/layout.css'

class AppMenuT extends Component{
    render(){
        return(
            <div className="Menus">
                {
                    this.props.menus.map((item) => {
                        console.log( this.props.menus);
                        return item.items.map((itemMenu) => {
                            switch (itemMenu.label) {
                                case "Supervision":
                                    return <SubMenu
                                        submenus={itemMenu.items} title={itemMenu.label} key={itemMenu.id}/>;
                                case "Segmentación de clientes":
                                    return <SubMenu
                                        submenus={itemMenu.items} title={itemMenu.label} key={itemMenu.id}/>;
                            }
                        })
                    })
                }
            </div>
        )
    }

}

export default AppMenuT;
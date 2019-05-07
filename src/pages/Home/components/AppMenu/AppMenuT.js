import React, {Component} from 'react';
import SubMenu from "./SubMenu";
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import '../../../../layout/layout.css'

class AppMenuT extends Component {

    renderSubMenu(itemMenu) {
        switch (itemMenu.label) {
            case "Supervision":
                return <SubMenu key={itemMenu.id} menus={itemMenu.items} title={itemMenu.label}/>;
            case "Segmentación de clientes":
                return <SubMenu key={itemMenu.id} menus={itemMenu.items} title={itemMenu.label}/>;
            case "Finanzas":
                return <SubMenu key={itemMenu.id} menus={itemMenu.items} title={itemMenu.label}/>;
            default:
                return null;
        }
    }

    render() {
        const menus = this.props.menus;
        return (
            <div className="Menus">
                {
                    menus.map((item) => {
                        return item.items.map((itemMenu) => {
                            return this.renderSubMenu(itemMenu)
                        })
                    })
                }
            </div>
        )
    }

}

export default AppMenuT;

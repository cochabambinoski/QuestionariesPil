import React, {Component, Fragment} from 'react';
import SubMenuExpansionPanel from "./SubMenuExpansionPanel";
import ListItem from "@material-ui/core/ListItem";

class SubMenu extends Component {

    menuIsValid = (itemMenu) => {
        switch (itemMenu.label) {
            case "Supervision":
                return true;
            case "Segmentación de clientes":
                return true;
            case "Presupuesto y Planeamiento":
                return true;
            default:
                return false;
        }
    };

    render() {
        const {menu} = this.props;
        return (
            <Fragment>
                {!this.menuIsValid(menu) ? null : (
                    <ListItem button>
                        <SubMenuExpansionPanel menu={menu}/>
                    </ListItem>
                )}
            </Fragment>
        );
    }
}

export default SubMenu;

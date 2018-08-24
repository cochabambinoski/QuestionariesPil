import React, {Component} from 'react';
import {PanelMenu} from 'primereact/panelmenu';
import { connect }  from "react-redux";
import {bindActionCreators} from 'redux';
import * as actions from '../../../../actions/actions';

class SubMenu extends Component  {

   changeMenus(){
       /** @namespace props.submenus */
       this.props.submenus.map((item) => {
           item.items.map((items)=>{
               if (items.items!=null){
                   if (items.items.length>0){
                       items.items = null;
                   } else {
                       items.items = null;
                   }
               }
           })

       } );
   }
    render(){
        this.changeMenus();
    return(
        <div>
            <div className="content-section implementation">
                <PanelMenu model={this.props.submenus} style={{width:'300px'}} />
            </div>
        </div>
    )
    };
}

function mapsStateToProps(state, props) {
    return {
        submenus: props.submenus
    }
}

function initMapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapsStateToProps, initMapDispatchToProps) (SubMenu);
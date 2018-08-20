import React, { Component } from 'react';
import SubMenu from "./SubMenu";
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import '../../layout.css';
import { connect }  from "react-redux";
import {bindActionCreators} from 'redux';
import * as actions from '../../../../actions/actions';

class AppMenuT extends Component{
        render(){
            return (
                <div className="Menus">
                    {
                        this.props.menus.map((item)=> {
                            return <SubMenu
                                submenus={item.items} key={item.id}/>
                        })
                    }
                </div>
            );
        };
}

function mapsStateToProps(state, props) {
    return {
        menus: props.menus
    }
}

function initMapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapsStateToProps, initMapDispatchToProps) (AppMenuT);
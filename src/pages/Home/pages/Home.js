import React, {Component} from 'react';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import {AppInlineProfile} from "../components/AppInlineProfile/AppInlineProfile";
import { AppTopbar } from '../components/AppTopBar/AppTopbar';
import Constants from "../../../Constants";
import classNames from 'classnames';
import Container from "../components/Container/Container";
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import '../layout.css'

import AppMenuT from "../components/AppMenu/AppMenuT";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'light',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menus: []
        };
        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.openMenuComponent = this.openMenuComponent.bind(this);
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false,
            })
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });

            if (mobileMenuActive)
                this.removeClass(document.body, 'body-overflow-hidden');
            else
                this.addClass(document.body, 'body-overflow-hidden');
        }

        event.preventDefault();
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    openMenuComponent(menuName){
        this.growl.show({ severity: 'info', summary: 'See'+ menuName, detail: '' });
    }

    componentDidMount() {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_MENU_BY_USER)
            .then(results => {
               return results.json();
            }).then(data => {
                this.setState({ menus: data});
                //console.log("state", this.state.menus)
        })
    }

    render() {
        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });
        let sidebarClassName = classNames("layout-sidebar", {'layout-sidebar-dark': this.state.layoutColorMode === 'dark'});

        return (
            <div className={wrapperClass}>
                <AppTopbar onToggleMenu={this.onToggleMenu}/>

                <div className={sidebarClassName}>
                    <ScrollPanel style={{height:'100%'}}>
                        <div className="logo"></div>
                        <AppInlineProfile />
                        <AppMenuT menus={this.state.menus} />
                    </ScrollPanel>
                </div>

                <div className="layout-main">
                    <Container>

                    </Container>
                </div>
            </div>
        );
    }
}

export default Home;
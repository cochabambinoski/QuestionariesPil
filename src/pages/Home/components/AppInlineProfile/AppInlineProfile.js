import React, {Component} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {getUser} from "../../../../reducers";

class AppInlineProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        return  (
            <div className="profile">
                <div>
                    <img src="assets/layout/images/profile.png" alt=""/>
                </div>
                <a className="profile-link" onClick={this.onClick}>
                    <span className="username">{this.props.user.persona.nombre}</span>
                    <i className="fa fa-fw fa-cog"/>
                </a>
                <ul className={classNames({'profile-expanded': this.state.expanded})}>
                    <li>
                        <a>
                            <i className="fa fa-fw fa-sign-out"/>
                            <span>Salir</span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: getUser(state),
});


export default connect(mapStateToProps, null)(AppInlineProfile);
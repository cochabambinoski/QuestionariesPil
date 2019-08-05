import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
    return (
        <div className="clearfix headerWrapper">
            <div className="headerBody">
                {
                    props.onToggleMenu ?
                        <div style={{
                            display: 'inline-block',
                            marginRight: '3vh',
                            fontSize: '3vh',
                            verticalAlign: 'middle'
                        }}
                             onClick={props.onToggleMenu}>
                            <i className="fa fa-bars"/>
                        </div> : null
                }
                <div style={{display: 'inline-block', verticalAlign: 'middle'}}>
                    <div className="header-title">{props.title}</div>
                    <div className="header-subtitle">{props.subtitle}</div>
                </div>

            </div>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

export default Header;
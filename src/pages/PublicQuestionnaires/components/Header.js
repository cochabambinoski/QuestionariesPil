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
                            marginRight: '50px',
                            fontSize: '2vw',
                            verticalAlign: 'middle'
                        }}
                             onClick={props.onToggleMenu}>
                            <i className="fa fa-bars"/>
                        </div> : null
                }
                <div style={{display: 'inline-block', verticalAlign: 'middle'}}>
                    <div className="header-title">{props.title}</div>
                    <h2>{props.subtitle}</h2>
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
import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
    return (
        <div>
            <div className="headerBody">
                <div className="header-title">{props.title}</div>
                <h2>{props.subtitle}</h2>
            </div>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

export default Header;
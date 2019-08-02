import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Title = ({title}) => {
    return (
        <div className='TitleCont'>
            <h1>
                {title}
            </h1>
        </div>
    )
};

Title.propTypes = {
    title: PropTypes.string.isRequired,
};
export default Title;

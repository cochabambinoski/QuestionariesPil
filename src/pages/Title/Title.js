/**
 * Created by smirandaz on 09/11/2018.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    background: {
        backgroundColor: '#3498DB',
        widths: '100%',
        height: 'auto',
        color: '#FFF',
        padding: '1.5em',
        marginTop: '-0.35em',
        marginLeft: '-1.5em',
        marginRight: '-1.5em',
    },
    title: {
        size: 'large',
    },
    subtile: {
        size: 'large',
    }
});

class Title extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.tilte,
            subtitle: props.subtitle,
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.background}>
                    <h1>{this.state.title}</h1>
                    <p>{this.state.subtitle}</p>
                </div>
            </div>
        );
    }
}

Title.propTypes = {};

export default  withStyles(styles)(Title);


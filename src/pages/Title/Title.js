/**
 * Created by smirandaz on 09/11/2018.
 */
import React, {Component} from 'react';

class Title extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            subtitle: props.subtitle,
        }
    }

    render() {
        return (
            <div>
                <div className="titleBody">
                    <h1 className="titleA">{this.state.title}</h1>
                    <p className="titleB">{this.state.subtitle}</p>
                </div>
            </div>
        );
    }
}

Title.propTypes = {};

export default  (Title);


import React, {Component} from 'react';

class Graphics extends Component {
    render() {
        return (
            <div>
                {
                    this.props.question ?
                    this.props.question.id : null
                }
            </div>
        );
    }
}

export default Graphics;
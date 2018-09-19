import React, {Component} from 'react';

class AnswerItem extends Component {
    render() {
        return (
            <div>
                {this.props.answer.id}
            </div>
        );
    }
}

export default AnswerItem;
import React, {Component} from 'react';

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.tilte,
            subtitle: props.subtitle,
        }
    }

    render() {
        return (
            <div className="bannerTitleBody">
                <h1 className="bannerTitleA">{this.state.title}</h1>
                <p className="bannerTitleB">{this.state.subtitle}</p>
            </div>
        );
    }
}

export default (Banner);
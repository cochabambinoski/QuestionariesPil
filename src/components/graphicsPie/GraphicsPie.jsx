import React, {Component, Fragment} from 'react';
import {Chart} from "primereact/chart";
import Constants from "../../Constants";

export default class GraphicsPie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            errorRequest: null,
            isLoading: true
        }
    }

    static createComponents(data) {
        if (data !== undefined) return <Chart type="pie" data={data.data}/>
    };

    componentDidMount() {
        const url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_DATA_GRAPHICS_QUESTION}${this.props.question.id}`;
        fetch(url).then(results => {
            return results.json()
        }).then(response => {
            if (response.status === undefined) {
                this.setState({data: response, errorRequest: null, isLoading: false})
            } else {
                this.setState({data: null, errorRequest: response, isLoading: false})
            }
        }).catch(error => {
            this.setState({data: null, errorRequest: error, isLoading: false})
        })
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.data != null ? (
                        <Chart type="pie" data={this.state.data} width={500}
                        height={250} />) : (
                        <h1>Error al cargar el componente</h1>)
                }
            </Fragment>
        );
    }
}

import React, {Component} from 'react';
import './GoogleMapsClient.scss'
import GoogleMapsComponent from "../googleMapsComponent/GoogleMapsComponent";
import Constants from '../../Constants'

class GoogleMapsClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: null,
            isLoading: true,
            errorRequest: null,
            currentAnswers: null,
            answersPerPage: 50,
            page: 0,
        }
    }

    componentDidMount() {
        let {idQuestionary} = this.props;
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_ANSWERS_BY_ID_QUESTIONNAIRE}${idQuestionary}`;
        if (this.state.answers === null) {
            fetch(url).then(results => {
                return results.json()
            }).then(response => {
                if (response.status === undefined) {
                    this.setState({answers: response, errorRequest: null, isLoading: false})
                } else {
                    this.setState({answers: null, errorRequest: response, isLoading: false})
                }
            }).catch(error => {
                this.setState({answers: null, errorRequest: error, isLoading: false})
            })
        }
    }

    render() {
        let {answers} = this.state;
        return (
            <div>
                {answers === null ? <h1>Cargando compoente</h1> : (
                    <div>
                        <GoogleMapsComponent answers={answers}/>
                    </div>
                )}
            </div>
        );
    }
}

export default GoogleMapsClient;

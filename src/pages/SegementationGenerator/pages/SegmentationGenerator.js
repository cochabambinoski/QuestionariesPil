/**
 * Created by smirandaz on 08/31/2018.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Constants from "./../../../Constants.json";
import {Grid, Row, Col} from 'react-flexbox-grid';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Card} from "primereact/card";
import CircularProgress from "@material-ui/core/CircularProgress";

class SegmentationGenerator extends Component {

    constructor(props) {
        super(props);
        let segment = props.segment;
        this.state = {
            code: segment.idClientKiloliter,
            level: segment.numberLevel,
            k1: segment.factorK1,
            k2: segment.factorK2,
            process: 1
        };
    }

    componentDidMount() {
        this.props.setSegmentClick(this.handleSaveSegment);
    }

    shouldComponentUpdate(next_props, next_state) {
        return true;
    }

    /**
     * send segmentation
     * @param data
     */
    setSegmentation = (data) => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.POST_CLIENT_KILOLITERS_SEGMENT}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response.codeResult === null || response.codeResult === undefined) {
                    if (response.status > 200) {
                        this.setState({process: 1});
                        this.props.refresh(0);
                    }
                } else {
                    this.setState({process: response.codeResult});
                    this.props.refresh(response.codeResult);
                }
            });
    };

    handleSaveSegment = () => {
        if (this.state.description !== null && this.state.dates !== null) {
            this.setState({process: 0});
            const level = this.state.city;
            const market = this.state.market;
            const bussines = this.state.bussines;
            const line = this.state.line;
            const material = this.state.material;
            this.setSegmentation({
                "idClientKiloliter": this.state.code,
                "numberLevel": this.state.level,
                "factorK1": this.state.k1,
                "factorK2": this.state.k2
            });
            this.setState({dates: null});
        }
    };

    render() {
        const {process} = this.state;
        return (
            <div>
                {
                    process ? this.renderForm() :
                        <CircularProgress size={500} style={{color: '#5DADE2'[200]}} thickness={5}/>
                }
            </div>
        );
    }

    renderForm() {
        return (
            <div>
                <Card>
                    <Grid>
                        <Row>
                            <Col xs={5}>
                                <label className="label">Codigo:</label>
                            </Col>
                            <Col xs={3}>
                                <InputText value={this.state.code}
                                           onChange={(e) => this.setState({code: e.target.value})}
                                           disabled="disabled" className="imputSmall !important"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <label className="label">Numero de Niveles:</label>
                            </Col>
                            <Col xs={3}>
                                <InputText value={this.state.level} keyfilter="int"
                                           onChange={(e) => this.setState({level: e.target.value})}
                                           className="imputSmall !important"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <label className="label">Factor K1:</label>
                            </Col>
                            <Col xs={2}>
                                <InputText value={this.state.k1} keyfilter={/^\d*\.?\d{0,2}$/}
                                           onChange={(e) => this.setState({k1: e.target.value})}
                                           className="imputSmall !important"/>
                            </Col>
                            <Col xs={5}>
                                <label className="LabelDetail">Para limite inferior</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <label className="label">Factor K2:</label>
                            </Col>
                            <Col xs={2}>
                                <InputText value={this.state.k2} keyfilter={/^\d*\.?\d{0,2}$/}
                                           onChange={(e) => this.setState({k2: e.target.value})}
                                           className="imputSmall !important"/>
                            </Col>
                            <Col xs={5}>
                                <label className="LabelDetail">Para limite superior</label>
                            </Col>
                        </Row>
                    </Grid>
                </Card>
            </div>
        );
    }
}

SegmentationGenerator.propTypes = {
    segment: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired
};
export default SegmentationGenerator;


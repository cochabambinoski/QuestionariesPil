/**
 * Created by smirandaz on 08/31/2018.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Constants from "./../../../Constants.json";
import {Grid, Row, Col} from 'react-flexbox-grid';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Card} from "primereact/card";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({});

class SegmentationGenerator extends Component {

    constructor(props) {
        super(props);
        let segment = props.segment;
        console.log(segment);
        this.state = {
            code: segment.idClientKiloliter,
            level: segment.numberLevel,
            k1: segment.factorK1,
            k2: segment.factorK2,
            process: 1,
        }
    }

    shouldComponentUpdate(next_props, next_state) {
        return true;
    }

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
                console.log(response, response.codeResult);
                this.setState({process: response.codeResult});
                this.props.refresh();
            });
    };

    handleClick = (event) => {
        console.log('click' + event);
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
                    process ? this.renderForm() : <CircularProgress style={{width: '20%', height: '20%'}}/>
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
                            <Col xs={4}>
                                <label style={{width: '5em', margin: '.30em'}}>Codigo:</label>
                            </Col>
                            <Col xs={4}>
                                <InputText value={this.state.code}
                                           onChange={(e) => this.setState({code: e.target.value})}
                                           disabled="disabled"
                                           style={{width: '5em', margin: '.25em'}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <label style={{width: '5em', margin: '.30em'}}>Numero de Niveles:</label>
                            </Col>
                            <Col xs={4}>
                                <InputText value={this.state.level} keyfilter="int"
                                           onChange={(e) => this.setState({level: e.target.value})}
                                           style={{width: '5em', margin: '.25em'}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <label style={{width: '5em', margin: '.30em'}}>Factor K1:</label>
                            </Col>
                            <Col xs={4}>
                                <InputText value={this.state.k1} keyfilter={/^\d*\.?\d{0,2}$/}
                                           onChange={(e) => this.setState({k1: e.target.value})}
                                           style={{width: '5em', margin: '.25em'}}/>
                            </Col>
                            <Col xs={4}>
                                <label style={{width: '5em', margin: '.30em'}}>Para limite inferior</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <label style={{width: '5em', margin: '.30em'}}>Factor K2:</label>
                            </Col>
                            <Col xs={4}>
                                <InputText value={this.state.k2} keyfilter={/^\d*\.?\d{0,2}$/}
                                           onChange={(e) => this.setState({k2: e.target.value})}
                                           style={{width: '5em', margin: '.25em'}}/>
                            </Col>
                            <Col xs={4}>
                                <label style={{width: '5em', margin: '.30em'}}>Para limite superior</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                            </Col>
                            <Col xs={4}>
                            </Col>
                            <Col xs={4}>
                                <Button label="Generar" onClick={this.handleClick}/>
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
    refresh: PropTypes.func.isRequired,
};
export default withStyles(styles)(SegmentationGenerator);


/**
 * Created by smirandaz on 08/31/2018.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Card} from "primereact/card";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({});

class SegmentationGenerator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            k1: 0.5,
            k2: 0.5,
            succes: 1,
        }
    }


    render() {
        const {succes} = this.state;
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Generación de Segmentación Base</h1>
                        <p></p>
                    </div>
                </div>
                {
                    succes ? this.renderForm() : <CircularProgress style={{width: '20%', height: '20%'}}/>
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
                            <Col xs={9}>
                                <Row>
                                    <Col xs={2}>
                                        <label style={{width: '5em', margin: '.30em'}}>Codigo:</label>
                                    </Col>
                                    <Col xs={2}>
                                        <InputText value={this.state.code}
                                                   onChange={(e) => this.setState({value: e.target.value})}
                                                   disabled="disabled"
                                                   style={{width: '5em', margin: '.25em'}}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                        <label style={{width: '5em', margin: '.30em'}}>Numero de Niveles:</label>
                                    </Col>
                                    <Col xs={2}>
                                        <InputText value={this.state.level}
                                                   onChange={(e) => this.setState({value: e.target.value})}
                                                   style={{width: '5em', margin: '.25em'}}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                        <label style={{width: '5em', margin: '.30em'}}>Factor K1:</label>
                                    </Col>
                                    <Col xs={2}>
                                        <InputText value={this.state.k1}
                                                   onChange={(e) => this.setState({value: e.target.value})}
                                                   style={{width: '5em', margin: '.25em'}}/>
                                    </Col>
                                    <Col xs={2}>
                                        <label style={{width: '5em', margin: '.30em'}}>Para limite inferior</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                        <label style={{width: '5em', margin: '.30em'}}>Factor K2:</label>
                                    </Col>
                                    <Col xs={2}>
                                        <InputText value={this.state.k2}
                                                   onChange={(e) => this.setState({value: e.target.value})}
                                                   style={{width: '5em', margin: '.25em'}}/>
                                    </Col>
                                    <Col xs={2}>
                                        <label style={{width: '5em', margin: '.30em'}}>Para limite superior</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    </Col>
                                    <Col xs={2}>
                                    </Col>
                                    <Col xs={2}>
                                        <Button label="Generar" onClick={this.handleClick}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(SegmentationGenerator);


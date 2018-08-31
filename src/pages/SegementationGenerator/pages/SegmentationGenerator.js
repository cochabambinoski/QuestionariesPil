/**
 * Created by smirandaz on 08/31/2018.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

const styles = theme => ({});

class SegmentationGenerator extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <label>Codigo:</label>
                                </Col>
                                <Col >
                                    <InputText value={this.state.code}
                                               onChange={(e) => this.setState({value: e.target.value})}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Numero de Niveles:</label>
                                </Col>
                                <Col>
                                    <InputText value={this.state.nivel}
                                               onChange={(e) => this.setState({value: e.target.value})}/></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Factor K1:</label>
                                </Col>
                                <Col>
                                    <InputText value={this.state.fack1}
                                               onChange={(e) => this.setState({value: e.target.value})}/>
                                </Col>
                                <Col>
                                    <label>Para limite inferior</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Factor K2:</label>
                                </Col>
                                <Col>
                                    <InputText value={this.state.fack2}
                                               onChange={(e) => this.setState({value: e.target.value})}/>
                                </Col>
                                <Col>
                                    <label>Para limite superior</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button label="Generar" onClick={this.handleClick}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(SegmentationGenerator);


/**
 * Created by smirandaz on 08/30/2018.
 */

import React, {Component} from "react";
import {Card} from "primereact/card";
import {withStyles} from '@material-ui/core/styles';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {InputText} from 'primereact/inputtext';
import {Calendar} from "primereact/calendar";
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import Constants from './../../../Constants.json'

const styles = theme => ({
    row: {
        width: '100%',
    },
    col: {
        margin: '10px',
    },
    with: '50%',
});

class BaseGenerator extends Component {

    componentDidMount() {
        fetch(Constants.ROUTE_WEB_BI + Constants.GET_CITIES)
            .then(results => {
                return results.json();
            }).then(data => {
            console.log(data);
            this.setState({cities: data});
        })

        fetch(Constants.ROUTE_WEB_BI + Constants.GET_BUSSINESS)
            .then(results => {
                return results.json();
            }).then(data => {
            console.log(data);
            this.setState({bussiness: data});
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            city: null,
            business: null,
            cities: [],
            bussiness: [],
        };
        this.onCityChange = this.onCityChange.bind(this);
        this.onBussinesChange = this.onBussinesChange.bind(this);
    }

    onCityChange(e) {
        console.log(e.value)
        this.setState({city: e.value});
    }

    cityTemplate(option) {
        console.log(option)
        if (!option.value) {
            return option.nameDataType;
        }
        else {
            console.log(option)
            return (
                <div className="p-clearfix">
                    <span style={{float: 'right', margin: '.5em .25em 0 0'}}>{option.nameDataType}</span>
                </div>
            );
        }
    }

    onBussinesChange(e) {
        this.setState({bussines: e.value});
    }

    bussinesTemplate(option) {
        if (!option.value) {
            return option.nameDataType;
        }
        else {
            return (
                <div className="p-clearfix">
                    <span style={{float: 'right', margin: '.5em .25em 0 0'}}>{option.nameDataType}</span>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <Grid>
                        <Col xs={8} className="col">
                            <Row around="xs" start="xs">
                                <Col xs={2}>
                                    <label htmlFor="float-input">Codigo: </label>
                                </Col>
                                <Col xs={3}>
                                    <InputText id="code" type="text" size="30" value={this.state.value1}
                                               onChange={(e) => this.setState({value1: e.target.value})}
                                               disabled="disabled"/>
                                </Col>
                            </Row>
                            <Row around="xs" start="xs">
                                <Col xs={2}>
                                    <label htmlFor="float-input">Descripción: </label>
                                </Col>
                                <Col xs={3}>
                                    <InputText id="description" type="text" size="30" value={this.state.value2}
                                               onChange={(e) => this.setState({value2: e.target.value})}/>
                                </Col>
                            </Row>
                            <Row around="xs" start="xs">
                                <Col xs={2}>
                                    <label htmlFor="float-input">Rango de Fechas: </label>
                                </Col>
                                <Col xs={3}>
                                    <Calendar value={this.state.dates}
                                              onChange={(e) => this.setState({dates: e.value})}
                                              selectionMode="range" readonlyInput={true}/>
                                </Col>
                            </Row>
                            <Row around="xs" start="xs">
                                <Col xs={2}>
                                    <label htmlFor="float-input">Ciudad: </label>
                                </Col>
                                <Col xs={3}>
                                    <Dropdown value={this.state.city} options={this.state.cities}
                                              onChange={this.onCityChange}
                                              itemTemplate={this.cityTemplate} style={{width: '250px'}}
                                              placeholder="Todos" optionLabel="nameDataType" filter={true}
                                              filterPlaceholder="Seleccione Ciudad" filterBy="nameDataType,code"
                                              showClear={true}/>
                                </Col>
                            </Row>
                            <Row around="xs" start="xs">
                                <Col xs={2}>
                                    <label htmlFor="float-input">Mercado: </label>
                                </Col>
                                <Col xs={3}>
                                    <Dropdown value={this.state.cities} options={this.state.cities}
                                              onChange={this.onCityChange} itemTemplate={this.carTemplate}
                                              style={{width: '250px'}}
                                              filter={true} filterPlaceholder="Seleccione ciudad"
                                              filterBy="label,value" showClear={true}/>
                                </Col>
                            </Row>
                            <Row around="xs" start="xs">
                                <Col xs={2}>
                                    <label htmlFor="float-input">Tipo de Negocio: </label>
                                </Col>
                                <Col xs={3}>
                                    <Dropdown value={this.state.bussines} options={this.state.bussiness}
                                              onChange={this.onBussinesChange}
                                              itemTemplate={this.bussinesTemplate} style={{width: '250px'}}
                                              placeholder="Todos" optionLabel="nameDataType" filter={true}
                                              filterPlaceholder="Seleccione Negocio" filterBy="nameDataType,value"
                                              showClear={true}/>
                                </Col>
                            </Row>
                            <Row around="xs" start="xs">
                                <Col xs={2}>
                                    <label htmlFor="float-input">Linea: </label>
                                </Col>
                                <Col xs={3}>
                                    <Dropdown value={this.state.cities} options={this.state.cities}
                                              onChange={this.onCityChange} itemTemplate={this.carTemplate}
                                              style={{width: '250px'}}
                                              filter={true} filterPlaceholder="Seleccione ciudad"
                                              filterBy="label,value" showClear={true}/>
                                </Col>
                            </Row>
                            <Row around="xs" start="xs">
                                <Col xs={2}>
                                    <label htmlFor="float-input">Material: </label>
                                </Col>
                                <Col xs={3}>
                                    <Dropdown value={this.state.cities} options={this.state.cities}
                                              onChange={this.onCityChange} itemTemplate={this.carTemplate}
                                              style={{width: '250px'}}
                                              filter={true} filterPlaceholder="Seleccione ciudad"
                                              filterBy="label,value" showClear={true}/>
                                </Col>
                            </Row>
                            <Row end="xs">
                                <Col xs={4}>
                                    <Button label="Generar" className="p-button-rounded"/>
                                </Col>
                            </Row>
                        </Col>
                    </Grid>
                </Card>
            </div>
        );
    }
}

BaseGenerator.propTypes = {};

export default withStyles(styles)(BaseGenerator);


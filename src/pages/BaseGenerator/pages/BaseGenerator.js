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
        margin: "5px"
    },
    col: {
        margin: '5px',
    },
    with: '50%',
});

class BaseGenerator extends Component {

    componentDidMount() {
        this.getCities(0, Constants.GET_CITIES);
        this.getMarkets(0, Constants.GET_MARKETS);
        this.getBussiness(0, Constants.GET_BUSSINESS);
        this.getLines();
        this.getMaterials(0);
    }

    getCities = (father, group) => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.DATATYPES}/${father}/${group}`;
        console.log(url);
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({cities: data});
        });
    };


    getMarkets = (father, group) => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.DATATYPES}/${father}/${group}`;
        console.log(url);
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({markets: data});
        });
    };

    getBussiness = (father, group) => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.DATATYPES}/${father}/${group}`;
        console.log(url);
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({bussiness: data});
        });
    };

    getLines = () => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.LINES}`;
        console.log(url);
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({lines: data});
        });
    };

    getMaterials = (nameLine) => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.MATERIALS}/${nameLine}`;
        console.log(url);
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({materials: data});
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            city: null,
            bussines: null,
            market: null,
            line: null,
            material: null,
            cities: [],
            bussiness: [],
            markets: [],
            lines: [],
            materials: [],
            isEdit: false,
        };

        this.onCityChange = this.onCityChange.bind(this);
        this.onBussinesChange = this.onBussinesChange.bind(this);
        this.onMarketChange = this.onMarketChange.bind(this);
        this.onLineChange = this.onLineChange.bind(this);
        this.onMaterialChange = this.onMaterialChange.bind(this);
    }

    onCityChange(e) {
        console.log(e);
        if (e.value === undefined) {
            e.value = null;
            this.setState({markets: []});
            this.getMarkets(0, Constants.GET_MARKETS);
        }
        else {
            this.getMarkets(e.value.idDataType, Constants.GET_MARKETS);
        }
        this.setState({city: e.value});
    }

    cityTemplate(option) {
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

    onMarketChange(e) {
        this.setState({market: e.value});
    }

    marketTemplate(option) {
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

    onLineChange(e) {
        this.setState({line: e.value});
        this.setState({materials: []});
        this.getMaterials(e.value.linePlan.split(" ").join("_"));
    }

    lineTemplate(option) {
        if (!option.value) {
            return option.linePlan;
        }
        else {
            return (
                <div className="p-clearfix">
                    <span style={{float: 'right', margin: '.5em .25em 0 0'}}>{option.linePlan}</span>
                </div>
            );
        }
    }

    onMaterialChange(e) {
        this.setState({material: e.value});
    }

    materialTemplate(option) {
        if (!option.value) {
            return option.material;
        }
        else {
            return (
                <div className="p-clearfix">
                    <span style={{float: 'right', margin: '.5em .25em 0 0'}}>{option.material}</span>
                </div>
            );
        }
    }

    handleClick = (event) => {
        console.log('click' + event);
        let url = `${Constants.ROUTE_WEB_BI}${Constants.POST_CLIENT_KILOLITERS_BASE}`;

        (async () => {
            const rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "description": "Segementacion Agosto Tarija SVM 6",
                    "dateStart": "20180801",
                    "dateEnd": "20180831",
                    "originSystem": "SVM",
                    "codeCity": "TJ",
                    "codeMarket": "BO0701",
                    "codeTypeBusiness": "0",
                    "linePlan": "0",
                    "codeMaterial":"0"
                })
            });
            const content = await rawResponse.json();

            console.log(content);
        })();

        /*fetch(url, {
         method: 'POST',
         body: JSON.stringify(data), // data can be `string` or {object}!
         headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
         }
         }).then(res => res.json())
         .catch(error => console.error('Error:', error))
         .then(response => console.log('Success:', response));*/

    };

    render() {
        return (
            <div>
                <Card>
                    <Grid>
                        <Row>
                            <Col xs={12} lg={12}>
                                <Row between="xs">
                                    <Col xs={6} lg={2}>
                                        <label htmlFor="float-input">Codigo: </label>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                        <InputText id="code" type="text" size="30" value={this.state.value1}
                                                   onChange={(e) => this.setState({value1: e.target.value})}
                                                   disabled="disabled"/>
                                    </Col>
                                    <Col xs={6} lg={2}>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                    </Col>
                                </Row>
                                <Row between="xs">
                                    <Col xs={6} lg={2}>
                                        <label htmlFor="float-input">Descripción: </label>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                        <InputText id="description" type="text" size="30" value={this.state.value2}
                                                   onChange={(e) => this.setState({value2: e.target.value})}/>
                                    </Col>
                                    <Col xs={6} lg={2}>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                    </Col>
                                </Row>
                                <Row between="xs">
                                    <Col xs={6} lg={2}>
                                        <label htmlFor="float-input">Rango de Fechas: </label>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                        <Calendar value={this.state.dates}
                                                  onChange={(e) => this.setState({dates: e.value})}
                                                  selectionMode="range" readonlyInput={true}/>
                                    </Col>
                                    <Col xs={6} lg={2}>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                    </Col>
                                </Row>
                                <Row between="xs">
                                    <Col xs={6} lg={2}>
                                        <label htmlFor="float-input">Ciudad: </label>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                        <Dropdown value={this.state.city} options={this.state.cities}
                                                  onChange={this.onCityChange}
                                                  itemTemplate={this.cityTemplate}
                                                  style={{width: '250px'}} placeholder="Todos"
                                                  optionLabel="nameDataType" filter={true}
                                                  filterPlaceholder="Seleccione Ciudad"
                                                  filterBy="nameDataType" showClear={true}/>
                                    </Col>
                                    <Col xs={6} lg={2}>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                    </Col>
                                </Row>
                                <Row between="xs">
                                    <Col xs={6} lg={2}>
                                        <label htmlFor="float-input">Mercado: </label>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                        <Dropdown value={this.state.market} options={this.state.markets}
                                                  onChange={this.onMarketChange}
                                                  itemTemplate={this.marketTemplate}
                                                  style={{width: '350px'}} placeholder="Todos"
                                                  optionLabel="nameDataType" filter={true}
                                                  filterPlaceholder="Seleccione Mercado"
                                                  filterBy="nameDataType" showClear={true}/>
                                    </Col>
                                    <Col xs={6} lg={2}>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                    </Col>
                                </Row>
                                <Row between="xs">
                                    <Col xs={6} lg={2}>
                                        <label htmlFor="float-input">Tipo de Negocio: </label>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                        <Dropdown value={this.state.bussines} options={this.state.bussiness}
                                                  onChange={this.onBussinesChange}
                                                  itemTemplate={this.bussinesTemplate}
                                                  style={{width: '350px'}} placeholder="Todos"
                                                  optionLabel="nameDataType" filter={true}
                                                  filterPlaceholder="Seleccione Negocio"
                                                  filterBy="nameDataType" showClear={true}/>
                                    </Col>
                                    <Col xs={6} lg={2}>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                    </Col>
                                </Row>
                                <Row between="xs">
                                    <Col xs={6} lg={2}>
                                        <label htmlFor="float-input">Linea: </label>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                        <Dropdown value={this.state.line} options={this.state.lines}
                                                  onChange={this.onLineChange} itemTemplate={this.lineTemplate}
                                                  style={{width: '350px'}} placeholder="Todos" optionLabel="linePlan"
                                                  filter={true} filterPlaceholder="Seleccione Linea" filterBy="linePlan"
                                                  showClear={true}/>
                                    </Col>
                                    <Col xs={6} lg={2}>
                                        <label htmlFor="float-input">Material: </label>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                        <Dropdown value={this.state.material} options={this.state.materials}
                                                  onChange={this.onMaterialChange} itemTemplate={this.materialTemplate}
                                                  style={{width: '350px'}} placeholder="Todos" optionLabel="material"
                                                  filter={true} filterPlaceholder="Seleccione Material"
                                                  filterBy="material"
                                                  showClear={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                </Row>
                                <Row between="xs">
                                    <Col xs={6} lg={2}>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                    </Col>
                                    <Col xs={6} lg={2}>
                                    </Col>
                                    <Col xs={6} lg={4}>
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

BaseGenerator.propTypes = {};

export default withStyles(styles)(BaseGenerator);


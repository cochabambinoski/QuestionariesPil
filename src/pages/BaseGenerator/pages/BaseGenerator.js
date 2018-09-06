/**
 * Created by smirandaz on 08/30/2018.
 */

import React, {Component} from "react";
import {Card} from "primereact/card";
import {withStyles} from "@material-ui/core/styles";
import {Col, Grid, Row} from "react-flexbox-grid";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import Constants from "./../../../Constants.json";
import CircularProgress from "@material-ui/core/CircularProgress";


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

    constructor(props) {
        super(props);

        this.state = {
            codeSeg: null,
            description: null,
            dates: null,
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
            process: 1,
        };

        this.onCityChange = this.onCityChange.bind(this);
        this.onBussinesChange = this.onBussinesChange.bind(this);
        this.onMarketChange = this.onMarketChange.bind(this);
        this.onLineChange = this.onLineChange.bind(this);
        this.onMaterialChange = this.onMaterialChange.bind(this);
    }

    shouldComponentUpdate(next_props, next_state) {
        return true;
    }

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

    setBase = (data) => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.POST_CLIENT_KILOLITERS_BASE}`;
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
            });
    };

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

    dateToISO = (date) => {
        let newDate = new Date(date);
        let dateFormat = require('dateformat');
        return dateFormat(newDate, "yyyymmdd");
    }

    handleClick = (event) => {
        console.log("click: ", this.state.process);
        if (this.state.description !== null && this.state.dates !== null) {
            this.setState({process: 0});
            const city = this.state.city;
            const market = this.state.market;
            const bussines = this.state.bussines;
            const line = this.state.line;
            const material = this.state.material;
            this.setBase({
                "description": this.state.description.toString(),
                "dateStart": this.dateToISO(this.state.dates[0]),
                "dateEnd": this.dateToISO(this.state.dates[1]),
                "originSystem": "SVM",
                "codeCity": city === null ? 0 : city.codeDataType.toString(),
                "codeMarket": market === null ? 0 : market.codeDataType.toString(),
                "codeTypeBusiness": bussines === null ? 0 : bussines.codeDataType.toString(),
                "linePlan": line === null ? 0 : line.linePlan.toString(),
                "codeMaterial": material === null ? 0 : material.codeMaterial.toString(),
            });
            this.setState({dates: null});
        }
    };

    render() {
        const {process} = this.state;
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Generación de Segmentación Base</h1>
                        <p></p>
                    </div>
                </div>
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
                            <Col xs={12} lg={12}>
                                <Row between="xs">
                                    <Col xs={6} lg={2}>
                                        <label htmlFor="float-input">Codigo: </label>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                        <InputText id="code" type="text" size="30" value={this.state.codeSeg}
                                                   onChange={(e) => this.setState({codeSeg: e.target.value})}
                                                   disabled="disabled" style={{margin: '.25em'}}/>
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
                                        <InputText id="description" type="text" size="45" value={this.state.description}
                                                   onChange={(e) => this.setState({description: e.target.value})}
                                                   style={{margin: '.25em'}}/>
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
                                        <Calendar dateFormat="dd/mm/yy" value={this.state.dates}
                                                  onChange={(e) => this.setState({dates: e.value})}
                                                  selectionMode="range" readonlyInput={true} style={{margin: '.25em'}}/>
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
                                                  style={{width: '350px', margin: '.25em'}} placeholder="Todos"
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
                                                  style={{width: '350px', margin: '.25em'}} placeholder="Todos"
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
                                                  style={{width: '350px', margin: '.25em'}} placeholder="Todos"
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
                                                  style={{width: '350px', margin: '.25em'}} placeholder="Todos"
                                                  optionLabel="linePlan"
                                                  filter={true} filterPlaceholder="Seleccione Linea"
                                                  filterBy="linePlan"
                                                  showClear={true}/>
                                    </Col>
                                    <Col xs={6} lg={2}>
                                        <label htmlFor="float-input">Material: </label>
                                    </Col>
                                    <Col xs={6} lg={4}>
                                        <Dropdown value={this.state.material} options={this.state.materials}
                                                  onChange={this.onMaterialChange}
                                                  itemTemplate={this.materialTemplate}
                                                  style={{width: '350px', margin: '.25em'}} placeholder="Todos"
                                                  optionLabel="material"
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
                                        <Button label="Generar" onClick={this.handleClick} style={{margin: '.25em'}}/>
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

BaseGenerator
    .propTypes = {};

export default withStyles(styles) (BaseGenerator);


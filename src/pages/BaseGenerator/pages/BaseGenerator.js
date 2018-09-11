/**
 * Created by smirandaz on 08/30/2018.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Card} from "primereact/card";
import {withStyles} from "@material-ui/core/styles";
import {Col, Grid, Row} from "react-flexbox-grid";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import Constants from "./../../../Constants.json";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as utilDate from "../../../utils/dateUtils";

const styles = theme => ({
    row: {
        margin: ".1em"
    },
    col: {
        margin: '.1em',
    },
    with: '50%',
});

class BaseGenerator extends Component {

    constructor(props) {
        super(props);
        let segment = props.segment;
        console.log(segment);
        this.state = {
            codeSeg: segment.idClientKiloliter,
            description: segment.description,
            startDate: segment.dateStart,
            endDate: segment.dateEnd,
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
            idClientKiloliter: segment.idClientKiloliter,
            idTypeBusiness: segment.idTypeBusiness,
            idTypeCity: segment.idTypeCity,
            idTypeMarket: segment.idTypeMarket,
            idLine: segment.line,
            codeMaterial: segment.codeMaterial,
            dates: null,
        };

        this.onCityChange = this.onCityChange.bind(this);
        this.onBussinesChange = this.onBussinesChange.bind(this);
        this.onMarketChange = this.onMarketChange.bind(this);
        this.onLineChange = this.onLineChange.bind(this);
        this.onMaterialChange = this.onMaterialChange.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({city: this.getValueType(this.state.cities, this.state.idTypeCity)});
        this.onCityChange.bind(this.state.city);
        this.setState({market: this.getValueType(this.state.markets, this.state.idTypeMarket)});
        this.setState({bussines: this.getValueType(this.state.bussiness, this.state.idTypeBusiness)});
        this.setState({line: this.getValueLine()});
        this.setState({material: this.getValueMaterial()});
    }

    componentDidMount() {
        if (this.state.startDate !== undefined && this.state.endDate !== undefined) {
            this.setState({dates: [utilDate.getDate(this.state.startDate), utilDate.getDate(this.state.endDate)]});
        }
        this.getCities(0, Constants.GET_CITIES);
        this.getMarkets(0, Constants.GET_MARKETS);
        this.getBussiness(0, Constants.GET_BUSSINESS);
        this.getLines();
        this.getMaterials(0);
    }

    getValueType(myList, myValue) {
        let list = myList;
        let one = myValue;
        let finded = list.filter(function (value) {
            if (value.idDataType === one) {
                return value;
            }
        });
        return finded[0];
    }

    getValueLine() {
        let list = this.state.lines;
        let one = this.state.idLine;
        let finded = list.filter(function (value) {
            ;
            if (value.linePlan === one) {
                return value;
            }
        });
        return finded[0];
    }

    getValueMaterial() {
        let list = this.state.materials;
        let one = this.state.codeMaterial;
        let finded = list.filter(function (value) {
            if (value.codeMaterial === one) {
                return value;
            }
        });
        return finded[0];
    }

    shouldComponentUpdate(next_props, next_state) {
        if (next_state.description === this.state.description)
            return true;
    }

    getCities = (father, group) => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.DATATYPES}/${father}/${group}`;
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({cities: data});
        });
    };


    getMarkets = (father, group) => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.DATATYPES}/${father}/${group}`;
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({markets: data});
        });
    };

    getBussiness = (father, group) => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.DATATYPES}/${father}/${group}`;
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({bussiness: data});
        });
    };

    getLines = () => {
        let url = `${Constants.ROUTE_WEB_BI}${Constants.LINES}`;
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
            console.log.material;
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
        console.log('value e city: ', e);
        if (e.value === undefined || e.value === null) {
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
                    <span style={{float: 'right', margin: '.5em .5em 0 0'}}>{option.nameDataType}</span>
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
                    <span style={{float: 'right', margin: '.5em .5em 0 0'}}>{option.nameDataType}</span>
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
                    <span style={{float: 'right', margin: '.5em .5em 0 0'}}>{option.nameDataType}</span>
                </div>
            );
        }
    }

    onLineChange(e) {
        console.log(e.value);
        if (e.value === undefined || e.value === null) {
            e.value = null;
            this.setState({line: []});
            this.getMaterials(0);
        }
        else {
            this.setState({line: e.value});
            this.setState({materials: []});
            this.getMaterials(e.value.linePlan.split(" ").join("_"));
        }
    }

    lineTemplate(option) {
        if (!option.value) {
            return option.linePlan;
        }
        else {
            return (
                <div className="p-clearfix">
                    <span style={{float: 'right', margin: '.5em .5em 0 0'}}>{option.linePlan}</span>
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
                    <span style={{float: 'right', margin: '.5em .5em 0 0'}}>{option.material}</span>
                </div>
            );
        }
    }

    dateToISO = (date) => {
        let newDate = new Date(date);
        let dateFormat = require('dateformat');
        return dateFormat(newDate, "yyyymmdd");
    };

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
                "linePlan": line === undefined ? 0 : line.linePlan.toString(),
                "codeMaterial": material === undefined ? 0 : material.codeMaterial.toString(),
            });
            this.setState({dates: null});
        }
    };

    render() {
        const {process} = this.state;
        return (
            <div>
                {
                    process ? this.renderForm() : <CircularProgress style={{width: '100%', height: '100%'}}/>
                }
            </div>
        );
    }

    renderForm() {
        return (
            <div>
                <Card style={{width: '100%'}} classes="">
                    <Grid classes="">
                        <Row between="xs">
                            <Col xs={6} lg={6} md={4} sd={3}>
                                <label htmlFor="float-input">Codigo: </label>
                            </Col>
                            <Col xs={6} lg={6} md={4} sd={3}>
                                <InputText id="code" type="text" size="30" value={this.state.codeSeg}
                                           onChange={(e) => this.setState({codeSeg: e.target.value})}
                                           disabled="disabled" style={{width: '200px', marginBottom: '.5em'}}/>
                            </Col>
                            <Col xs={6} lg={6} md={4} sd={3}>
                            </Col>
                            <Col xs={6} lg={6} md={4} sd={3}>
                            </Col>
                        </Row>
                        <Row between="xs">
                            <Col xs={6} lg={6}>
                                <label htmlFor="float-input">Descripción: </label>
                            </Col>
                            <Col xs={6} lg={6}>
                                <InputText id="description" type="text" size="45" value={this.state.description}
                                           onChange={(e) => this.setState({description: e.target.value})}
                                           style={{width: '200px', marginBottom: '.5em'}}/>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                        </Row>
                        <Row between="xs">
                            <Col xs={6} lg={6}>
                                <label htmlFor="float-input">Rango de Fechas: </label>
                            </Col>
                            <Col xs={6} lg={6}>
                                <Calendar dateFormat="dd/mm/yy" value={this.state.dates}
                                          onChange={(e) => this.setState({dates: e.value})}
                                          selectionMode="range" readonlyInput={true}
                                          style={{width: '200px', marginBottom: '.5em'}}/>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                        </Row>
                        <Row between="xs">
                            <Col xs={6} lg={6}>
                                <label htmlFor="float-input">Ciudad: </label>
                            </Col>
                            <Col xs={6} lg={6}>
                                <Dropdown value={this.state.city} options={this.state.cities}
                                          onChange={this.onCityChange}
                                          itemTemplate={this.cityTemplate}
                                          placeholder="Todos"
                                          optionLabel="nameDataType" filter={true}
                                          filterPlaceholder="Seleccione Ciudad"
                                          filterBy="nameDataType" style={{width: '200px', marginBottom: '.5em'}}
                                          showClear={true}/>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                        </Row>
                        <Row between="xs">
                            <Col xs={6} lg={6}>
                                <label htmlFor="float-input">Mercado: </label>
                            </Col>
                            <Col xs={6} lg={6}>
                                <Dropdown value={this.state.market} options={this.state.markets}
                                          onChange={this.onMarketChange}
                                          itemTemplate={this.marketTemplate}
                                          placeholder="Todos"
                                          optionLabel="nameDataType" filter={true}
                                          filterPlaceholder="Seleccione Mercado"
                                          filterBy="nameDataType" style={{width: '200px', marginBottom: '.5em'}}
                                          showClear={true}/>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                        </Row>
                        <Row between="xs">
                            <Col xs={6} lg={6}>
                                <label htmlFor="float-input">Tipo de Negocio: </label>
                            </Col>
                            <Col xs={6} lg={6}>
                                <Dropdown value={this.state.bussines} options={this.state.bussiness}
                                          onChange={this.onBussinesChange}
                                          itemTemplate={this.bussinesTemplate}
                                          placeholder="Todos"
                                          optionLabel="nameDataType" filter={true}
                                          filterPlaceholder="Seleccione Negocio"
                                          filterBy="nameDataType" style={{width: '200px', marginBottom: '.5em'}}
                                          showClear={true}/>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                        </Row>
                        <Row between="xs">
                            <Col xs={6} lg={6}>
                                <label htmlFor="float-input">Linea: </label>
                            </Col>
                            <Col xs={6} lg={6}>
                                <Dropdown value={this.state.line} options={this.state.lines}
                                          onChange={this.onLineChange} itemTemplate={this.lineTemplate}
                                          placeholder="Todos"
                                          optionLabel="linePlan"
                                          filter={true} filterPlaceholder="Seleccione Linea"
                                          filterBy="linePlan" style={{width: '200px', marginBottom: '.5em'}}
                                          showClear={true}/>
                            </Col>
                            <Col xs={6} lg={6}>
                                <label htmlFor="float-input">Material: </label>
                            </Col>
                            <Col xs={6} lg={6}>
                                <Dropdown value={this.state.material} options={this.state.materials}
                                          onChange={this.onMaterialChange}
                                          itemTemplate={this.materialTemplate}
                                          placeholder="Todos" optionLabel="material"
                                          filter={true} filterPlaceholder="Seleccione Material"
                                          filterBy="material" style={{width: '200px', marginBottom: '.5em'}}
                                          showClear={true}/>
                            </Col>
                        </Row>
                        <Row>
                        </Row>
                        <Row between="xs">
                            <Col xs={6} lg={6}>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                            <Col xs={6} lg={6}>
                            </Col>
                            <Col xs={6} lg={6}>
                                <Button label="Generar" onClick={this.handleClick}/>
                            </Col>
                        </Row>
                    </Grid>
                </Card>
            </div>
        );
    }
}

BaseGenerator.propTypes = {
    segment: PropTypes.object.isRequired,
};

export default withStyles(styles)(BaseGenerator);


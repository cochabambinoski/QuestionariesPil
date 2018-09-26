/**
 * Created by smirandaz on 08/30/2018.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Card} from "primereact/card";
import {withStyles} from "@material-ui/core/styles";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import Constants from "./../../../Constants.json";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as utilDate from "../../../utils/dateUtils";

class BaseGenerator extends Component {

    constructor(props) {
        super(props);
        let segment = props.segment;
        this.state = {
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
            description: segment.description === undefined ? "" : segment.description,
            startDate: segment.dateStart === undefined ? utilDate.firstDayOfMonth() : segment.dateStart,
            endDate: segment.dateEnd === undefined ? utilDate.getNow() : segment.dateEnd,
            idClientKiloliter: segment.idClientKiloliter === undefined ? 0 : segment.idClientKiloliter,
            idTypeBusiness: segment.idTypeBusiness === undefined ? "" : segment.idTypeBusiness,
            idTypeCity: segment.idTypeCity === undefined ? "" : segment.idTypeCity,
            idTypeMarket: segment.idTypeMarket === undefined ? "" : segment.idTypeMarket,
            idLine: segment.line === undefined ? "" : segment.line,
            codeMaterial: segment.codeMaterial === undefined ? "" : segment.codeMaterial,
            dates: null
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
        this.setState({material: this.getValueMaterial() === undefined ? 0 : this.getValueMaterial()});
    }

    componentDidMount() {
        this.props.setBaseClick(this.handleSaveBase);
        if (this.state.startDate !== undefined && this.state.endDate !== undefined) {
            this.setState({dates: [utilDate.getDate(this.state.startDate), utilDate.getDate(this.state.endDate)]});
        }
        this.getCities(0, Constants.GET_CITIES);
        this.getMarkets(0, Constants.GET_MARKETS);
        this.getBussiness(0, Constants.GET_BUSSINESS);
        this.getLines();
        this.getMaterials(0);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
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
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({materials: data});
        });
    };

    onCityChange(e) {
        if (e.value === undefined || e.value === null) {
            e.value = null;
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
        if (e.value === undefined || e.value === null) {
            e.value = null;
        }
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
        if (e.value === undefined || e.value === null) {
            e.value = null;
        }
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
        if (e.value === undefined || e.value === null) {
            e.value = null;
            this.setState({line: e.value});
            this.getMaterials(0);
        } else {
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
        if (e.value === undefined || e.value === null) {
            e.value = null;
        }
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

    handleSaveBase = () => {
        if (this.state.description !== null && this.state.dates !== null) {
            this.setState({process: 0});
            let data = this.getData();
            this.setBase(data);
            this.setState({dates: null});
        }
    };

    getData() {
        const id = this.state.idClientKiloliter;
        const city = this.state.city;
        const market = this.state.market;
        const bussines = this.state.bussines;
        const line = this.state.line === undefined ? null : this.state.line;
        const material = this.state.material === undefined ? null : this.state.material;
        return {
            "idClientKiloliter": id,
            "description": this.state.description.toString(),
            "dateStart": this.dateToISO(this.state.dates[0]),
            "dateEnd": this.dateToISO(this.state.dates[1]),
            "originSystem": "SVM",
            "codeCity": (city === undefined || city === null) ? 0 : city.codeDataType.toString(),
            "codeMarket": (market === undefined || market === null) ? 0 : market.codeDataType.toString(),
            "codeTypeBusiness": (bussines === undefined || bussines === null) ? 0 : bussines.codeDataType.toString(),
            "linePlan": (line === undefined || line === null || line.linePlan === "") ? 0 : line.linePlan.toString(),
            "codeMaterial": (material === 0 || material === null) ? 0 : material.codeMaterial.toString()
        };
    }

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
                if (response === undefined) {
                    this.props.refresh(0);
                    this.setState({process: 1});
                    return;
                }
                if (response.codeResult === null || response.codeResult === undefined) {
                    if (response.status > 200) {
                        this.props.refresh(0);
                        this.setState({process: 1});
                    }
                } else {
                    this.props.refresh(response.codeResult);
                    this.setState({process: response.codeResult});
                }
            });
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
                <Card style={{width: '100%'}} classes="">
                    <div className="row">
                        <div className="col-auto divCol">
                            <label htmlFor="float-input" className="label">Codigo: </label>
                        </div>
                        <div className="col-auto divCol">
                            <InputText id="code" type="text" size="30"
                                       value={this.state.idClientKiloliter === 0 ? null : this.state.idClientKiloliter}
                                       onChange={(e) => this.setState({codeSeg: e.target.value})}
                                       disabled="disabled" className="imput" style={{width: '200px'}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto divCol">
                            <label htmlFor="float-input" className="label">Descripción: </label>
                        </div>
                        <div className="col-auto divCol">
                            <InputText id="description" type="text" size="45" value={this.state.description}
                                       onChange={(e) => this.setState({description: e.target.value})}
                                       className="imput" style={{width: '200px'}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto divCol">
                            <label htmlFor="float-input" className="label">Rango de Fechas: </label>
                        </div>
                        <div className="col-auto divCol">
                            <Calendar dateFormat="dd/mm/yy" value={this.state.dates}
                                      onChange={(e) => this.setState({dates: e.value})}
                                      selectionMode="range" readonlyInput={true}
                                      className="imput" style={{width: '200px'}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto divCol">
                            <label htmlFor="float-input" className="label">Ciudad: </label>
                        </div>
                        <div className="col-auto divCol">
                            <Dropdown value={this.state.city} options={this.state.cities}
                                      onChange={this.onCityChange}
                                      itemTemplate={this.cityTemplate}
                                      placeholder="Todos"
                                      optionLabel="nameDataType" filter={true}
                                      filterPlaceholder="Seleccione Ciudad"
                                      filterBy="nameDataType" className="imput"
                                      showClear={true} style={{width: '200px'}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto divCol">
                            <label htmlFor="float-input" className="label">Mercado: </label>
                        </div>
                        <div className="col-auto divCol">
                            <Dropdown value={this.state.market} options={this.state.markets}
                                      onChange={this.onMarketChange}
                                      itemTemplate={this.marketTemplate}
                                      placeholder="Todos"
                                      optionLabel="nameDataType" filter={true}
                                      filterPlaceholder="Seleccione Mercado"
                                      filterBy="nameDataType" className="imput"
                                      showClear={true} style={{width: '200px'}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto divCol">
                            <label htmlFor="float-input" className="label">Tipo de Negocio: </label>
                        </div>
                        <div className="col-auto divCol">
                            <Dropdown value={this.state.bussines} options={this.state.bussiness}
                                      onChange={this.onBussinesChange}
                                      itemTemplate={this.bussinesTemplate}
                                      placeholder="Todos"
                                      optionLabel="nameDataType" filter={true}
                                      filterPlaceholder="Seleccione Negocio"
                                      filterBy="nameDataType" className="imput"
                                      showClear={true} style={{width: '200px'}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto divCol">
                            <label htmlFor="float-input" className="label">Linea: </label>
                        </div>
                        <div className="col-auto divCol">
                            <Dropdown value={this.state.line} options={this.state.lines}
                                      onChange={this.onLineChange} itemTemplate={this.lineTemplate}
                                      placeholder="Todos"
                                      optionLabel="linePlan"
                                      filter={true} filterPlaceholder="Seleccione Linea"
                                      filterBy="linePlan" className="imput"
                                      showClear={true} style={{width: '200px'}}/>
                        </div>
                        <div className="col-auto divCol">
                            <label htmlFor="float-input" className="label space">Material: </label>
                        </div>
                        <div className="col-auto divCol">
                            <Dropdown value={this.state.material} options={this.state.materials}
                                      onChange={this.onMaterialChange}
                                      itemTemplate={this.materialTemplate}
                                      placeholder="Todos" optionLabel="material"
                                      filter={true} filterPlaceholder="Seleccione Material"
                                      filterBy="material" className="imput"
                                      showClear={true} style={{width: '200px'}}/>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

BaseGenerator.propTypes = {
    segment: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired
};

export default BaseGenerator;


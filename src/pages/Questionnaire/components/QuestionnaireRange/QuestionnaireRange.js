import React, { Component } from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './QuestionnaireRange.css';
import { TabView, TabPanel } from 'primereact/tabview';
import { Checkbox } from 'primereact/checkbox';
import Constants from '../../../../Constants.json';

class QuestionnaireRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCities: false,
            allBranches: false,
            countrySelected: false,
            lsSelectedBranches: [],
            lsSelectedDepartments: [],
            lsBranches: [
                {
                    "id": 3,
                    "nombre": "CBA BETA 1",
                    "direccion": "AVENIDA CAPITÃN USTARIZ KM 9 1/2 NRO. S/N",
                    "nsucursal": 22,
                    "fonos": "4260164",
                    "ubicacion": "COLCAPIRHUA"
                },
                {
                    "id": 5,
                    "nombre": "LPZ BETA 1",
                    "direccion": "AVENIDA CAPITÃN USTARIZ KM 9 1/2 NRO. S/N",
                    "nsucursal": 22,
                    "fonos": "4260164",
                    "ubicacion": "COLCAPIRHUA"
                },
                {
                    "id": 7,
                    "nombre": "SUCRE BETA 1",
                    "direccion": "AVENIDA CAPITÃN USTARIZ KM 9 1/2 NRO. S/N",
                    "nsucursal": 22,
                    "fonos": "4260164",
                    "ubicacion": "COLCAPIRHUA"
                }
            ],
            lsDepartments: [
                {
                    "id": 260,
                    "nombre": "COCHABAMBA",
                    "abreviacion": "CB"
                },
                {
                    "id": 262,
                    "nombre": "LA PAZ",
                    "abreviacion": "LPZ"
                },
                {
                    "id": 263,
                    "nombre": "TARIJA",
                    "abreviacion": "TRJ"
                }
            ],
        };
        this.onCityChange = this.onCityChange.bind(this);
        this.onBranchChange = this.onBranchChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.selectAllCities = this.selectAllCities.bind(this);
    }
    selectAllCities() {
        let selectedAux = [...this.state.lsDepartments];
        selectedAux.forEach(function(element) {
            if(this.state.lsSelectedDepartments.indexOf(element, 0)){

            }
          });
    }
    onCityChange(e) {
        let selectedAux = [...this.state.lsSelectedDepartments];
        if (e.checked)
            selectedAux.push(e.value);
        else
            selectedAux.splice(selectedAux.indexOf(e.value, 0), 1);
        this.setState({ lsSelectedDepartments: selectedAux });
        this.props.selectCities(selectedAux);
    }
    onBranchChange(e) {
        let selectedAux = [...this.state.lsSelectedBranches];
        if (e.checked)
            selectedAux.push(e.value);
        else
            selectedAux.splice(selectedAux.indexOf(e.value, 0), 1);
        this.setState({ lsSelectedBranches: selectedAux });
        this.props.selectBranches(selectedAux);
    }
    onCountryChange(e) {
        this.setState({ countrySelected: e.checked });
        this.props.selectCities(this.state.lsDepartments);
    }
    contains = (list, value) => {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == value.id) {
                return true;
            }
        }
        return false;
    }
    handleSelectCities = (cities) => {
        console.log("handle selectCities: " + cities);
        this.props.selectCities(cities);
    }
    handleSelectBranches = (branches) => {
        console.log("handle selectBranches: " + branches);
        this.props.selectBranches(branches);
    }
    componentDidMount() {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_CITIES)
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({ lsDepartments: data });
                console.log("cities: ", this.state.lsDepartments);
            });
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_BRANCHES)
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({ lsBranches: data });
                console.log("branches", this.state.lsBranches);
            });
    }
    render() {
        return (
            <div>
                <div className="ui-g-12">
                    <div className=" card-w-title">
                        <h4 className="light-text">Alcance</h4>
                        <TabView className="tab">
                            <TabPanel header="Sucursal">
                                {this.state.lsBranches.map((branch, index) => {
                                    return (
                                        <div className="ui-g-12">
                                            <Checkbox inputId={branch.id} value={branch} onChange={this.onBranchChange} checked={this.contains(this.state.lsSelectedBranches, branch)}></Checkbox>
                                            <label htmlFor={branch.id}>{branch.nombre}</label>
                                        </div>
                                    )
                                })}
                            </TabPanel>
                            <TabPanel header="Regional">
                                <div>
                                    {this.state.lsDepartments.map((dep) => {
                                        return (
                                            <div className="ui-g-12">
                                                <Checkbox inputId={dep.id} value={dep} onChange={this.onCityChange} checked={this.contains(this.state.lsSelectedDepartments, dep)} ></Checkbox>
                                                <label htmlFor={dep.id}>{dep.nombre}</label>
                                            </div>
                                        )
                                    })}
                                </div>

                            </TabPanel>
                            <TabPanel header="Pais">
                                <div className="ui-g-12">
                                    <Checkbox inputId="country" value="Bolivia" onChange={this.onCountryChange} checked={this.state.countrySelected} ></Checkbox>
                                    <label htmlFor="country">Bolivia</label>
                                </div>

                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionnaireRange;
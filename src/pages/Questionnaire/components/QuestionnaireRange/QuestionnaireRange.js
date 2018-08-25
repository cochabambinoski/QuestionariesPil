import React, { Component } from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './QuestionnaireRange.css';
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
            received: true,
            lsBranches: [],
            lsDepartments: [],
        };
        this.onCityChange = this.onCityChange.bind(this);
        this.onBranchChange = this.onBranchChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.addAllCities = this.addAllCities.bind(this);
        this.addCity = this.addCity.bind(this);
        this.removeAllCities = this.removeAllCities.bind(this);
        this.removeCity = this.removeCity.bind(this);
        this.addRemoveAllBranchesForCity = this.addRemoveAllBranchesForCity.bind(this);
        this.addBranch = this.addBranch.bind(this);
        this.removeBranch = this.removeBranch.bind(this);
    }
    onCityChange(e) {
        if (e.checked)
            this.addCity(e.value);
        else
            this.removeCity(e.value);
    }
    onBranchChange(e) {
        if (e.checked)
            this.addBranch(e.value);
        else
            this.removeBranch(e.value);
    }
    onCountryChange(e) {
        this.setState({ countrySelected: e.checked });
        if (e.checked)
            this.addAllCities();
        else
            this.removeAllCities();
    }
    addAllCities() {
        this.setState(function (prevState, props) {
            prevState.lsDepartments.forEach((city) => { this.addCity(city); });
        });
    }
    addCity(city) {
        this.setState(function (prevState, props) {
            let selectedAux = [...prevState.lsSelectedDepartments];
            let selected = selectedAux.filter((auxCity) => (auxCity.id == city.id));
            if (selected.length == 0) {
                selectedAux.push(city);
                this.addRemoveAllBranchesForCity(city, true);
                return { lsSelectedDepartments: selectedAux };
            }
        });
    }
    removeAllCities() {
        this.setState(function (prevState, props) {
            prevState.lsSelectedDepartments.forEach((city) => { this.removeCity(city) });
        });
    }
    removeCity(city) {
        this.setState(function (prevState, props) {
            let selectedAux = [...prevState.lsSelectedDepartments];
            if (selectedAux.indexOf(city, 0) != -1) {
                selectedAux.splice(selectedAux.indexOf(city, 0), 1);
                this.addRemoveAllBranchesForCity(city, false);
                return { lsSelectedDepartments: selectedAux };
            }
        });
    }
    addRemoveAllBranchesForCity(city, add) {
        let branches = this.state.lsBranches.filter((branch) => (branch.departamento.id == city.id));
        branches.forEach((branch) => {
            if (add)
                this.addBranch(branch);
            else
                this.removeBranch(branch);
        });
    }
    addBranch(branch) {
        this.setState((prevState, props) => {
            let selectedAux = [...prevState.lsSelectedBranches];
            if (selectedAux.indexOf(branch, 0) == -1) {
                selectedAux.push(branch);
                this.props.selectBranches(selectedAux);
                return { lsSelectedBranches: selectedAux };
            }
        });

    }
    removeBranch(branch) {
        this.setState((prevState, props) => {
            let selectedAux = [...prevState.lsSelectedBranches];
            if (selectedAux.indexOf(branch, 0) != -1) {
                selectedAux.splice(selectedAux.indexOf(branch, 0), 1);
                this.props.selectBranches(selectedAux);
                return { lsSelectedBranches: selectedAux };
            }
        });
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
        this.props.selectCities(cities);
    }
    handleSelectBranches = (branches) => {
        this.props.selectBranches(branches);
    }
    componentDidMount() {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_CITIES)
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({ lsDepartments: data });
            });
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_BRANCHES)
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({ lsBranches: data });
            });
    }
    render() {
        console.log("range props: " + JSON.stringify(this.props));
        if (this.props != undefined && this.props.branches != null && this.props.branches.length != this.state.lsSelectedBranches.length) {
            const branches = this.props.branches;
            console.log("branches: " + JSON.stringify(branches));
            const cities = this.props.cities;
            if (cities.length == 9) this.setState({ countrySelected: true });
            this.setState({ lsSelectedDepartments: cities });
            this.setState({ lsSelectedBranches: branches });
        }
        return (
            <div>
                <div className="ui-g-12">
                    <div className=" card-w-title">
                        <h4 className="light-text">Alcance</h4>
                        <div className="ui-g-12">
                            <h5>Pais</h5>
                            <Checkbox inputId="country" value="Bolivia" onChange={this.onCountryChange} checked={this.state.countrySelected} disabled={this.props.readOnly} ></Checkbox>
                            <label htmlFor="country">Bolivia</label>
                        </div>

                        <h5>Regional</h5>
                        <div>
                            {this.state.lsDepartments.map((dep) => {
                                return (
                                    <div className="ui-g-12">
                                       <Checkbox inputId={dep.id} value={dep} onChange={this.onCityChange} checked={this.contains(this.state.lsSelectedDepartments, dep)} disabled={this.props.readOnly}></Checkbox>
                                        <label htmlFor={dep.id}>{dep.nombre}</label>
                                    </div>
                                )
                            })}
                        </div>

                        <h5>Sucursal</h5>
                        {this.state.lsBranches.map((branch, index) => {
                            return (
                                <div className="ui-g-12">
                                    <Checkbox inputId={branch.id} value={branch} onChange={this.onBranchChange} checked={this.contains(this.state.lsSelectedBranches, branch)} disabled={this.props.readOnly}></Checkbox>
                                    <label htmlFor={branch.id}>{branch.nombre}</label>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionnaireRange;
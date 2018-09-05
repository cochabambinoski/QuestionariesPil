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
            countrySelected: false,
            lsSelectedBranches: [],
            lsSelectedDepartments: [],
            received: true,
            lsBranches: [],
            lsDepartments: [],
            ranges: [],
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
        this.containsCityRange = this.containsCityRange.bind(this);
        this.containsBranchRange = this.containsBranchRange.bind(this);
        this.containsBranch = this.containsBranch.bind(this);

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
            let selected = selectedAux.filter((auxCity) => (auxCity.id === city.id));
            if (selected.length === 0) {
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
            if (selectedAux.indexOf(city, 0) !== -1) {
                selectedAux.splice(selectedAux.indexOf(city, 0), 1);
                this.addRemoveAllBranchesForCity(city, false);
                return { lsSelectedDepartments: selectedAux };
            }
        });
    }
    addRemoveAllBranchesForCity(city, add) {
        let branches = this.state.lsBranches.filter((branch) => (branch.departamento.id === city.id));
        branches.forEach((branch) => {
            if (add)
                this.addBranch(branch);
            else
                this.removeBranch(branch);
        });
    }
    addBranch(branch) {
        this.setState((prevState, props) => {
            //let selectedAux = [...prevState.ranges];
            //if (selectedAux.indexOf(branch, 0) == -1) {
            //  selectedAux.push(branch);
            let rangesAux = [...prevState.ranges];
            const index = this.containsBranchRange(rangesAux, branch);
            console.log(index === -1);
            if (index === -1) {
                const range = {
                    id: null,
                    questionary: null,
                    city: branch.departamento,
                    branch: branch,
                    sociedadId: 'BO81',
                    operacionId: 1,
                    fechaId: null,
                    usuarioId: 'jarispe',
                };
                rangesAux.push(range);
            } else {
                console.log(rangesAux[index]);
                if (rangesAux[index].id != null) {
                    if (rangesAux[index].operacionId === 0) {
                        //this.state.ranges[index].operacionId = 1;
                        rangesAux[index].operacionId = 1;
                    }
                }
            }
            this.props.updateRanges(rangesAux);
            return { ranges: rangesAux };
        });
    }
    removeBranch(branch) {
        this.setState((prevState, props) => {
            let rangesAux = [...prevState.ranges];
            const index = this.containsBranchRange(rangesAux, branch);
            if (index !== -1) {
                if (rangesAux[index].id == null) {
                    rangesAux.splice(index, 1);
                } else {
                    rangesAux[index].operacionId = 0;
                }
                this.props.updateRanges(rangesAux);
                return { ranges: rangesAux };
            }
        });
    }
    contains = (list, value) => {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === value.id) {
                return true;
            }
        }
        return false;
    };
    containsCityRange = (list, city) => {
        for (var i = 0; i < list.length; i++) {
            if (list[i].city.id === city.id) {
                return true;
            }
        }
        return false;
    };
    containsBranchRange = (list, branch) => {
        for (var i = 0; i < list.length; i++) {
            if (list[i].branch.id === branch.id) {
                return i;
            }
        }
        return -1;
    };
    containsBranch = (branch) => {
        const contained = this.state.ranges.filter((range) => (range.branch.id === branch.id));
        return contained.length !== 0;
    };
    handleSelectCities = (cities) => {
        this.props.selectCities(cities);
    };
    handleSelectBranches = (branches) => {
        this.props.selectBranches(branches);
    };
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
        const id = this.props.questionnaireId;
        console.log( this.props.questionnaireId);
        console.log( this.props);
        if (id !== undefined) {
            let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_RANGES_BY_QUESTIONNAIRE}?idQuestionary=${encodeURIComponent(id)}`;
            console.log(url);
            console.log(id);
            fetch(url).then(results => {
                return results.json();
            }).then(data => {
                console.log(data);
                this.setState({ ranges: data });
                this.props.updateRanges(data);
            });
        }

    }
    render() {
        if (this.props !== undefined && this.props.branches != null && this.props.branches.length !== this.state.lsSelectedBranches.length) {
            const branches = this.props.branches;
            const cities = this.props.cities;
            if (cities.length === 9) this.setState({ countrySelected: true });
            this.setState({ lsSelectedDepartments: cities });
            this.setState({ lsSelectedBranches: branches });
        }
        return (
            <div>
                <div className="ui-g-12">
                    <div className=" card-w-title">
                        <h4 className="normal-text">Alcance</h4>
                        <div className="ui-g-6">
                            <div >
                                <h5>Pais</h5>
                                <Checkbox inputId="country" value="Bolivia" onChange={this.onCountryChange} checked={this.state.countrySelected} disabled={this.props.readOnly} />
                                <label htmlFor="country">Bolivia</label>
                            </div>

                            <h5>Regional</h5>
                            <div>
                                {this.state.lsDepartments.map((dep) => {
                                    return (
                                        <div className="ui-g-12">
                                            <Checkbox inputId={dep.id} value={dep} onChange={this.onCityChange} checked={this.contains(this.state.lsSelectedDepartments, dep)} disabled={this.props.readOnly}/>
                                            <label htmlFor={dep.id}>{dep.nombre}</label>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>

                        <div className="ui-g-6">
                            <h5>Sucursal</h5>
                            {this.state.lsBranches.map((branch, index) => {
                                return (
                                    <div className="ui-g-12">
                                        <Checkbox inputId={branch.id} value={branch} onChange={this.onBranchChange} checked={this.containsBranch(branch)} disabled={this.props.readOnly}/>
                                        <label htmlFor={branch.id}>{branch.nombre}</label>
                                    </div>
                                )
                            })}
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionnaireRange;
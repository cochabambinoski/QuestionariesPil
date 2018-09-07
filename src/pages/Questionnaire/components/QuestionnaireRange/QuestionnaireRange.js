import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './QuestionnaireRange.css';
import {Checkbox} from 'primereact/checkbox';
import Constants from '../../../../Constants.json';
import {connect} from 'react-redux';
import {getUser} from "../../../../reducers";


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
            this.addCity(e.value, true);
        else
            this.removeCity(e.value, true);
    }

    onBranchChange(e) {
        if (e.checked)
            this.addBranch(e.value);
        else
            this.removeBranch(e.value);
    }

    onCountryChange(e) {
        this.setState({countrySelected: e.checked});
        if (e.checked)
            this.addAllCities();
        else
            this.removeAllCities();

    }

    addAllCities() {
        this.setState(function (prevState, props) {
            prevState.lsDepartments.forEach((city) => {
                this.addCity(city, true);
            });
        });
    }

    addCity(city, addAllBranches) {
        this.setState(function (prevState, props) {
            let selectedAux = [...prevState.lsSelectedDepartments];
            let selected = selectedAux.filter((auxCity) => (auxCity.id === city.id));
            if (selected.length === 0) {
                selectedAux.push(city);
                if (addAllBranches) this.addRemoveAllBranchesForCity(city, true);
                return {lsSelectedDepartments: selectedAux};
            }
        });
    }

    removeAllCities() {
        this.setState(function (prevState, props) {
            prevState.lsSelectedDepartments.forEach((city) => {
                this.removeCity(city, true)
            });
        });
    }

    removeCity(city, removeBranches) {
        this.setState(function (prevState, props) {
            let selectedAux = [...prevState.lsSelectedDepartments];
            if (this.indexOf(selectedAux, city) != -1) {
                selectedAux.splice(this.indexOf(selectedAux, city), 1);
                if (removeBranches) this.addRemoveAllBranchesForCity(city, false);
                return {lsSelectedDepartments: selectedAux};
            }
        });
    }

    indexOf(list, city) {
        let index = -1;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === city.id) {
                index = i;
            }
        }
        return index;
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
            let rangesAux = [...prevState.ranges];
            const index = this.containsBranchRange(rangesAux, branch);
            if (index === -1) {
                const range = {
                    id: null,
                    questionary: null,
                    city: branch.departamento,
                    branch: branch,
                    sociedadId: 'BO81',
                    operacionId: 1,
                    fechaId: null,
                    usuarioId: this.props.user.username,
                };
                rangesAux.push(range);
            } else {
                if (rangesAux[index].id != null) {
                    if (rangesAux[index].operacionId === 0) {
                        rangesAux[index].operacionId = 1;
                    }
                }
            }
            this.props.updateRanges(rangesAux);
            return {ranges: rangesAux};
        });
        this.verifyCity(branch, true);
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
                return {ranges: rangesAux};
            }
        });
        this.verifyCity(branch, false);
    }

    verifyCity(branch, added) {
        this.setState((prevState, props) => {
            const allCityBranches = prevState.lsBranches.filter((cityBranch) => (cityBranch.departamento.id === branch.departamento.id));
            const remainingBranches = prevState.ranges.filter((range) => (range.city.id === branch.departamento.id && range.operacionId === 1));
            if (!added) {
                if (remainingBranches.length !== allCityBranches.length) {
                    this.removeCity(branch.departamento, false);
                }
            } else {
                if (allCityBranches.length === remainingBranches.length) {
                    this.addCity(branch.departamento, false)
                }
            }
        });
        this.verifyCountry();
    }

    verifyCountry() {
        this.setState((prevState, props) => {
            const allSelected = prevState.ranges.length === prevState.lsBranches.length;
            return {countrySelected: allSelected};
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

        const contained = this.state.ranges.filter((range) => (range.branch.id === branch.id && range.operacionId === 1));
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
            this.setState({lsDepartments: data});
        });
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_BRANCHES)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({lsBranches: data});
        });
        const id = this.props.questionnaireId;
        if (id !== undefined) {
            let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_RANGES_BY_QUESTIONNAIRE}?idQuestionary=${encodeURIComponent(id)}`;
            fetch(url).then(results => {
                return results.json();
            }).then(data => {
                this.setState({ranges: data});
                this.props.updateRanges(data);
            });
        }

    }

    render() {
        if (this.props !== undefined && this.props.branches != null && this.props.branches.length !== this.state.lsSelectedBranches.length) {
            const branches = this.props.branches;
            const cities = this.props.cities;
            if (cities.length === 9) this.setState({countrySelected: true});
            this.setState({lsSelectedDepartments: cities});
            this.setState({lsSelectedBranches: branches});
        }
        return (
            <div>
                <div className="ui-g-12">
                    <div className=" card-w-title">
                        <div className="ui-g-6">
                            <div>
                                <h5>Pais</h5>
                                <Checkbox inputId="country" value="Bolivia" onChange={this.onCountryChange}
                                          checked={this.state.countrySelected} disabled={this.props.readOnly}/>
                                <label htmlFor="country">Bolivia</label>
                            </div>

                            <h5>Regional</h5>
                            <div>
                                {this.state.lsDepartments.map((dep) => {
                                    return (
                                        <div className="ui-g-12">
                                            <Checkbox inputId={dep.id} value={dep} onChange={this.onCityChange}
                                                      checked={this.contains(this.state.lsSelectedDepartments, dep)}
                                                      disabled={this.props.readOnly}/>
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
                                        <Checkbox inputId={branch.id} value={branch} onChange={this.onBranchChange}
                                                  checked={this.containsBranch(branch)} disabled={this.props.readOnly}/>
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

const mapStateToProps = state => ({
    user: getUser(state),
});
export default connect(mapStateToProps, null)(QuestionnaireRange);
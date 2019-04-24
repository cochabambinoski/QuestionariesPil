import React, {Component} from 'react';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './QuestionnaireRange.css';
import {Checkbox} from 'primereact/checkbox';
import {connect} from 'react-redux';
import {getBranches, getCities, getUser} from "../../../../reducers";
import {getRangesByQuestionnaire} from "../../../../actions/indexthunk";

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
        const {lsDepartments} = this.props;
        this.setState(function () {
            lsDepartments.forEach((city) => {
                this.addCity(city, true);
            });
        });
    }

    addCity(city, addAllBranches) {
        this.setState(function (prevState) {
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
        this.setState(function (prevState) {
            prevState.lsSelectedDepartments.forEach((city) => {
                this.removeCity(city, true)
            });
        });
    }

    removeCity(city, removeBranches) {
        this.setState(function (prevState) {
            let selectedAux = [...prevState.lsSelectedDepartments];
            if (this.indexOf(selectedAux, city) !== -1) {
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
        let branches = this.props.lsBranches.filter((branch) => (branch.departamento.id === city.id));
        branches.forEach((branch) => {
            if (add)
                this.addBranch(branch);
            else
                this.removeBranch(branch);
        });
    }

    addBranch(branch) {
        this.setState((prevState) => {
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
        this.setState((prevState) => {
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
        this.setState((prevState) => {
            const allCityBranches = this.props.lsBranches.filter((cityBranch) => (cityBranch.departamento.id === branch.departamento.id));
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
        this.setState((prevState) => {
            const allSelected = prevState.ranges.length === this.props.lsBranches.length;
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

    componentDidMount() {
        this.getRanges();
    }

    getRanges() {
        const id = this.props.questionnaireId;
        if (id !== undefined) {
            this.props.getRangesByQuestionnaire(id)
                .then((data) => {
                    this.setState({ranges: data});
                    this.props.updateRanges(data);
                    data.forEach((range) => {
                        this.verifyCity(range.branch, true);
                    });
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
        const {lsDepartments, system, lsBranches} = this.props;
        return (
            <div>
                <div className="ui-g-12 text">
                    <div className="ui-g-6">
                        <div>
                            <h3>Pais</h3>
                            <Checkbox inputId="country" value="Bolivia" onChange={this.onCountryChange}
                                      checked={this.state.countrySelected} disabled={this.props.readOnly}/>
                            <label htmlFor="country">Bolivia</label>
                        </div>

                        <h3>Regional</h3>
                        <div>
                            {lsDepartments.map((dep) => {
                                return (
                                    <div style={{margin: 4}}>
                                        <Checkbox inputId={dep.id} value={dep} onChange={this.onCityChange}
                                                  checked={this.contains(this.state.lsSelectedDepartments, dep)}
                                                  disabled={this.props.readOnly}/>
                                        <label htmlFor={dep.id}>{dep.nombre}</label>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                    {
                        system !== null && system.nombre === 'SVM' ?
                            <div className="ui-g-6">
                                <h3>Sucursal</h3>
                                {lsBranches.map((branch, index) => {
                                    return (
                                        <div style={{margin: 4}} key={index}>
                                            <Checkbox inputId={branch.id} value={branch}
                                                      onChange={this.onBranchChange}
                                                      checked={this.containsBranch(branch)}
                                                      disabled={this.props.readOnly}/>
                                            <label htmlFor={branch.id}>{branch.nombre}</label>
                                        </div>
                                    )
                                })}
                            </div> : null
                    }

                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: getUser(state),
    lsDepartments: getCities(state),
    lsBranches: getBranches(state),
});

const mapDispatchToProps = dispatch => ({
    getRangesByQuestionnaire: value => dispatch(getRangesByQuestionnaire(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireRange);

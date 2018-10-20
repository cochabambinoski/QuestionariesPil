/**
 * Created by smirandaz on 08/31/2018.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid} from 'react-flexbox-grid';
import {InputText} from 'primereact/inputtext';
import {Card} from "primereact/card";
import CircularProgress from "@material-ui/core/CircularProgress";
import {sendSegmentation} from "../../../actions/indexthunk";
import connect from "react-redux/es/connect/connect";

class SegmentationGenerator extends Component {

    constructor(props) {
        super(props);
        let segment = props.segment;
        this.state = {
            code: segment.idClientKiloliter,
            level: segment.numberLevel,
            k1: segment.factorK1,
            k2: segment.factorK2,
            process: 1
        };
    }

    componentDidMount() {
        this.props.setSegmentClick(this.handleSaveSegment);
    }

    shouldComponentUpdate(next_props, next_state) {
        return true;
    }

    /**
     * send segmentation
     * @param data
     */
    setSegmentation = (data) => {
        this.props.sendSegmentation(data)
            .then((response) => {
                if (response.codeResult === null || response.codeResult === undefined) {
                    if (response.status > 200) {
                        this.setState({process: 1});
                        this.props.refresh(0);
                    }
                } else {
                    this.setState({process: response.codeResult});
                    this.props.refresh(response.codeResult);
                }
            });
    };

    handleSaveSegment = () => {
        if (this.state.description !== null && this.state.dates !== null) {
            this.setState({process: 0});
            this.setSegmentation({
                "idClientKiloliter": this.state.code,
                "numberLevel": this.state.level,
                "factorK1": this.state.k1,
                "factorK2": this.state.k2
            });
            this.setState({dates: null});
        }
    };

    handleChangeK1(e) {
        const val = e.target.value;
        if (val.length <= 4 && (/^(([0-2]{0,1})(\.\d{0,2})?)$/.test(val) || /^([1-3]{1})$/.test(val))) {
            this.setState({
                k1: val
            });
        }
    }

    handleChangeK2(e) {
        const val = e.target.value;
        if (val.length <= 4 && (/^(([0-2]{0,1})(\.\d{0,2})?)$/.test(val) || /^([1-3]{1})$/.test(val))) {
            this.setState({
                k2: val
            });
        }
    }

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
                <Card>
                    <Grid>
                        <div className="row">
                            <div className="col-auto divCol">
                                <label className="label">Codigo:</label>
                            </div>
                            <div className="col-auto divColSmall">
                                <InputText value={this.state.code}
                                           onChange={(e) => this.setState({code: e.target.value})}
                                           disabled="disabled" className="imputSmall !important"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto divCol">
                                <label className="label">Numero de Niveles:</label>
                            </div>
                            <div className="col-auto divColSmall">
                                <InputText value={this.state.level} keyfilter={/^([1-3]{1})$/}
                                           onChange={(e) => this.setState({level: e.target.value})}
                                           className="imputSmall !important" maxLength="1"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto divCol">
                                <label className="label">Factor K1:</label>
                            </div>
                            <div className="col-auto divColSmall">
                                <InputText value={this.state.k1} maxLength="4"
                                           onChange={this.handleChangeK1.bind(this)}
                                           className="imputSmall !important"/>
                            </div>
                            <div className="col-auto divCol">
                                <label className="LabelDetail">Para limite inferior</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto divCol">
                                <label className="label">Factor K2:</label>
                            </div>
                            <div className="col-auto divColSmall">
                                <InputText value={this.state.k2} maxLength="4"
                                           onChange={this.handleChangeK2.bind(this)}
                                           className="imputSmall !important"/>

                            </div>
                            <div className="col-auto divCol">
                                <label className="LabelDetail">Para limite superior</label>
                            </div>
                        </div>
                    </Grid>
                </Card>
            </div>
        );
    }
}

SegmentationGenerator.propTypes = {
    segment: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    sendSegmentation: value => dispatch(sendSegmentation(value)),
});

export default connect(null, mapDispatchToProps)(SegmentationGenerator);


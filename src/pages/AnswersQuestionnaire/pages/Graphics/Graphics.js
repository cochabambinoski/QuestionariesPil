import React, {Component} from 'react';
import {Chart} from "primereact/chart";
import {Pie} from './modelQuestions/Pie'
import {TIPPREG1, TIPPREG2, TIPPREG3, TIPPREG4, TIPPREG5} from '../Graphics/typeQuestions'
import FreeAnswerTable from "./components/FreeAnswerTable";
import ImageAnswerView from "./components/ImageAnswerView";

class Graphics extends Component {


    createModels(listAnswerCurrent){
        let data = new Pie();
        return data.addData(listAnswerCurrent)
    }

    createComponents(data) {
        if (data !== undefined) return <Chart type="pie" data={data.data}/>
    };

    render() {
        let innerComponent;
        let data;
        if(this.props.question){
            switch (this.props.question.type.codigoSap) {
                case TIPPREG1:
                    data = new Pie();
                    data.addData(this.props.listAnswerCurrent, false);
                    innerComponent = this.createComponents(data);
                    break;
                case TIPPREG2:
                    data = new Pie();
                    data.addData(this.props.listAnswerCurrent, false);
                    innerComponent = this.createComponents(data);
                    break;
                case TIPPREG3:
                    data = new Pie();
                    data.addData(this.props.listAnswerCurrent, true);
                    innerComponent = <FreeAnswerTable data={data}/>;
                    break;
                case TIPPREG4:
                    data = new Pie();
                    data.addData(this.props.listAnswerCurrent, false);
                    innerComponent = this.createComponents(data);
                    break;
                case TIPPREG5:
                    innerComponent = <ImageAnswerView data={this.props.listAnswerCurrent} />;
                    break;
                default:
                    innerComponent = this.createComponents(data);
                    break;
            }
        }
        return (
            <div>
                {
                    this.props.question ?
                    innerComponent : null
                }
            </div>
        );
    }
}

export default Graphics;
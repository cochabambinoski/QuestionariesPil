import React, {Component} from 'react';
import {Chart} from "primereact/chart";
import {Pie} from './modelQuestions/Pie'
import {TIPPREG1, TIPPREG2, TIPPREG3, TIPPREG4, TIPPREG5} from '../Graphics/typeQuestions'
import FreeAnswerTable from "./components/FreeAnswerTable";
import ImageAnswerView from "./components/ImageAnswerView";
import GraphicsPie from "../../../../components/graphicsPie/GraphicsPie";

class Graphics extends Component {


    static createModels(listAnswerCurrent){
        let data = new Pie();
        return data.addData(listAnswerCurrent)
    }

    static createComponents(data) {
        if (data !== undefined) return <Chart type="pie" data={data.data}/>
    };

    render() {
        let innerComponent;
        let data;
        if(this.props.question){
            switch (this.props.question.type.codigoSap) {
                case TIPPREG1:
                    innerComponent = <GraphicsPie question={this.props.question}/>;
                    break;
                case TIPPREG2:
                    innerComponent = <GraphicsPie question={this.props.question}/>;
                    break;
                case TIPPREG3:
                    //innerComponent = <FreeAnswerTable data={data}/>;
                    break;
                case TIPPREG4:
                    innerComponent = <GraphicsPie question={this.props.question}/>;
                    break;
                case TIPPREG5:
                   // innerComponent = <ImageAnswerView data={this.props.listAnswerCurrent} />;
                    break;
                default:
                    innerComponent = <GraphicsPie question={this.props.question}/>;
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

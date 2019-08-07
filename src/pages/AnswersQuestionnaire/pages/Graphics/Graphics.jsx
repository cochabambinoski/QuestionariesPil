import React, {Component, Fragment} from 'react';
import {Chart} from "primereact/chart";
import {Pie} from '../../../../models/Pie'
import {TIPPREG1, TIPPREG2, TIPPREG3, TIPPREG4, TIPPREG5} from '../../../../models/typeQuestions'
import FreeAnswerTable from "../../../../components/freeAnswerTable/FreeAnswerTable";
import ImageAnswerView from "../../../../components/imageAnswerView/ImageAnswerView";
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
        if(this.props.question){
            switch (this.props.question.type.codigoSap) {
                case TIPPREG1:
                    innerComponent = <GraphicsPie question={this.props.question}/>;
                    break;
                case TIPPREG2:
                    innerComponent = <GraphicsPie question={this.props.question}/>;
                    break;
                case TIPPREG3:
                    innerComponent = <FreeAnswerTable question={this.props.question}/>;
                    break;
                case TIPPREG4:
                    innerComponent = <GraphicsPie question={this.props.question}/>;
                    break;
                case TIPPREG5:
                    innerComponent = <ImageAnswerView question={this.props.question} />;
                    break;
                default:
                    innerComponent = <GraphicsPie question={this.props.question}/>;
                    break;
            }
        }
        return (
            <Fragment>
                {this.props.question ? innerComponent : null}
            </Fragment>
        );
    }
}

export default Graphics;

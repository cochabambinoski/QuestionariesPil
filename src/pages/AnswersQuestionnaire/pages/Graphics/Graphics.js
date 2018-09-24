import React, {Component} from 'react';
import {Chart} from "primereact/chart";
import {OpcMult} from '../Graphics/modelQuestions/OpcMult'
import {TIPPREG1, TIPPREG2, TIPPREG3, TIPPREG4, TIPPREG5} from '../Graphics/typeQuestions'

class Graphics extends Component {


    createModels(listAnswerCurrent){
        let data = new OpcMult();
        return data.addData(listAnswerCurrent)
    }

    createComponents = () => {
        let data = this.createModels;
        console.log(data);
        return <Chart type="pie" data={data}/>
    };

    render() {
        console.log(this.props.question);
        console.log(this.props.listAnswerCurrent);
        let innerComponent;
        let data;
        if(this.props.question){
            switch (this.props.question.type.codigoSap) {
                case TIPPREG1:
                    console.log(TIPPREG1);
                    break;
                case TIPPREG2:
                    console.log(TIPPREG2);
                    break;
                case TIPPREG3:
                    console.log(TIPPREG3);
                    break;
                case TIPPREG4:
                    console.log(TIPPREG4);
                    break;
                case TIPPREG5:
                    console.log(TIPPREG5);
                    break;
                default:
                    console.log(TIPPREG5);
                    break;
            }
        }
        return (
            <div>
                {
                    this.props.question ?
                    this.props.createComponents : null
                }
            </div>
        );
    }
}

export default Graphics;
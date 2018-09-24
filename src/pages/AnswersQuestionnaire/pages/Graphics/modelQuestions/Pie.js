import {arrayColors} from '../colors'

export function Pie() {
    this.data = {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: arrayColors,
            hoverBackgroundColor: arrayColors,
        }],
        answers: []
    }
}


Pie.prototype.addData = function (answers) {
    let index;
    let indexAux;
    answers.forEach((answer) => {
        index = 0;
        indexAux = getIndex(answer, this.data.answers);
        if (indexAux !== -1) {
            this.data.datasets[0].data[indexAux] = this.data.datasets[0].data[indexAux] + 1 ;
        } else {
            this.data.labels.push(answer.answerDetail);
            this.data.answers.push(answer);
            this.data.datasets[0].data.push(1);
        }
    })
};


function includeOption(answerCurrent, answerList) {
    let value = false;
    answerList.forEach((answer) => {
        value = answer.answerDetail === answerCurrent.answerDetail;
    });
    return value;

}

const getIndex = (answerCurrent, answerList) => {
    for (let i = 0; i < answerList.length; i++) {
        if (answerList[i].answerDetail === answerCurrent.answerDetail){
            return i;
        }
    }
    return -1;
};
import { arrayColors } from '../colors'

export function OpcMult() {
    this.data = {
        labels: [],
        datasets:[{
            data:[],
            backgroundColor: arrayColors,
            hoverBackgroundColor: arrayColors,
        }],
    }
}


OpcMult.prototype.addData = function (answers) {
   answers.forEach((answer) => {
       this.data.labels.push(answer.answerDetail);
       this.data.datasets.data.push(5);
   })
};

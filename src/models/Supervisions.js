export function QuestionQuestionaries(mobileSeller, questionary, initialDate, finalDate, status) {
    const format = require('date-format');
    this.id = null;
    this.mobileSeller = mobileSeller;
    this.questionary = questionary;
    this.status = status;
    this.initialDate = format("yyyy-MM-dd hh:mm:ss", finalDate);
    this.finalDate = format( "yyyy-MM-dd hh:mm:ss", initialDate);
    this.sociedadId = "BOB1";
    this.usuarioId = "admin";
    this.operacionId = 1;
    this.fechaId = null;
}

export function QuestionaryRange(questionary, city, branch) {
    this.id = null;
    this.questionary =questionary;
    this.city = city;
    this.branch = branch;
    this.sociedadId = "BOB1";
    this.usuarioId = "admin";
    this.operacionId = 1;
    this.fechaId = null;
}

export function Questionary(name, description, lsQuestions) {
    this.id = null;
    this.name = name;
    this.description = description;
    this.lsQuestions = lsQuestions;
    this.sociedadId = "BOB1";
    this.usuarioId = "admin";
    this.operacionId = 1;
    this.fechaId = null;
}

export function QuestionOption(question, option) {
    this.id = null;
    this.question = question;
    this.option = option;
}

export function Question(questionary, type, questionOption, question, required, lsQuestionOptions) {
    this.id = null;
    this.questionary = questionary;
    this.type = type;
    this.questionOption= questionOption;
    this.question = question;
    this.required = required;
    this.lsQuestionOptions = lsQuestionOptions;
    this.sociedadId = "BOB1";
    this.usuarioId = "admin";
    this.operacionId = 1;
    this.fechaId = null;
}
import React from 'react';
import PublicQuestionnaire from "./PublicQuestionnaire";
import { Grid, Row } from 'react-flexbox-grid';

const PublicQuestionnairesList = ({questionnaires, handleClick}) => (
    <Grid>
        <Row >
            {questionnaires.map((questionnaire, index) => (
                <PublicQuestionnaire questionnaire={questionnaire} handleClick={handleClick} index={index}/>
            ))}

        </Row>
    </Grid>
);

export default PublicQuestionnairesList;
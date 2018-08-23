import React, { Component } from 'react';
import Questionnaires from '../QuestionnairesList/pages/QuestionnairesList';
import MobileSellerList from '../MobileSellerList/MobileSellerList';
import { Grid, Row, Col} from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import './styles.css';

class AssignmentQuestionary extends Component {
    render() {
        return (
            <Grid fluid>
                <Row fluid>
                    <Col xs>
                        <Paper >
                            <Questionnaires></Questionnaires>
                        </Paper>
                    </Col>
                    <Col xs>
                        <Paper >
                            <MobileSellerList idQuestionary={"57"}></MobileSellerList>
                        </Paper>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default AssignmentQuestionary;
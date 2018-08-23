import React, { Component } from 'react';
import Questionnaires from '../QuestionnairesList/pages/QuestionnairesList';
import MobileSellerList from '../MobileSellerList/MobileSellerList';
import { Grid, Row, Col} from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import './styles.css'

class AssignmentQuestionary extends Component {
    render() {
        return (
            <Grid>
                <Row fluid>
                    <Col xs={12} md= {6}>

                        <Questionnaires  className='detail'>

                        </Questionnaires>

                    </Col>
                    <Col xs={12} md={6}>
                        <Paper >
                            <div className='detail'></div>
                        </Paper>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default AssignmentQuestionary;
import React, { Component } from 'react';
import Questionnaires from '../../QuestionnairesList/pages/QuestionnairesList';
import MobileSellerList from '../../AssignmentSeller/pages/MobileSellerList/MobileSellerList';
import { Grid, Row, Col} from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import './styles.css';
import {ScrollPanel} from 'primereact/scrollpanel';

class AssignmentQuestionary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: null,
        }
    }

    render() {
        return (
            <Grid fluid>
                <Row fluid>
                    <Col xs>
                        <Paper >
                            <ScrollPanel className="scrollQuestionary" >
                                <Questionnaires></Questionnaires>
                            </ScrollPanel>
                        </Paper>
                    </Col>

                    <Col xs>
                        <Row>
                            <Paper >
                                <ScrollPanel className="scrollQuestionary" >
                                    <MobileSellerList idQuestionary={"57"}></MobileSellerList>
                                </ScrollPanel>
                            </Paper>
                        </Row>
                        <Row>

                        </Row>

                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default AssignmentQuestionary;
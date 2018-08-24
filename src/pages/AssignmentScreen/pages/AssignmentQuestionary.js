import React, {Component} from 'react';
import MobileSellerList from '../../AssignmentSeller/pages/MobileSellerList/MobileSellerList';
import {Grid, Row, Col} from 'react-flexbox-grid';
import './styles.css';
import {ScrollPanel} from 'primereact/scrollpanel';
import QuestionaryAsignmet from "../../AssignmentSeller/pages/QuestionaryAssigment/QuestionaryAsignmet";
import SearchMobileSeller from "../../AssignmentSeller/pages/MobileSellerList/components/SearchMobileSeller/SearchMobileSeller";
import SearchQuestionary from "../../AssignmentSeller/pages/QuestionaryAssigment/components/SearchQuestionary/SearchQuestionary";
import {Button} from "../../../../node_modules/primereact/button";

class AssignmentQuestionary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: null,
        }
    }

    handleSelectedQuestionary = idQuestionary => {
        console.log(idQuestionary);
        this.setState({idQuestionary: idQuestionary.toString()})
    };

    cancelAssignamentSeller = () => {
        this.setState({idQuestionary: null})
    };

    render() {
        const {idQuestionary} = this.state;
        return (
            <div className="bodyContainer">
                <Grid>
                    <Row>
                        {
                            !idQuestionary ?
                                <Col xs>
                                    <SearchQuestionary style={{elevation: '50px'}}/>
                                    <ScrollPanel style={{width: '100%', height: '80vh'}}>
                                        <QuestionaryAsignmet onSelectedQuestionary={this.handleSelectedQuestionary}/>
                                    </ScrollPanel>
                                </Col> : null
                        }

                        {
                            idQuestionary ?
                                <Col xs>
                                    <Col xs>
                                        <SearchMobileSeller/>
                                        <ScrollPanel style={{width: '100%', height: '280px', paddingBottom: '10px'}}>
                                            <MobileSellerList idQuestionary={this.state.idQuestionary} isEdit={false}/>
                                        </ScrollPanel>
                                    </Col>
                                    <Col xs>
                                        <SearchMobileSeller/>
                                        <ScrollPanel style={{width: '100%', height: '280px'}}>
                                            <MobileSellerList idQuestionary={this.state.idQuestionary} isEdit={true}/>
                                        </ScrollPanel>
                                    </Col>
                                </Col> :
                                null
                        }
                    </Row>
                </Grid>
                {
                    idQuestionary ?
                        <div><Button label="Cancelar" className="ui-button-danger" onClick={() => {
                            this.cancelAssignamentSeller()
                        }}/></div> :
                        null
                }
            </div>
        );
    }
}

export default AssignmentQuestionary;
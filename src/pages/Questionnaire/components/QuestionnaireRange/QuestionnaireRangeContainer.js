import React, {Component} from 'react';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {ScrollPanel} from "primereact/scrollpanel";
import QuestionnaireRange from "./QuestionnaireRange";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";

class QuestionnaireRangeContainer extends Component {
    render() {
        const { expandPanelRange, readOnly, system, questionnaireId, classes} = this.props;
        return (
            <ExpansionPanel expanded={expandPanelRange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={this.props.handleSetStatePanelRange}/>}>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Rango del Cuestionario</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider/>
                <ExpansionPanelDetails>
                    <ScrollPanel style={{width: '100%', height: '600px'}}>
                        <QuestionnaireRange updateRanges={this.props.updateRanges}
                                            readOnly={readOnly}
                                            system={system}
                                            questionnaireId={questionnaireId}/>
                    </ScrollPanel>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default QuestionnaireRangeContainer;

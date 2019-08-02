import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class AnswerDetail extends Component {

    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        return (
            <div>
                <Paper square style={{width: '100%'}}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        fullWidth
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {
                            this.props.answer.lsAnswerDetails.map((answers) => {
                               return  <Tab label={answers.question.question}/>
                            })
                        }
                    </Tabs>
                </Paper>

            </div>
        );
    }
}

export default AnswerDetail;
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class GraphicsDetail extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };


    render() {
        console.log(this.props.answers);
        console.log(this.props.questionarySelected);
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
                            this.props.questionarySelected.lsQuestions.map((question) => {
                                return  <Tab label={question.question}/>
                            })
                        }
                    </Tabs>
                </Paper>

            </div>
        );
    }
}

export default GraphicsDetail;
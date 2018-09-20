import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

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
        const { classes } = this.props;
        const { value } = this.state;
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
                    {value === 0 && <TabContainer>Item One</TabContainer>}
                    {value === 1 && <TabContainer>Item Two</TabContainer>}
                    {value === 2 && <TabContainer>Item Three</TabContainer>}
                </Paper>

            </div>
        );
    }
}

export default withStyles(styles)(GraphicsDetail);
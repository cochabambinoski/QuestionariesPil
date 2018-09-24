import React, {Component} from 'react';
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridList from "@material-ui/core/GridList/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class ImageAnswerView extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <GridList cellHeight={280} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                        <ListSubheader component="div">Fotografias</ListSubheader>
                    </GridListTile>
                    {this.props.data.map(answer => (
                        <GridListTile key={answer.id}>
                            <img src={'https://image.redbull.com/rbcom/052/2017-07-20/9e342907-6759-42d5-9648-a10acdf5ee93/0010/1/1050/700/1/gopro-imagen.png'} alt={answer.question.question}/>
                            <GridListTileBar
                                title={answer.title}
                                subtitle={<span>Por: {answer.answer.interviewedName ? answer.answer.interviewedName : answer.answer.mobileClient.nombrerepresentate}</span>}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <InfoIcon/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default withStyles(styles)(ImageAnswerView);
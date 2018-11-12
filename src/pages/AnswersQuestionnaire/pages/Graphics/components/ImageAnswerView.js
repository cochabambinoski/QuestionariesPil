import React, {Component} from 'react';
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridList from "@material-ui/core/GridList/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import Image from 'pimg';
import Constants from "../../../../../Constants";
import ModalContainer from "../../../../../widgets/Modal/pages/modal";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import Question from "../../../../Questionnaire/components/Question/Question";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {Col} from "react-flexbox-grid";
import Button from "@material-ui/core/Button/Button";


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

    constructor(props){
        super(props);
        this.state = {
            openDialog: false,
            answerDetail: null,
        }
    }

    openDialog(answerDetail){
        this.setState({ openDialog: true, answerDetail: answerDetail})
    }

    closeDialog(answerDetail){
        this.setState({ openDialog: false})
    }

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
                            <Image src={Constants.ROUTE_WEB_SERVICES+Constants.GET_IMAGE_ANSWER+answer.answerDetail} alt={answer.question.question}/>
                            <GridListTileBar
                                title={answer.title}
                                subtitle={<span>Por: {answer.answer.interviewedName ? answer.answer.interviewedName : answer.answer.client.nombreFactura}</span>}
                                actionIcon={
                                    <IconButton className={classes.icon} onClick={event => this.openDialog(answer.answerDetail )}>
                                        <InfoIcon/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
                < ModalContainer>
                    <Dialog
                        open={this.state.openDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title" className="titleBody">
                            <h1 className="dialogTitle">Imagen</h1>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" className="dialogBody">
                                <Image src={Constants.ROUTE_WEB_SERVICES+Constants.GET_IMAGE_ANSWER+ this.state.answerDetail} alt={this.state.answerDetail}/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button label="Cancelar" onClick={event => this.closeDialog()} className="ui-button-secondary">
                                Cerrar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ModalContainer>
            </div>
        );
    }
}

export default withStyles(styles)(ImageAnswerView);
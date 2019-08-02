import React, {Component} from 'react';
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridList from "@material-ui/core/GridList/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import {withStyles} from '@material-ui/core/styles';
import Image from 'pimg';
import Constants from "../../../../../Constants";
import ModalContainer from "../../../../../widgets/Modal/pages/modal";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import * as StringFormatUtil from "../../../../../Util/StringFormatUtil";
import TablePaginationCustom from "../../../../../components/tablePagination/TablePaginationCustom";

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
    children: {
        overflowY: 'scroll',
        height: 600,
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }
});

//noinspection JSUnresolvedVariable
class ImageAnswerView extends Component {

    constructor(props){
        super(props);
        this.state = {openDialog: false, answerDetail: null, answers: null, errorRequest: null, isLoading: true,
            cant: null, pivot: 1, ant: false, page: 0, rowsPerPage: 50,
        }
    }

    openDialog(answerDetail){
        this.setState({ openDialog: true, answerDetail: answerDetail})
    }

    closeDialog(){
        this.setState({ openDialog: false})
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value})
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    componentDidMount() {
        const {pivot, ant} = this.state;
        let {codigoSap} = this.props.question.type;
        Promise.all([
            fetch(`${Constants.ROUTE_WEB_SERVICES}${StringFormatUtil.format(Constants.GET_DATA_OF_FREE_QUESTION, this.props.question.id, ant, pivot)}`),
            fetch(`${Constants.ROUTE_WEB_SERVICES}${StringFormatUtil.format(Constants.GET_CANT_ANSWER_BY_QUESTION, this.props.question.id, codigoSap)}`)
        ]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()])).then(([answers, cant]) => {
            if (answers.status === undefined && cant.status === undefined) {
                this.setState({answers: answers, cant: cant, errorRequest: null, isLoading: false})
            } else {
                if (answers.status !== undefined) {
                    this.setState({answers: null, errorRequest: answers, isLoading: false})
                } else {
                    this.setState({answers: null, errorRequest: cant, isLoading: false})
                }
            }
        }).catch(error => {
            this.setState({answers: null, errorRequest: error, isLoading: false})
        });
    }

    render() {
        const columns = ["Fotografias"];
        const { classes } = this.props;
        const {answers, rowsPerPage, page} = this.state;
        return (
            <div className={classes.root}>
                {answers == null? (<h1>Cargando Pregunta</h1>) : (
                    <TablePaginationCustom rows={answers} page={page} rowsPerPage={rowsPerPage} columns={columns}
                                           handleChangePage={this.handleChangePage}
                                           handleChangeRowsPerPage={this.handleChangeRowsPerPage}>
                        <GridList cellHeight={280} className={classes.gridList}>
                            {answers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(answer => (
                                <GridListTile key={answer.id}>
                                    <Image src={Constants.ROUTE_WEB_SERVICES+Constants.GET_IMAGE_ANSWER+answer.answerDetail} alt={answer.question.question}/>
                                    <GridListTileBar
                                        title={answer.title}
                                        subtitle={<span>Por: {answer.answer.interviewedName ? answer.answer.interviewedName : answer.answer.client ? answer.answer.client.nombreFactura : "Sin nombre"}</span>}
                                        actionIcon={
                                            <IconButton className={classes.icon} onClick={() => this.openDialog(answer.answerDetail )}>
                                                <InfoIcon/>
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </TablePaginationCustom>
                )}
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
                            <Button label="Cancelar" onClick={() => this.closeDialog()} className="ui-button-secondary">
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

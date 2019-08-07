import React, {Component} from 'react';
import {HashRouter as Router} from "react-router-dom";
import CustomAppBar from "../../components/customAppBar/CustomAppBar";
import Routes from "../../routes/Routes";
import {Growl} from "primereact/growl";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            detail: null,
            message: null,
            close_windows: false,
        }
    }

    showMessage = (title, detail) => {
        this.setState({title: title});
        this.setState({detail: detail});
    };

    showSuccess = (title, detail) => {
        this.growl.show({severity: 'success', summary: title, detail: detail});
    };

    handleClick = () => {
        this.setState({open: true});
    };

    renderDialog() {
        return (
            <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Sesion Caducada"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Su sesion ha caducado. Por favor cierre esta ventana y vuelva a iniciar su sesion en el SVM.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>Aceptar</Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        return (
            <Router>
                <CustomAppBar menu={this.props.menu} user={this.props.user}>
                    <Growl ref={(el) => this.growl = el}/>
                    <Routes showSuccess={this.showSuccess} title={this.state.title} detail={this.state.detail}/>
                    {this.renderDialog()}
                </CustomAppBar>
            </Router>
        );
    }
}

export default HomePage;

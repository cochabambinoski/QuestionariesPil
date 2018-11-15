import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import {Button} from "../../../node_modules/primereact/button";
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {setIdUser} from '../../actions/index';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


function Login(props) {
    const { classes } = props;
    const handleSetIdUser = idUser => {
        props.setIdUser(idUser);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography variant="headline">Inicio de Sesion</Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Usuario</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Contraseña</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </FormControl>
                        <Button label="Iniciasr Sesion"  onClick={() => {
                            handleSetIdUser("462")
                        }}/>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    setIdUser: value => dispatch(setIdUser(value))
});

export default connect(null , mapDispatchToProps)(withStyles(styles)(Login));
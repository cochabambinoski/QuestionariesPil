/**
 * Created by smirandaz on 09/01/2018.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {lighten} from "@material-ui/core/styles/colorManipulator";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";

const styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight: theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    space: {
        marginLeft: '5px',
        marginRight: '5px',
    },
});

class EnhancedTableToolbar extends Component {

    constructor(props) {
        super(props);

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;

        let minDate = new Date();
        minDate.setMonth(prevMonth);
        minDate.setFullYear(prevYear);
        let maxDate = new Date();
        maxDate.setMonth(nextMonth);
        maxDate.setFullYear(nextYear);

        this.state = {
            minDate: minDate,
            maxDate: maxDate,
            invalidDates: [today],
            startDate: props.dateStart,
            endDate: props.dateEnd,
            dates: null,
        };
    }

    componentDidMount() {
        this.setState({dates: [this.state.startDate, this.state.endDate]});
    }

    handlerClick = event => {
        if (this.state.dates[0] !== null && this.state.dates[1] !== null) {
            this.state.startDate = this.state.dates[0];
            this.state.enDate = this.state.dates[1];
            this.props.updateDates(this.state.startDate, this.state.enDate);
        }
    }
    ;

    render() {
        const {classes, numSelected} = this.props;
        return (
            <Toolbar
                className={
                    (classes.root, {
                            [classes.highlight]: numSelected > 0,
                        }
                    )}>
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant="title" id="tableTitle">
                            Segmentación de Clientes
                        </Typography>
                    )}
                </div>
                <div className={classes.spacer}/>
                <div>
                    <Calendar dateFormat="dd/mm/yy" value={this.state.dates}
                              onChange={(e) => this.setState({dates: e.value})}
                              selectionMode="range" readonlyInput={true}/>
                </div>
                <div className={classes.space}>
                    <Button label="Buscar" onClick={this.handlerClick}/>
                </div>
            </Toolbar>
        );
    }
}

EnhancedTableToolbar.propTypes = {};

export default withStyles(styles)(EnhancedTableToolbar);


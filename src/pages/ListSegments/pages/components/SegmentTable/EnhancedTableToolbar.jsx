/**
 * Created by smirandaz on 09/01/2018.
 */
import React, {Component} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {Calendar} from "primereact/calendar";
import {withStyles} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add"
import FilterIcon from "@material-ui/icons/FilterList"

const BlueButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
}))(Button);

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
            dates: null
        };
    }

    componentDidMount() {
        this.setState({dates: [this.state.startDate, this.state.endDate]});
    }

    handlerFilter = () => {
        if (this.state.dates[0] !== null && this.state.dates[1] !== null) {
            this.setState({startDate: this.state.dates[0], endDate: this.state.dates[1]});
            this.props.updateDates(this.state.startDate, this.state.endDate);
        }
    };

    render() {
        return (
            <Toolbar classes="">
                <div>
                    <BlueButton label="Nuevo" onClick={event => this.props.newBase(event, 0)}
                                className="ui-button-success">
                        <AddIcon/>
                        Nuevo
                    </BlueButton>
                </div>
                <div className="spacer"/>
                <div>
                    <Calendar dateFormat="dd/mm/yy" value={this.state.dates}
                              onChange={(e) => this.setState({dates: e.value})}
                              selectionMode="range" readOnlyInput="true" className="calendar"/>
                </div>
                <div>
                    <Button label="Buscar" onClick={this.handlerFilter} className="ui-button-secondary">
                        <FilterIcon/>
                        Buscar
                    </Button>
                </div>
            </Toolbar>
        );
    }
}

EnhancedTableToolbar.propTypes = {};

export default EnhancedTableToolbar;


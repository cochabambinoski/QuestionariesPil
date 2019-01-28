/**
 * Created by smirandaz on 09/01/2018.
 */
import React, {Component} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";

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

    /**
     * click filter by dates range
     * @param event
     */
    handlerFilter = event => {
        if (this.state.dates[0] !== null && this.state.dates[1] !== null) {
            this.setState({ startDate : this.state.dates[0], enDate : this.state.dates[1]});
            this.props.updateDates(this.state.startDate, this.state.enDate);
        }
    };

    render() {
        return (
            <Toolbar classes="">
                <div>
                    <Button label="Nuevo" onClick={event => this.props.newBase(event, 0)} className="buttonBlue"
                            classes=""/>
                </div>
                <div className="spacer"/>
                <div>
                    <Calendar dateFormat="dd/mm/yy" value={this.state.dates}
                              onChange={(e) => this.setState({dates: e.value})}
                              selectionMode="range" readOnlyInput="true" className="calendar"/>
                </div>
                <div >
                    <Button label="Buscar" onClick={this.handlerFilter} className="buttonBlue"/>
                </div>
            </Toolbar>
        );
    }
}

EnhancedTableToolbar.propTypes = {};

export default EnhancedTableToolbar;


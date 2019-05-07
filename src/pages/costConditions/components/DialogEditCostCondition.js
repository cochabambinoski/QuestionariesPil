import React, {Component} from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Button from "@material-ui/core/es/Button/Button";

class DialogEditCostCondition extends Component {

    constructor(props) {
        super(props);
        const {item} = props;
        if (item) {
            this.state = {
                id: item.id,
                business: item.business,
                centerCost: item.centerCost,
                channel: item.channel,
                lineCost: item.lineCost,
                organization: item.organization,
                region: item.region,
                subRegion: item.subRegion
            }
        } else {
            this.state = {
                id: null,
                business: null,
                centerCost: null,
                channel: null,
                lineCost: null,
                organization: null,
                region: null,
                subRegion: null
            }
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {
        const {item, business, centerCost, channel, lineCost, organization, region, subRegion} = this.props;
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <form >
                    <TextField
                        disabled
                        id={'standard-disabled'}
                        label={'Id'}
                        defaultValue={this.state.id}
                        margin={"normal"}/>

                    <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                        <InputLabel>Negocio</InputLabel>
                        <Select
                            value={this.state.business}
                            onChange={this.handleChange}
                            inputProps={{anme: 'business'}}>
                            {business.map(item => {
                                return <MenuItem value={item.id}>{item.business}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                        <InputLabel>Centro de Costo</InputLabel>
                        <Select
                            value={this.state.centerCost}
                            onChange={this.handleChange}
                            inputProps={{name: 'centerCost'}}>
                            {centerCost.map(item => {
                                return <MenuItem value={item.id}>{item.center}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl style={{margin: 5, minWidth: 120, maxWidth: 300}}>
                        <InputLabel>Canal</InputLabel>
                        <Select
                            value={this.state.channel}
                            onChange={this.handleChange}
                            inputProps={{name: 'channel'}}>
                            {channel.map(item => {
                                return <MenuItem value={item.id}>{item.organization}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel>Linea</InputLabel>
                        <Select
                            value={this.state.lineCost}
                            onChange={this.handleChange}
                            inputProps={{name: 'lineCost'}}>
                            {lineCost.map(item => {
                                return <MenuItem value={item.id}>{item.line}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel>Organizacion</InputLabel>
                        <Select
                            value={this.state.organization}
                            onChange={this.handleChange}
                            inputProps={{name: 'organization'}}>
                            {organization.map(item => {
                                return <MenuItem>{item.organization}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel>Region</InputLabel>
                        <Select
                            value={this.state.region}
                            onChange={this.handleChange}
                            inputProps={{name: 'region'}}>
                            {region.map(item => {
                                return <MenuItem value={item.id}>{item.region}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel>SubRegion</InputLabel>
                        <Select
                            value={this.state.subRegion}
                            onChange={this.handleChange}
                            inputProps={{name: 'subRegion'}}>
                            {subRegion.map(item => {
                                return <MenuItem value={item.id}>{item.subRegion}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </form>
                <Toolbar>
                    <Button>Aceptar</Button>
                    <Button>Cancelar</Button>
                </Toolbar>
            </div>
        );
    }
}

export default DialogEditCostCondition;

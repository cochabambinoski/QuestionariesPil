import React, {Component} from 'react';
import {Button} from "../../../../../../../node_modules/primereact/button";
import {Card} from "../../../../../../../node_modules/primereact/card";
import './styles.scss';
import {connect} from 'react-redux';
import {addAssignementUser, deleteAssignementUser, editAssignementUser} from '../../../../../../actions/index';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Icon from "@material-ui/core/Icon/Icon";
import {getRoutesByMobileseller} from "./../../../../../../actions/indexthunk";
import {Messages} from "primereact/messages";

class MobileSellerItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileSeller: props.mobileSeller,
			isEdit: props.isEdit,
			initialDate: null,
			finalDate: null,
			routes: []
		};
	}

	handleAddSeller = (seller) => {
		this.props.handleAddSeller(seller);
	};

	handleDeleteSeller = (seller) => {
		this.props.deleteAssignement(seller);
	};

	handleEditSeller = (seller) => {
		this.props.editAssignementUser(seller);
	};

	showMessage(title, detail) {
		this.messages.show({severity: 'info', summary: title, detail: detail});
	}

	handleRoutes(id) {
		this.props.getRoutesByMobileseller(id)
			.then((result) => {
				if (result !== null) {
					var names = "";
					result.forEach((route) => {
						if (route.id != null) {
							names = names.concat(" '", route.nombre, "' ");
						}
					});
					this.showMessage('Rutas:', names.toString());
				}
			});
	}

	getDates = (seller) => {
		const format = require('date-format');
		const assignment = this.props.getAssignment(seller);
		if (assignment != null) {
			this.setState({initialDate: format("yyyy-MM-dd", new Date(assignment.initialDate))});
			this.setState({finalDate: format("yyyy-MM-dd", new Date(assignment.finalDate))});
		}
	};

	componentDidMount() {
		this.getDates(this.props.mobileSeller);
	}

	render() {
		const {isEdit} = this.state;
		return (
			<div>
				<Messages ref={(el) => this.messages = el}/>
				<Card className="cardMobileSeller" key={this.state.mobileSeller.id}>
					<div className="text">
						<div className="light-text">Nombre del vendedor</div>
						<div>{this.state.mobileSeller.vendedor.persona.nombre}</div>
						<div className="light-text">Tipo</div>
						<div>{this.state.mobileSeller.type.nombre}</div>
						{
							this.state.mobileSeller.vendedor.lsrutas[0] != null ?
								<div>
									<div className="light-text">Ruta</div>
									<div>{this.state.mobileSeller.vendedor.lsrutas[0].ruta.nombre}
										<IconButton color="#c5e1a5"
										            onClick={() => {
											            this.handleRoutes(this.state.mobileSeller.id);
										            }}
										            aria-label="Add an alarm">
											<Icon>add</Icon>
										</IconButton>
									</div>
								</div> : null
						}
						{
							this.state.initialDate != null && this.state.finalDate != null ?
								<div>
									<div className="light-text">Validez</div>
									<div>Del {this.state.initialDate} al {this.state.finalDate}</div>
								</div> : null
						}

						<br/>
						{
							isEdit === false ?
								<Button label="Asignar" onClick={() => {
									this.handleAddSeller(this.state.mobileSeller);
								}}/> :
								<Button label="Quitar" className="ui-button-danger"
								        onClick={() => {
									        this.handleDeleteSeller(this.state.mobileSeller);
								        }}
								/>
						}
					</div>
				</Card>
			</div>
		);
	}
}

MobileSellerItem.propTypes = {};

const mapDispatchToProps = dispatch => ({
	addAssignementUser: value => dispatch(addAssignementUser(value)),
	deleteAssignementUser: value => dispatch(deleteAssignementUser(value)),
	editAssignementUser: value => dispatch(editAssignementUser(value)),
	getRoutesByMobileseller: value => dispatch(getRoutesByMobileseller(value)),
});

export default connect(null, mapDispatchToProps)(MobileSellerItem);

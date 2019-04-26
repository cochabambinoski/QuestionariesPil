import React, {Component} from 'react';
import {getCreateTypes} from "../../reducers";
import connect from "react-redux/es/connect/connect";
import {createType, deleteType, getAllTypes, updateType} from "../../actions";

class TypeCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Lista de Tipos",
            subtitle: "Tipos del sistema",
            currentItem: -1,
            updateView: true,
            types: [],
            type: null,
            filter: null,
            deleteOpen: false,
            toDelete: null,
            typeOpen: false,
        }
    }

    componentDidMount() {
        //this.chargeList();
    }

    showSuccess = (title, message) => {
        this.messages.show({life: 5000, severity: 'success', summary: title, detail: message});
    };

    showInfo = (title, message) => {
        this.messages.show({life: 5000, severity: 'info', summary: title, detail: message});
    };

    showWarn = (title, message) => {
        this.messages.show({life: 5000, severity: 'warn', summary: title, detail: message});
    };

    showError = (title, message) => {
        this.messages.show({life: 5000, severity: 'error', summary: title, detail: message});
    };

    showResponse = (response) => {
        if (response === 1)
            this.showSuccess('Procesado', 'La transacción se realizó correctamente');
        else if (response === 3)
            this.showWarn('No Procesado', 'El tipo no se guardo porque ya existe uno registrado con similares datos');
        else
            this.showError('Error', 'Ocurrió un error al procesar la transacción');

    };

    chargeList = () => {
        this.props.getAllTypes()
            .then((data) => {
                console.log(data);
                this.setState(() => ({
                    concepts: data
                }));
            });
    };

    render() {
        return (
            <div>
                no mames
            </div>
        );
    }
}

TypeCenter.propTypes = {};

const mapStateToProps = state => ({
    reducerVariable: getCreateTypes(state) //no tocar
});

const mapDispatchToProps = dispatch => ({
    getAllTypes: () => dispatch(getAllTypes()),
    createType: (type) => dispatch(createType(type)),
    updateType: (type) => dispatch(updateType(type)),
    deleteType: (id) => dispatch(deleteType(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeCenter);
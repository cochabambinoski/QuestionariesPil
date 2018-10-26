/*global google*/
import React, {Component} from 'react';
import {GMap} from 'primereact/gmap';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {Growl} from 'primereact/growl';

class GoogleMapsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            markerTitle: '',
            draggableMarker: false,
            overlays: null,
            selectedPosition: null
        };

        this.onMapClick = this.onMapClick.bind(this);
        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.onMapReady = this.onMapReady.bind(this);
        this.onHide = this.onHide.bind(this);
        this.addMarker = this.addMarker.bind(this);
    }


    onMapClick(event) {
        // this.setState({
        //     dialogVisible: true,
        //     selectedPosition: event.latLng
        // });
    }

    onOverlayClick(event) {
        let isMarker = event.overlay.getTitle !== undefined;

        if(isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow = this.infoWindow||new google.maps.InfoWindow();
            this.infoWindow.setContent('<div>' + title + '</div>');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());

            this.growl.show({severity:'Informacion', summary:'Marcador Seleccionado', detail: title});
        }
        else {
            this.growl.show({severity:'Informacion', summary:'Forma seleccionada', detail: ''});
        }
    }

    handleDragEnd(event) {
        this.growl.show({severity:'Informacion', summary:'Marcador arrastrado', detail: event.overlay.getTitle()});
    }

    addMarker() {
        let newMarker = new google.maps.Marker({
            position: {
                lat: this.state.selectedPosition.lat(),
                lng: this.state.selectedPosition.lng()
            },
            title: this.state.markerTitle,
            draggable: this.state.draggableMarker
        });

        this.setState({
            overlays: [...this.state.overlays, newMarker],
            dialogVisible: false,
            draggableMarker: false,
            markerTitle: ''
        });
    }

    onMapReady(event) {
        let overlaysAnswer = [];
        if (this.props.answers.length > 0) {
            this.props.answers.forEach((answer) => {
                if (answer.latitude !== 0 && answer.longitude !== 0) {
                    overlaysAnswer.push(new google.maps.Marker({
                        position: {lat: answer.latitude, lng: answer.longitude},
                        title: answer.interviewedName ? answer.interviewedName : answer.client.nombreFactura,
                        snippet: !answer.interviewedName ? answer.client.codigo : null
                    }))
                }
            })
        }
        this.setState({
            overlays: overlaysAnswer
        })
    }

    onHide(event) {
        this.setState({dialogVisible: false});
    }

    render() {
        const options = {
            center: {lat: -17.378151587309603, lng: -66.25526416493591},
            zoom: 5
        };

        const footer = <div>
            <Button label="Yes" icon="pi pi-check" onClick={this.addMarker} />
            <Button label="No" icon="pi pi-times" onClick={this.onHide} />
        </div>;

        return (
            <div>
                <div className="content-section implementation">
                    <Growl ref={(el) => {this.growl = el;}}/>

                    <GMap overlays={this.state.overlays} options={options} style={{width: '100%', minHeight: '320px'}} onMapReady={this.onMapReady}
                          onMapClick={this.onMapClick} onOverlayClick={this.onOverlayClick} onOverlayDragEnd={this.handleDragEnd} />

                    <Dialog header="New Location" visible={this.state.dialogVisible} width="300px" modal={true} footer={footer} onHide={this.onHide}>
                        <div className="p-grid p-fluid">
                            <div className="p-col-2" style={{paddingTop:'.75em'}}><label htmlFor="Titulo">Label</label></div>
                            <div className="p-col-10"><InputText type="text" id="title" value={this.state.markerTitle} onChange={(e) => this.setState({markerTitle: e.target.value})} /></div>

                            <div className="p-col-2" style={{paddingTop:'.75em'}}>Lat</div>
                            <div className="p-col-10"><InputText readOnly value={this.state.selectedPosition ? this.state.selectedPosition.lat() : ''} /></div>

                            <div className="p-col-2" style={{paddingTop:'.75em'}}>Lng</div>
                            <div className="p-col-10"><InputText readOnly value={this.state.selectedPosition ? this.state.selectedPosition.lng() : ''} /></div>

                            <div className="p-col-2" style={{paddingTop:'.75em'}}><label htmlFor="drg">Drag</label></div>
                            <div className="p-col-10"><Checkbox checked={this.state.draggableMarker} onChange={(event) => this.setState({draggableMarker: event.checked})}/></div>
                        </div>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default GoogleMapsComponent;
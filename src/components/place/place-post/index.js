import React, {Component} from 'react';
import {render} from 'react-dom';
import { Input } from '../../ui/input';
import PropTypes from 'prop-types';
import { CardHeaderTittle } from '../../ui/cards-icon';
import { placeService } from '../../../services/place';
import { withRouter } from "react-router-dom";

import './style.scss';

class PlacePost extends Component {
  constructor(props){
    super(props);
    this.addNewPlace = this.addNewPlace.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.savePhotoInCache = this.savePhotoInCache.bind(this);
    this.photo = null;
    this.changeMarker = this.changeMarker.bind(this);
    this.marker = null;
    this.place = null;
  }
  
  componentDidMount(){
    const map = new window.google.maps.Map(document.getElementById('map-picker'), {
      center: {lat:10.9743, lng:-74.8033},
      zoom: 16,
      gestureHandling: "greedy",
    });
    this.marker = new window.google.maps.Marker({
      map: map,
      position: {lat:10.9743, lng:-74.8033},
      draggable:true,
      title:"Drag me!"
    });
    this.marker.addListener('drag', (e) => this.changeMarker(e, this.marker)); 
    const input = document.getElementById('place-address-input');
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    autocomplete.addListener('place_changed', () => {
      this.marker.setVisible(false);
      this.place = autocomplete.getPlace();
      if (!this.place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + this.place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (this.place.geometry.viewport) {
        map.fitBounds(this.place.geometry.viewport);
      } else {
        map.setCenter(this.place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      this.marker.setPosition(this.place.geometry.location);
      this.marker.setVisible(true);

      let address = '';
      if (this.place.address_components) {
        address = [
          (this.place.address_components[0] && this.place.address_components[0].short_name || ''),
          (this.place.address_components[1] && this.place.address_components[1].short_name || ''),
          (this.place.address_components[2] && this.place.address_components[2].short_name || '')
        ].join(' ');
      }
      const infowindow = new window.google.maps.InfoWindow();
      infowindow.setContent('Arrastame donde esté tu local');
      infowindow.open(map, this.marker);
      //console.log(this.place);
      //this.setState({address: this.place.name})
    });
    
  }
  
  changeMarker(e, marker) {
    console.log('lat', marker.position.lat());
    console.log('lng', marker.position.lng());
  }
  
  addNewPlace(event){
    event.preventDefault();
    const place = {
      name:this.state.displayName,
      description: this.state.description,
      address: this.state.address,
      photo_url:"https://i.ytimg.com/vi/83ACzjAY_8k/maxresdefault.jpg",
	    latitude:this.marker.position.lat(),
	    longitude:this.marker.position.lng(),
	    uid:this.props.user.uid,
      user_id:9
    };
    if(this.photo){
       placeService.uploadImage(this.props.user.uid, this.photo).then(response => {
         place.photo_url = response;
         placeService.postPlace(place).then(response => {
            console.log('places',response);
            this.props.history.push('/');
          }).catch(error => console.error(error));
      }).catch(error => console.error(error));
    } else {
      placeService.postPlace(place).then(response => {
            console.log('places',response);
            this.props.history.push('/');
      }).catch(error => console.error(error));
    }
  }
  
  savePhotoInCache(file) {
    this.photo = file;
    const image = document.getElementById('preview-image');
    let reader  = new FileReader();
    reader.onload =  () => {
      image.style.display = 'block';
      image.src = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    } else {
      image.src = "";
    }
  }

  uploadPhoto(){
    const fileInput = document.getElementById('file-newplace');
    fileInput.click();
    fileInput.addEventListener('change', (e) => this.savePhotoInCache(e.target.files[0]));
  }
  
  handleChange(name, value){
    this.setState({[name]:value});
  }
  
  render(place){
    return (
       <div className="center-card">
        <div className="card">  
          <CardHeaderTittle />
          <form onSubmit={this.addNewPlace} id="form-newplace">
            <p>Cuentanos sobre tu local</p>
            <Input
              id="place-name-input"
              name="displayName"
              placeholder="Ingresa el nombre del local"
              className="input-width padding20"
              type="text"
              minlength="6"
              required={true}
              onChange={this.handleChange}
            />
            <Input
              id="place-description-input"
              name="description"
              placeholder="Ingresa una descripción breve"
              className="input-width padding20"
              type="text"
              minlength="6"
              required={true}
              onChange={this.handleChange}
            />
            <Input
              id="place-number-input"
              name="number"
              placeholder="Ingresa el numero de atención"
              className="input-width padding20"
              type="number"
              required={true}
              minlength="6"
              onChange={this.handleChange}
            />
            <p>¿Donde te podemos encontrar?</p>
            <p><small className="gray">Si tu lugar aparece en google buscalo por nombre, sino ingresa su dirección</small></p>
            <Input
              id="place-address-input"
              name="address"
              placeholder="Ingresa la dirección sin el numero de la casa(Ej: Cra 41 # 74)"
              className="input-width padding20"
              type="text"
              required={true}
              minlength="6"
              onChange={this.handleChange}
            />
            <input type="file" className="nodisplay" id="file-newplace"></input>
            
            <p>Coloca el punto rojo donde esta ubicado tu establecimiento</p>
            <div id="map-picker"></div>
            <div id="infowindow-content">
              <img src="" width="16" height="16" id="place-icon"/>
              <span id="place-name"  className="title"></span>
              <span id="place-address"></span>
            </div>
            <img src="" className="nodisplay" height="200" alt="Image preview..." id="preview-image"/>
            <button type="button" className="center-button raised" onClick={this.uploadPhoto}>SUBIR FOTO</button>
            <button type="submit" className="center-button">AÑADIR LOCAL</button>
          </form>
        </div>
       </div>);
  }
}

PlacePost.propTypes = {
  user: PropTypes.object,
};
      
PlacePost.defaultProps = {
  user: {},
};
      
export default withRouter(PlacePost);
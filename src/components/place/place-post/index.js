import React, {Component} from 'react';
import {render} from 'react-dom';
import { Input } from '../../ui/input';
import PropTypes from 'prop-types';
import { CardHeaderTittle } from '../../ui/cards-icon';
import { placeService } from '../../../services/place';


class PlacePost extends Component {
  constructor(props){
    super(props);
    this.addNewPlace = this.addNewPlace.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.savePhotoInCache = this.savePhotoInCache.bind(this);
    this.photo = null;
  }
  
  addNewPlace(event){
    event.preventDefault();
    const place = {
      name:this.state.displayName,
      description: this.state.description,
      address: this.state.address,
      photo_url:"https://i.ytimg.com/vi/83ACzjAY_8k/maxresdefault.jpg",
	    latitude:10.9742,
	    longitude:-74.8032,
	    uid:this.props.user.uid,
      user_id:7
    };
    if(this.photo){
       placeService.uploadImage().then(response => {
         place.photo = response;
         placeService.postPlace(place).then(response => {
            console.log('places',response);
          }).catch(error => console.error(error));
      }).catch(error => console.error(error));
    } else {
      placeService.postPlace(place).then(response => {
            console.log('places',response);
      }).catch(error => console.error(error));
    }
  }
  
  savePhotoInCache(file) {
    this.photo = file;
  }

  uploadPhoto(){
    const fileInput = document.getElementById('add-photo');
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
              id="place-display-name"
              name="displayName"
              placeholder="Ingresa el nombre del local"
              className="input-width padding20"
              type="text"
              minlength="6"
              required={true}
              onChange={this.handleChange}
            />
            <Input
              id="place-description"
              name="description"
              placeholder="Ingresa una descripción breve"
              className="input-width padding20"
              type="text"
              minlength="6"
              required={true}
              onChange={this.handleChange}
            />
            <p>¿Donde te podemos encontrar?</p>
            <Input
              id="place-address"
              name="address"
              placeholder="Ingresa la dirección exacta"
              className="input-width padding20"
              type="text"
              required={true}
              minlength="6"
              onChange={this.handleChange}
            />
            <input type="file" className="nodisplay" id="file-newplace"></input>
            <Input
              id="place-number"
              name="number"
              placeholder="Ingresa el numero de atención"
              className="input-width padding20"
              type="number"
              required={true}
              minlength="6"
              onChange={this.handleChange}
            />
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

export {PlacePost};
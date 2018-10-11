import React, { Component } from 'react';
import { render } from 'react-dom';
import { ListPlaces } from '../../components/home/list-places';

import './style.scss';

let map;
let infowindow = new window.google.maps.InfoWindow();

class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {position : {lat:10.974288, lng:-74.802741}, results: []};
    this.askForGPS = this.askForGPS.bind(this);
    this.addPlaces = this.addPlaces.bind(this);
    this.createMarker = this.createMarker.bind(this);
  }
  
  componentDidMount(){
    //this.askForGPS();
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.position,
      zoom: 15
    });
    const placeService = new window.google.maps.places.PlacesService(map);
    
    placeService.nearbySearch(
      {
      location: this.state.position,
      radius: '500',
      type: ['hair_care']
      }, this.addPlaces); 
  }
  
  addPlaces(results, status){
    this.setState(() => {return {results:results}});
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }
  
  createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new window.google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    window.google.maps.event.addListener(marker, 'click', ()=> {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
  
  
  askForGPS(){
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => this.setState({ position: {lat:position.coords.latitude, lng: position.coords.longitude}}));
    } else { 
        console.error("Geolocation is not supported by this browser.");
    }
  }
  
  render(){
    return (
      <div className="google-maps" id="google-maps">
        <div id="map"></div>
        <ListPlaces list={this.state}/>
        <button className="" type="button" onClick={this.askForGPS}>Geolocation</button>
      </div>
   );
  }
}
      
export {Posts};
      
      
      



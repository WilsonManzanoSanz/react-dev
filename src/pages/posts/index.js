import React, { Component } from 'react';
import { render } from 'react-dom';
import { ListPlaces } from '../../components/home/list-places';
import { PlaceMarker } from '../../components/home/place-marker';
import { Input } from '../../components/ui/input';

import './style.scss';

let map;
let infowindow;

class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {position : {lat:10.974288, lng:-74.802741}, results: [], marker:null};
    this.askForGPS = this.askForGPS.bind(this);
    this.addPlaces = this.addPlaces.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount(){
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.position,
      zoom: 15
    });
    
    // infowindow = new window.google.maps.InfoWindow();
    const placeService = new window.google.maps.places.PlacesService(map);
    
    placeService.nearbySearch(
      {
      location: this.state.position,
      radius: '500',
      type: ['hospital']
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
    window.google.maps.event.addListener(marker, 'click', (e)=> {
        /*infowindow = new window.google.maps.InfoWindow();
        infowindow.setPosition(e.latLng);
        infowindow.setContent(place.name);
        infowindow.open(map);*/
        console.log('hospital', e);
        this.showDetails(e);
      });
  }
  
  askForGPS(){
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => this.setState({ position: {lat:position.coords.latitude, lng: position.coords.longitude}}));
    } else { 
        console.error("Geolocation is not supported by this browser.");
    }
  }
  
  handleChange(name, value){
    this.setState({[name]:value})
  }
  
  
  showDetails(){
    
    //this.setState({slideInfo:true});
  }
  
  render(){
    return (
      <div className="google-maps" id="google-maps">
        { this.state.marker && <PlaceMarker place={this.state.marker}/>}
        <div id="map"></div>
        <div className="padding20">
         <ListPlaces list={this.state.results}/>
        </div>
      </div>
   );
  }
}
      
export {Posts};
      
      
      



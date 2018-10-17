import React, { Component } from 'react';
import { render } from 'react-dom';
import { PlaceCard } from '../../components/home/place-card';
import { PlaceMarker } from '../../components/home/place-marker';
import { Input } from '../../components/ui/input';

import './style.scss';

let map;
let infowindow;

class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {position : {lat:10.974288, lng:-74.802741}, results: [], place:null};
    this.askForGPS = this.askForGPS.bind(this);
    this.addPlaces = this.addPlaces.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hideDetials = this.hideDetials.bind(this);
  }
  
  componentDidMount(){
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.position,
      zoom: 15
    });
    
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
      for (let i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }
  
  createMarker(place) {
    const placeLoc = place.geometry.location;
    const marker = new window.google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    window.google.maps.event.addListener(marker, 'click', (e)=> {
        this.showDetails(place, e);
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
  
  
  showDetails(place, event){
    this.setState({place:place});
  }
  
  hideDetials(){
    console.log('hide');
    this.setState({place:null});
  }
  
  render(){
    const listPlaces = this.state.results.map((value) => {
      return (<PlaceCard key={value.name} place={value} />);
    });
    return (
      <div className="google-maps" id="google-maps">
        { this.state.place && <PlaceCard id="map-marker" place={this.state.place} delete={true} closeItself={this.hideDetials}/>}
        <div id="map"></div>
        <div className="padding20">
         { listPlaces }
        </div>
      </div>
   );
  }
}
      
export {Posts};
      
      
      



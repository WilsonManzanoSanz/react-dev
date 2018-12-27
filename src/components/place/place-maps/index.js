import React, {Component} from 'react';
import {render} from 'react-dom';

let map = null;

class PlaceMaps extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    map = new window.google.maps.Map(document.getElementById('map-detail'), {
      center: this.props.position,
      zoom: 15
    });
    const marker = new window.google.maps.Marker({
      map: map,
      position: this.props.position
    });
  }
  
  render(){
    return (<div id="map-detail"></div>);
  }
}

export default PlaceMaps;
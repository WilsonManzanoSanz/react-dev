import React, { Component } from 'react';
import { render } from 'react-dom';
import { Avatar } from '../../../components/auth/avatar';
import PlaceDetailedCard from '../../../components/place/place-detailed-card';
import { placeService } from '../../../services/place';

import './style.scss';

class Place extends Component {
  constructor(props){
    super(props);
    this.state = {place:{workers:[], schedule:[], position:{}}};
  }
  
  componentDidMount(){
    if( this.props.location.state && (this.props.location.state.place.id == this.props.match.params.place)){
      this.setState({place:this.props.location.state.place}); 
    }else {
      placeService.getPlace(this.props.match.params.place).then(response => {
        console.log('places', response);
        let gottenPlace = response.data;
        gottenPlace.position = { lat: response.data.latitude, lng: response.data.longitude};
        this.setState({place:gottenPlace});
      }).catch(error => console.error(error));
    }
  }
  
  render(){
    return (
      <div className="center-card">
        <PlaceDetailedCard key={this.state.place.id} place={this.state.place} expandCard={true} history={this.props.history} match={this.props.match} location={this.props.location}/>
      </div>
     );
  }
}
  

export {Place};
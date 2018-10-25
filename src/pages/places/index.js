import React, { Component } from 'react';
import { render } from 'react-dom';
import { Avatar } from '../../components/auth/avatar';
import PlaceDetailedCard from '../../components/place/place-detailed-card';

import './style.scss';

class Place extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }
  
  render(){
    return (
      <div className="center-card">
        <PlaceDetailedCard key={this.props.location.state.place.name} place={this.props.location.state.place} expandCard={true} />
      </div>
     );
  }
}
  

export {Place};

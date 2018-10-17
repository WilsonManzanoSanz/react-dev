import React, {Component} from 'react';
import {render} from 'react-dom';
import { PlaceCard } from '../place-card';

class PlaceMarker extends Component {
  constructor(props){
    super(props);
  }
  
  render(place){
    console.log(this.props);
    return (<div className="card">
              <div>
                {this.props.place.name}
              </div>
              <div>
                {this.props.place.vicinity}
              </div>
           </div>);
  }
}

export {PlaceMarker};
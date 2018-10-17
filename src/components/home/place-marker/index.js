import React, {Component} from 'react';
import {render} from 'react-dom';

class PlaceMarker extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (<div className="card">
            <div>
              {this.props.place.name}
            </div>
            <div>
              {this.props.place.name}
            </div>
           </div>);
  }
}

export {PlaceMarker};
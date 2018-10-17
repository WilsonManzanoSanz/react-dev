import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {Avatar} from '../../auth/avatar';

class ListPlaces extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: props.list
    };
  }
  
  render(){
    const places = this.props.list.map((value) => {
      return (
        <div className="card" key={value.name}>
          <div className="flex-header">
           { value.photos ? ( <Avatar url={value.photos[0].getUrl()}/>) : <Avatar url={value.icon}/>}
            <div className="card-header-user">
              <p className="nospace">{value.name}</p>
              <p className="nospace subtittle">{value.vicinity}</p>
            </div>
          </div>
        </div>
        );
    });
    return (
      <div>
        {places}
      </div>
    );
  }
}

export {ListPlaces};
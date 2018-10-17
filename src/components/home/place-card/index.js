import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {Avatar} from '../../auth/avatar';

import './style.scss';

class PlaceCard extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div id={this.props.id} className={this.props.className}>
       { this.props.delete && <div className="top-right" onClick={()=> console.log(this.props.closeItself())}> x </div>}
        <div className="flex-header">
         { this.props.place.photos ? ( <Avatar url={this.props.place.photos[0].getUrl()}/>) : <Avatar url={this.props.place.icon}/>}
          <div className="card-header-user">
            <p className="nospace">{this.props.place.name}</p>
            <p className="nospace subtittle">{this.props.place.vicinity}</p>
          </div>
        </div>
      </div>
      );
  }
}

PlaceCard.propTypes = {
  place: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string,
  delete: PropTypes.bool,
  closeItself: PropTypes.func,
};

PlaceCard.defaultProps = {
  className: 'card',
  delete: false,
  closeItself: () => 0,
};

export {PlaceCard};
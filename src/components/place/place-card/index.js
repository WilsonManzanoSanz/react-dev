import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {Avatar} from '../../auth/avatar';
import { withRouter } from "react-router-dom";

import './style.scss';

class PlaceCard extends Component {
  constructor(props){
    super(props);
    this.goToProps = this.goToProps.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }
  
  goToProps(){
    //const photo = (this.props.place.photos) ? (this.props.place.photos[0].getUrl()) : (this.props.place.icon);
    this.props.history.push({pathname:`/place/${this.props.place.id}`, 
                             state:{place:{
                               id:this.props.place.id, 
                               name:this.props.place.name,
                               opening_hours: this.props.place.opening_hours,
                               rating:this.props.place.rating,
                               address:this.props.place.address,
                               photo_url:this.props.place.photo_url,
                               schedule:this.props.place.schedule,
                               workers:this.props.place.workers,
                             }}}); 
  }
  
  closeWindow(e){
    e.stopPropagation(); 
    this.props.closeItself();
  }
  
  render(){
    return (
      <div id={this.props.id} className={this.props.className} onClick={this.goToProps}>
       { this.props.delete && <div className="top-right" onClick={(e) => this.closeWindow(e)}> x </div>}
        <div className="flex-header pointer">
         <Avatar url={this.props.place.photo_url}/>
          <div className="card-header-user">
            <p className="nospace">{this.props.place.name}</p>
            <p className="nospace subtittle">{this.props.place.address}</p>
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

export default withRouter(PlaceCard);
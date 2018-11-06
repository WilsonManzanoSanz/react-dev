import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {Avatar} from '../../auth/avatar';
import { withRouter } from "react-router-dom";

import './style.scss';
let map;

class PlaceDetailedCard extends Component {
  constructor(props){
    super(props);
    this.goToProps = this.goToProps.bind(this);
    this.goToStaffs = this.goToStaffs.bind(this);
  }
  
  componentDidMount(){
    if(this.props.expandCard){
      map = new window.google.maps.Map(document.getElementById('map-detail'), {
        center: this.props.place.position,
        zoom: 15
      });
      const marker = new window.google.maps.Marker({
        map: map,
        position: this.props.place.position
      });
    }
  }
  
  goToStaffs(e){
     e.stopPropagation(); 
     this.props.history.push({pathname:`/staffs/${this.props.place.id}`, 
                             state:{id:this.props.place.id}});
  }
  
  goToProps(){
    const photo = (this.props.place.photos) ? (this.props.place.photos[0].getUrl()) : (this.props.place.icon);
    window.scrollTo(0, 0);
    this.props.history.push({pathname:`/place/${this.props.place.id}`, 
                             state:{place:{
                               id:this.props.place.id, 
                               name:this.props.place.name,
                               opening_hours: this.props.place.opening_hours,
                               rating:this.props.place.rating,
                               vicinity:this.props.place.vicinity,
                               photo:photo,
                               position:this.props.place.position,
                             }}}); 
  }
  
  render(){
    return (
      <div id={this.props.id} className={this.props.className} onClick={this.goToProps}>
        {this.props.expandCard ? (<h1 className="nospace">{this.props.place.name}</h1>) : (<h2 className="nospace">{this.props.place.name}</h2>)}
        <h4 className="nospace gray">{this.props.place.vicinity}</h4>
        { this.props.place.photos ? ( <img className="image-card" src={this.props.place.photos[0].getUrl()}/>) : <img  className="image-card" src={this.props.place.photo}/>}
        <hr/>
        <h3 className="margin10">Services</h3> 
         { this.props.expandCard &&  
         <div> 
           <img className="half-image" src="https://www.elheraldo.co/sites/default/files/styles/width_860/public/articulo/2015/05/04/chuzo_desgranado_natalli_8.jpg?itok=IJvku1cn" alt="photico"/>
           <img className="half-image" src="https://www.mycolombianrecipes.com/wp-content/uploads/2014/02/mazorca-desgranada-colombiana.jpg" alt="photico"/>
           <div className="flex-header padding10">
             <span className="nospace">Una salchipapaso </span>
             <span className="gray sub-span"> 30K</span>
             <span className="spacer"></span>
             <button className="raised">PEDIR</button>
          </div>
          <div className="flex-header padding10">
             <span className="nospace">Una hamburguesaria </span>
             <span className="gray sub-span"> 10K</span>
             <span className="spacer"></span>
             <button className="raised">PEDIR</button>
          </div>
        </div>
        }
        <div className="flex-header padding10">
           <span className="nospace">Un perrario </span>
           <span className="gray sub-span"> 50K</span>
           <span className="spacer"></span>
           <button className="raised">PEDIR</button>
        </div>
        <div className="flex-header padding10">
           <span className="nospace">Un pataconario </span>
           <span className="gray sub-span"> 20K</span>
           <span className="spacer"></span>
           <button className="raised">PEDIR</button>
        </div>
        { this.props.expandCard &&
          <div>
            <button  className="center-button schedule-button" type="button" onClick={(e) => this.goToStaffs(e)}>
              SCHEDULE 
            </button>
            <h3>Hours</h3>
            <p>Monday 7am - 5pm </p>
            <p>Tuesday 7am - 5pm </p>
            <p>Wednesday 7am - 5pm </p>
            <p>Thursday 7am - 5pm </p>
            <p>Friday 7am - 5pm </p>
            <p>Saturday 7am - 5pm </p>
            <p>Sunday 7am - 5pm </p> 
            <div>
            <h2>Location</h2>
              <div id="map-detail"></div>
            </div>
          </div>
        }
      </div>
      );
  }
}

PlaceDetailedCard.propTypes = {
  place: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string,
  expandCard: PropTypes.bool,
};

PlaceDetailedCard.defaultProps = {
  className: 'card',
  delete: false,
  closeItself: () => 0,
  expandCard: false,
};

export default withRouter(PlaceDetailedCard);
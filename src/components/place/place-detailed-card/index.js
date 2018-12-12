import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
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
     this.props.history.push({pathname:`/place/staffs/${this.props.place.id}`, 
                             state:{id:this.props.place.id, workers:this.props.place.workers}});
  }
  
  goToProps(e, path){
    console.log(this.props.place);
     e.stopPropagation(); 
    //const photo = (this.props.place.photos) ? (this.props.place.photos[0].getUrl()) : (this.props.place.icon);
    if(this.props.location.pathname === '/' || this.props.location.pathname === 'auth/profile'){
      window.scrollTo(0, 0);
    }
      this.props.history.push(
        {pathname:path, 
          state:{
          place:{
          id:this.props.place.id, 
          name:this.props.place.name,
          description:this.props.place.description,
          opening_hours: this.props.place.opening_hours,
          rating:this.props.place.rating,
          address:this.props.place.address,
          photo_url:this.props.place.photo_url,
          position:this.props.place.position,
          schedule:this.props.place.schedule,
          workers:this.props.place.workers,
          }}}); 
  }
  
  render(){
    let hoursSchedule = null;
    if(this.props.place.schedule){
       hoursSchedule = this.props.place.schedule.map((value, idx) => <p key={idx}>{value.day.toUpperCase()} {value.start_hour} - {value.end_hour} </p>);
    }
   //console.log(this.props.place);
    return (
      <div id={this.props.id} className={this.props.className} onClick={(e) => this.goToProps(e, `/place/${this.props.place.id}`)}>
        {this.props.expandCard ? (<h1 className="nospace">{this.props.place.name}</h1>) : (<h2 className="nospace">{this.props.place.name}</h2>)}
        <h4 className="nospace gray">{this.props.place.address}</h4>
        <img  className="image-card" src={this.props.place.photo_url}/>
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
          {!this.props.editMode ? (<button  className="center-button schedule-button" type="button" onClick={(e) => this.goToStaffs(e)}>
              SCHEDULE 
            </button>) : (<button  className="center-button edit-button" type="button" onClick={(e) => this.goToProps(e, '/newplace')}>
              EDIT 
            </button>)
            }
            <h3>Hours</h3>
            {hoursSchedule}
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
  id: PropTypes.number,
  className: PropTypes.string,
  expandCard: PropTypes.bool,
  editMode: PropTypes.bool,
};

PlaceDetailedCard.defaultProps = {
  className: 'card',
  delete: false,
  closeItself: () => 0,
  expandCard: false,
  editMode: false,
  place: {schedule:[], workers:[], position:{lat:10.9846052, lng:-74.8057843}},
};

export default withRouter(PlaceDetailedCard);
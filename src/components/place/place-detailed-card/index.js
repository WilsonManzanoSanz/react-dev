import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import PlaceCardServices from '../place-services';
import PlaceMaps from '../place-maps';
import './style.scss';
let map;

class PlaceDetailedCard extends Component {
  constructor(props){
    super(props);
    this.goToProps = this.goToProps.bind(this);
    this.goToStaffs = this.goToStaffs.bind(this);
  }
  
  componentDidMount(){
  }
  
  goToStaffs(e){
     e.stopPropagation(); 
     this.props.history.push({pathname:`/place/staffs/${this.props.place.id}`, 
                             state:{id:this.props.place.id, workers:this.props.place.workers}});
  }
  
  goToProps(e, path){
     e.stopPropagation(); 
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
          schedules:this.props.place.schedules,
          workers:this.props.place.workers,
          }}}); 
  }
  
  render(){
    let hoursSchedule = null;
    if(this.props.place.schedules){
       hoursSchedule = this.props.place.schedules.map((value, idx) => <p key={idx}>{value.day} {value.start_hour} - {value.end_hour} </p>);
    }
    return (
      <div id={this.props.id} className={this.props.className} onClick={(e) => this.goToProps(e, `/place/${this.props.place.id}`)}>
        {this.props.expandCard ? (<h1 className="nospace">{this.props.place.name}</h1>) : (<h2 className="nospace">{this.props.place.name}</h2>)}
        <h4 className="nospace gray">{this.props.place.address}</h4>
        <img  className="image-card" src={this.props.place.photo_url}/>
         { this.props.expandCard &&  
          <div>
          <hr/>
          <h3 className="margin10">Services</h3> 
          <PlaceCardServices />
          </div>
         }
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
            <PlaceMaps position={this.props.place.position}/>
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
  history:PropTypes.object,
  match:PropTypes.object,
  location:PropTypes.object,
};

PlaceDetailedCard.defaultProps = {
  className: 'card',
  delete: false,
  closeItself: () => 0,
  expandCard: false,
  editMode: false,
  place: {schedule:[], workers:[], position:{lat:10.9846052, lng:-74.8057843}},
};

export default PlaceDetailedCard;
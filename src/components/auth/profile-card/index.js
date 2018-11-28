import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {UserHeader} from '../user-header';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Input } from '../../ui/input';
import PlaceDetailedCard from '../../place/place-detailed-card';

import './style.scss';
let map;

class ProfileCard extends Component {
  constructor(props){
    super(props);
    this.goToAddNewPlace = this.goToAddNewPlace.bind(this);
    this.state = {person:null, people: []};
    this.status = false;
    this.previousValue = null;
  }
  
  componentDidMount(){
    const mapElement = document.getElementById('map-detail-user');
    if(mapElement){
      map = new window.google.maps.Map(mapElement, {
        center: {lat:10.974288, lng:-74.802741},
        zoom: 15
      });
      const marker = new window.google.maps.Marker({
        map: map,
        position: {lat:10.974288, lng:-74.802741}
      });
    }
  }
  
  goToAddNewPlace(){
    this.props.history.push('/newplace');
  }
  
  
  render(){
    const people = this.state.people.map(value => <div className="padding10 card"><p className="nospace">{value.name}</p><p className="gray nospace">{value.email}</p></div>)
    return (
    <div className="center-card" id="profile-card">
      <div className="card">
        <UserHeader user={this.props.user}/>
        <img className="image-card" src={this.props.user.photoURL} alt="avatar"/>
        { this.props.user.role_vp === "customer" &&  
      <div>
        <h4>Appointments</h4>
        <p>You have an appointment on Bother Fast Food on Monday at 5pm - 5:30pm </p>
        <div id="map-detail-user"></div>
        <button className=" center-button" type="button" id="button-newplace" onClick={this.goToAddNewPlace}>ADD NEW PLACE</button>
        </div>
        }
        { this.props.user.establishment &&  
          <div>
            You have an establishment 
            <PlaceDetailedCard place={this.props.user.establishment} editMode={true} id={this.props.user.establishment.id} className="card" expandCard={true}/>                            
          </div>
        }
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  return { todos: state.user };
};
                                         
ProfileCard.propTypes = {
  user: PropTypes.object,
};
      
ProfileCard.defaultProps = {
  user: {},
};  
      
export default withRouter(connect(mapStateToProps)(ProfileCard));
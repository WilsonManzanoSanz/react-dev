import React, { Component } from 'react';
import { render } from 'react-dom';
import { SHOW_ONE  } from "./../../../redux/constants/constant";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {UserHeader} from '../user-header';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Input } from '../../ui/input';
import {auth} from '../../../services/auth';
import PlaceDetailedCard from '../../place/place-detailed-card';

import './style.scss';
let map;

class ProfileCard extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
  
  handleChange(name, value){
    if(this.status === false && value != this.state[name]){
      this.status = true;
      setTimeout(() => {
          this.status = false;
          auth.getAllTheUsers(value).then(response => this.setState({people:response.data}))
          .catch(error => console.error(error));
      }, 300);
    }
    setTimeout((value) => {
          if(value == this.state[name]){
            auth.getAllTheUsers(value).then(response => this.setState({people:response.data}))
            .catch(error => console.error(error));
          }
      }, 300, value);
    this.setState({[name]:value});
  }
  
  render(){
    const people = this.state.people.map(value => <div className="padding10 card"><p className="nospace">{value.name}</p><p className="gray nospace">{value.email}</p></div>)
    return (
    <div className="center-card" id="profile-card">
      <div className="card">
        <UserHeader user={this.props.user}/>
        <img className="image-card" src={this.props.user.photoURL}/>
        { this.props.user.role_vp === "customer" &&  
        <div>
       <h4 className="">Appointments</h4>
        <p className="">You have an appointment on Bother Fast Food on Monday at 5pm - 5:30pm </p>
        <div id="map-detail-user"></div>
        <button className=" center-button" type="button" id="button-newplace" onClick={this.goToAddNewPlace}>ADD NEW PLACE</button>
        </div>
        }
        { this.props.user.establishment &&  
          <div>
            You have an establishment 
            <PlaceDetailedCard place={this.props.user.establishment} editMode="true" id={this.props.user.establishment.id} className="card" expandCard="true"/>                            
            <p>Añade a una persona</p>
            <Input
              id="search-person-input"
              name="person"
              placeholder="Ingresa el nombre de la persona"
              className="input-width padding20"
              type="text"
              required={true}
              minlength="6"
              onChange={this.handleChange}
            />
          {people}
          </div>
        }
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  return { todos: state.user };
};


export default withRouter(connect(mapStateToProps)(ProfileCard));
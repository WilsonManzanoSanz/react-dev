import React, { Component } from 'react';
import { render } from 'react-dom';
import { SHOW_ONE  } from "./../../../redux/constants/constant";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {UserHeader} from '../user-header';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import './style.scss';
let map;

class ProfileCard extends Component {
  constructor(props){
    super(props);

    this.goToAddNewPlace = this.goToAddNewPlace.bind(this);
  }
  
  componentDidMount(){
    map = new window.google.maps.Map(document.getElementById('map-detail-user'), {
      center: {lat:10.974288, lng:-74.802741},
      zoom: 15
    });
    const marker = new window.google.maps.Marker({
      map: map,
      position: {lat:10.974288, lng:-74.802741}
    });
  }
  
  goToAddNewPlace(){
    this.props.history.push('/newplace');
  }
  
  render(){
    return (
    <div className="center-card" id="profile-card">
      <div className="card">
        <UserHeader user={this.props.user}/>
        <img className="image-card" src={this.props.user.photoURL}/>
        <h4 className="">Appointments</h4>
        <p className="">You have an appointment on Bother Fast Food on Monday at 5pm - 5:30pm</p>
        <div id="map-detail-user"></div>
        <button className=" center-button" type="button" id="button-newplace" onClick={this.goToAddNewPlace}>ADD NEW PLACE</button>
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  return { todos: state.user };
};


export default withRouter(connect(mapStateToProps)(ProfileCard));
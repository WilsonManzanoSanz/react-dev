import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from "react-redux";
import ProfileCard from '/components/auth/profile-card';
import {auth}  from '/services/auth';

class Profile extends Component {
  constructor(props){
    this.state = {user:{displayName:''}};
    auth.getCurrentUser().then(user=>{
      if(user){
        this.setState({user:user}); 
      }
    }).catch(error=>console.error(error));
    this.signOut = this.signOut.bind(this);
  }

  signOut(){
    auth.signOut().then( success => this.setState({user:{}})).catch( error => console.error(error));
  }

  componentDidMount(){
  }
  
  render(){
    return (
    <div>
      <ProfileCard user={this.props.user}/>
    </div>);
  }
}

const mapStateToProps = state => {
  return { user: state.user };
}; 

export default connect(mapStateToProps)(Profile);
  

import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from "react-redux";
import {auth}  from '.././../../services/auth';
import PlacePost from '../../../components/place/place-post';

class PostPlace extends Component {
  constructor(props){
    super(props);
    //this.state = {user:{displayName:''}};
    /*auth.getCurrentUser().then(user=>{
      if(user){
        this.setState({user:user}); 
      }
    }).catch(error=>console.error(error));
    */
  }

  componentDidMount(){
  }
  
  render(){
    let place =  (this.props.location.state) ? this.props.location.state.place : {};
    return (
      <div>
        <PlacePost user={this.props.user} place={place}/>
      </div>);
  }
}

const mapStateToProps = state => {
  return { user: state.user };
}; 

export default connect(mapStateToProps)(PostPlace);
  

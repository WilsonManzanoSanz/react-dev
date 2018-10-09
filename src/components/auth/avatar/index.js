import React, { Component } from 'react';
import { render } from 'react-dom';

class Avatar extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(
       <img src={this.props.user.photoURL} className="avatar"/> 
    );
  }
}

export { Avatar };
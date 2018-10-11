import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

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

Avatar.propTypes = {
  user: PropTypes.object
};

export { Avatar };
import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import './style.scss';

class UserAvatarInfo extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (
    <div className="card-header-user">
      <p className="nospace">{this.props.user.displayName}</p>
      <p className="nospace subtittle">{this.props.user.email}</p>
    </div>);
  }
}


export {UserAvatarInfo};
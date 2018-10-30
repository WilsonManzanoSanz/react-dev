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
      <h3 className="nospace">{this.props.user.displayName}</h3>
      <h4 className="nospace subtittle">{this.props.user.email}</h4>
    </div>);
  }
}

UserAvatarInfo.propTypes = {
  user: PropTypes.object
};

export {UserAvatarInfo};
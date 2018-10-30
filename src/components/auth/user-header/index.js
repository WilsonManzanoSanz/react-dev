import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {Avatar} from '../avatar';
import {UserAvatarInfo} from '../user-avatar-info';

class UserHeader extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="flex-header">
        <Avatar url={this.props.user.photoURL}/>
        <UserAvatarInfo user={this.props.user}/>
      </div>
    );
  }
}

UserHeader.propTypes = {
  user: PropTypes.object
};

export {UserHeader};
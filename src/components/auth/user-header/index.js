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
        <Avatar url={Boolean(this.props.user.photoURL) ? this.props.user.photoURL : this.props.user.photo_url}/>
        <UserAvatarInfo user={this.props.user}/>
        <span className="spacer"></span>
        { this.props.deleteOption && <i className="material-icons red pointer" onClick={this.props.removeWorker}>delete</i> }
      </div>
    );
  }
}

UserHeader.propTypes = {
  user: PropTypes.object,
  deleteOption: PropTypes.bool,
  removeWorker: PropTypes.func,
};

UserHeader.defaultProps = {
  user: {},
  deleteOption: false,
  removeWorker: () => console.log('delete')
}; 

export {UserHeader};
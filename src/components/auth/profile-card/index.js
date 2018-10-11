import React, { Component } from 'react';
import { render } from 'react-dom';
import { SHOW_ONE  } from "./../../../redux/constants/constant";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {UserAvatarInfo} from '../user-avatar-info';
import {Avatar} from '../avatar';
import PropTypes from 'prop-types';


class ProfileCard extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (
    <div className="center-card">
      <div className="card">
        <div className="flex-header">
          <Avatar user={this.props.user}/>
          <UserAvatarInfo user={this.props.user}/>
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  return { todos: state.user };
};


export default connect(mapStateToProps)(ProfileCard);
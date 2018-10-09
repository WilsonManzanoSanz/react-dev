import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  showUser,
} from "./../../../redux/actions/actions";
import { SHOW_ONE  } from "./../../../redux/constants/constant";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {Avatar} from '../avatar';

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
          <div>
            <p className="nospace">{this.props.user.displayName}</p>
            <p className="nospace">{this.props.user.email}</p>
          </div>
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  return { todos: state.user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showUser,
    },
    dispatch
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
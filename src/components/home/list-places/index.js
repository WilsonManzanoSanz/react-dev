import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

class ListPlaces extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: props.list
    };
  }
  
  render(){
    //const places = this.props.list.map((value) => {
    console.log(this.props);
    return (<div>
            h
            </div>);
  }
}

export {ListPlaces};
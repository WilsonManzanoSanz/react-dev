import React, { Component } from 'react';
import { render } from 'react-dom';

class Input extends Component {
  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    event.target.classList.add('touched');
    this.setState({value: event.target.value});
    this.props.onChange(this.props.name , event.target.value, event.target);
  }
 
  render(){
    return (
    <input
      id={this.props.id}
      value={this.state.value}
      type={this.props.type}
      onChange={this.handleChange}
      minLength={this.props.minlength}
      maxLength={this.props.maxlength}
      required={this.props.required}
      className="input input-width"
      placeholder={this.props.placeholder}
    />);
  }
}
  

export {Input};

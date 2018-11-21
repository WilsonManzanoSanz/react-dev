import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

class Input extends Component {
  constructor(props){
    super(props);
    this.state = {value: this.props.value};
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
      
Input.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  type: 'text',
  required: false,
};

export {Input};

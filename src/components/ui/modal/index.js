import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: this.props.maxWidth,
      minHeight: this.props.minHeight,
      margin: '0 auto',
      padding: 30
    };
    
    const button = {
      backgroundColor: 'white',
      color:'white',
    };

    return ( 
      <div className = "backdrop" style = {backdropStyle}>
        <div className = "modal" style = { modalStyle}> 
          {this.props.children}
          <div className = "footer">
            <button className="center-button raised" onClick={this.props.onClose}> Close </button>
          </div> 
        </div> 
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  maxWidth: PropTypes.number,
  minHeight: PropTypes.number,
  children: PropTypes.node
};

Modal.defaultProps = {
  maxWidth: 500,
  minHeight: 300,
};

export default Modal;
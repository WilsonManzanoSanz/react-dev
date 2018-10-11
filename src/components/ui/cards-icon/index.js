import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

const CardHeaderTittle = ({tittle = "NetTeachers", icon = "https://firebasestorage.googleapis.com/v0/b/react-dev-ead30.appspot.com/o/icon.svg?alt=media&token=b2b12134-61f4-4890-a35c-de5578ceba14"}) => (
  <div>
    <h2 className="card-header">{tittle}</h2>
    <img src={icon} className="card-header-icon" alt="iconlogo" id="main-icon" />
  </div>
);

CardHeaderTittle.propTypes = {
  tittle: PropTypes.string,
  icon: PropTypes.string
};

export {CardHeaderTittle};
import React from 'react';
import { render } from 'react-dom';
import { Root } from './pages/root';
import { Provider } from 'react-redux'; 
import store from './redux/store'; 
// SCSS
import './assets/scss/style.scss';
import './assets/scss/material.scss';
import './assets/scss/colors.scss';

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);


render(<App />, document.getElementById('root'));

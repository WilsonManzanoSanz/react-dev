import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// Components
import {Header} from './../../components/ui/header';
import {Main} from '../routes';

// Material import
class Root extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return(
    <Router>
      <div>
        <Header/>
        <Main/>
      </div>
    </Router>
    );
  }
}

export { Root };


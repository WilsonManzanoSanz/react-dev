import React, { Component } from 'react';
import { render } from 'react-dom';
import {  Route } from 'react-router-dom';
// Pages
import About from '../about';
import {Home} from '../home';
import {Place} from '../places';
import Login from '../auth/login';
import {Register} from '../auth/register';
import Profile from '../auth/profile';
import {ForgotPassword} from '../auth/forgot-password';
import {UserProfiles} from '../auth/profiles';

class Main extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (
    <div className="main-container" id="main-container" ref="main-container">
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/place/:place" component={Place} />
      <Route exact path="/profiles/place/:place" component={UserProfiles} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/forgot-password" component={ForgotPassword} />
    </div>);
  }
}
  

export {Main};

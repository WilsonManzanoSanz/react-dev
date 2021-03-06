import React, { Component } from 'react';
import { render } from 'react-dom';
import {  Route, Switch } from 'react-router-dom';
// Pages
import About from '../about';
import {Places} from '../place/places';
import {Place} from '../place/place';
import PlaceWorkers from '../place/place-workers';
import PostPlace from '../place/post-place';
import {Schedules} from '../schedules';
import Login from '../auth/login';
import {Register} from '../auth/register';
import Profile from '../auth/profile';
import {ForgotPassword} from '../auth/forgot-password';
import {UserProfiles} from '../auth/profiles';
import {DefaultPage} from '../default-page';

class Main extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (
    <div className="main-container" id="main-container" ref="main-container">
      <Switch>
        <Route exact path="/" component={Places} />
        <Route path="/about" component={About} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/auth/profile" component={Profile} />
        <Route exact path="/auth/forgot-password" component={ForgotPassword} />
        <Route exact path="/place/:place" component={Place} />
        <Route exact path="/place/workers/:place" component={PlaceWorkers} />
        <Route exact path="/place/schedule/:id" component={Schedules} />
        <Route exact path="/place/staffs/:place" component={UserProfiles} />
        <Route path="/newplace/" component={PostPlace} />
        <Route component={DefaultPage} />
      </Switch> 
    </div>);
  }
}
  

export {Main};

import React, { Component } from 'react';
import { render } from 'react-dom';
import {ScheduleCalender} from './../../components/schedule/calendar';
import { placeService } from '../../services/place';
import HoursList from './../../components/schedule/hours-list';

class Schedules extends Component {
  constructor(props){
    super(props);
    this.state = {user : {}};
    this.changeDate = this.changeDate.bind(this);
  }
  
  componentDidMount(){
    //console.log(this.props.match.params.id);
    if(!this.props.location.state){
       placeService.getInfoFromRelation(this.props.match.params.id)
        .then(response => this.setState({user:response.data.user}))
        .catch(error => console.error(error));
    }
  }
  
  changeDate(value){
    this.setState({date:value});
  }
  
  render(){
    const user = (this.props.location.state) ? (this.props.location.state.profile) : (this.state.user);
    return (
    <div className="center-card">
      <div className="card">
        <ScheduleCalender user={user} changeDate={this.changeDate}/>
        <HoursList />
         <p className="demo-picked">
            Date picked:
            <span data-calendar-label="picked">{this.state.date}</span>
          </p>
          <button className="full-width-important center-button" type="button">RESERVE</button>
      </div>
    </div>); 
  }
}
            
export {Schedules};
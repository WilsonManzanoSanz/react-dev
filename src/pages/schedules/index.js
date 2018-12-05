import React, { Component } from 'react';
import { render } from 'react-dom';
import {ScheduleCalender} from './../../components/schedule/calendar';
import { placeService } from '../../services/place';

class Schedules extends Component {
  constructor(props){
    super(props);
    this.state = {user : {}};
  }
  
  componentDidMount(){
    //console.log(this.props.match.params.id);
    if(!this.props.location.state){
       placeService.getInfoFromRelation(this.props.match.params.id)
        .then(response => this.setState({user:response.data.user}))
        .catch(error => console.error(error));
    }
  }
  
  render(){
    const user = (this.props.location.state) ? (this.props.location.state.profile) : (this.state.user);
    return (
    <div className="center-card">
      <ScheduleCalender user={user}/>
    </div>); 
  }
}
            
export {Schedules};
import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {UserHeader} from './../../../components/auth/user-header';
import { placeService } from '../../../services/place';

class UserProfiles extends Component {
  constructor(props){
    super(props);
    this.state = {userCards:null};
    
    this.goToSchedule = this.goToSchedule.bind(this);
  }
  
  goToSchedule(value){
    this.props.history.push({pathname:`/place/schedule/${value.id}`, state:{
      profile:value
    }});
  }
  
  componentDidMount(){
    if( this.props.location.state && this.props.location.state.place){
      const workers = this.props.location.state.workers.map((value) => {
        return  <div className="card" onClick={() => {this.goToSchedule(value)}}><UserHeader user={value}/></div>
      });
      this.setState({userCards:workers}); 
    }else {
      placeService.getPlace(this.props.match.params.place).then(response => {
        const workers = response.data.workers.map((value) => {
          return  <div className="card" onClick={() => {this.goToSchedule(value)}} key={value.id}><UserHeader user={value}/></div>
        });
        this.setState({userCards:workers}); 
      }).catch(error => console.error(error));
    }
  }
  
  render(){
    return (
      <div>
        <h2 className="nomargin card">Choose an staff</h2>
        <div className="center-card">
            {this.state.userCards}
        </div>
      </div>
    );
  }
}

UserProfiles.propTypes = {
  user: PropTypes.object
};

export {UserProfiles};
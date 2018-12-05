import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { placeService } from '../../../services/place';
import {auth} from '../../../services/auth';
import {UserHeader} from '../../../components/auth/user-header';
import  Modal  from '../../../components/ui/modal';
import { Input } from '../../../components/ui/input';

class PlaceWorkers extends Component {
  constructor(props){
    super(props);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addRelation = this.addRelation.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.userID = null;
    this.idxElement = null;
    this.state = {place:{workers:[]}, person:null, people: [], isOpen:false, isOpen2:false,  exact:false};
  }
  
   toggleModal(e, target, userId , idx) {
    e.stopPropagation();
    this.userID = (userId) ? userId: null;
    this.idxElement = (idx) ? idx: null;
    if(target === 1){
      this.setState({
        isOpen: !this.state.isOpen
      });
    } else {
      this.setState({
        isOpen2: !this.state.isOpen2
      });
    }
  }
  
  addRelation() {
    placeService.relationPlace(this.userID, this.state.place.id).then(response => {
      console.log('newRelation',response);
      this.setState((prevState) => {
         return {isOpen: !prevState.isOpen, place : {...prevState.place, workers:[...prevState.place.workers, ...[response.data.user]]}};
      }, () => {
        let user = {user: this.props.user, establishment:this.state.place, establishment_schedule:this.state.place.schedule};
        user.user.role_vp = "admin";
        auth.saveUser(user);
      });
    }).catch(error => console.error(error));
  }
    
  componentDidMount(){
    if( this.props.match.params.place == this.props.user.establishment.id){
      this.setState({place:this.props.user.establishment, exact:true});
    }else {
      placeService.getPlace(this.props.match.params.place).then(response => {
        let gottenPlace = response.data;
        gottenPlace.position = { lat: response.data.latitude, lng: response.data.longitude};
        this.setState({place:gottenPlace});
      }).catch(error => console.error(error));
    }
    //console.log(this.props);
  }
  
  removeUser(){
    placeService.deleteRelation(this.userID, this.state.place.id).then(response => {
      console.log('deleteRelation',response);
      this.setState((prevState) => {
        return { isOpen2:!prevState.isOpen2, place : {...prevState.place, workers:[...prevState.place.workers.slice(0,this.idxElement), ...prevState.place.workers.slice(this.idxElement+1)]}};
        //place :{...prevState, ...{workers:[...prevState.workers.slice(0,idx), ......prevState.workers.slice(idx+1)]}}
      });
    }).catch(error => console.error(error));
  }
  
  handleChangeSearch(name, value){
    if(!this.status && value != this.state[name]){
      this.status = true;
      setTimeout(() => {
          this.status = false;
          auth.getAllTheUsers(value).then(response => this.setState({people:response.data}))
          .catch(error => console.error(error));
      }, 300);
    }
    setTimeout((value) => {
          if(value == this.state[name]){
            auth.getAllTheUsers(value).then(response => this.setState({people:response.data}))
            .catch(error => console.error(error));
          }
      }, 300, value);
    this.setState({[name]:value});
  }
  
  render(){
    let workers = (this.state.place.workers) ? this.state.place.workers.map((value, idx) => {
      return  (<div className="card" key={value.id} onClick={() => console.log(value)}>
                <UserHeader user={value} deleteOption={true} removeWorker={(e) => this.toggleModal(e, 2, value.id, idx)}/>
              </div>)
    }) : (null);
    const people = this.state.people.map(value => 
     (<div key={value.id} className="padding10 card" onClick={(e) => this.toggleModal(e, 1, value.id)}>
       <p className="nospace">{value.name}</p>
       <p className="gray nospace">{value.email}</p>
       </div>));
    return (
      <div>
        { this.state.place.workers &&  
         <div>
            <h2>Your workers</h2>                           
            {workers}
          </div> }
      { this.state.exact &&  
          <div>
            You want to add a new user?
            <Input
              id="search-person-input"
              name="person"
              placeholder="Ingresa el nombre de la persona"
              className="input-width padding20"
              type="text"
              required={true}
              minlength="6"
              onChange={this.handleChangeSearch}
            />
          {people}
          </div>
          }
        <Modal show={this.state.isOpen}
          onClose={(e) => this.toggleModal(e, 1)} minHeight={150}>
          <p>Do yo really want to add this user to your establishment?</p>
          <button type="button" className="center-button" onClick={this.addRelation}>ADD</button>
        </Modal>
        <Modal show={this.state.isOpen2}
          onClose={(e) => this.toggleModal(e, 2)} minHeight={150}>
          <p>Do yo really want to DELETE this user in your establishment?</p>
          <button type="button" className="center-button" onClick={this.removeUser}>DELETE</button>
        </Modal>                                 
      </div>);
  }
}
            
PropTypes.propTypes = {
  place: PropTypes.object,
};

PropTypes.defaultProps = {
  place: {},
};

const mapStateToProps = state => {
  return { user: state.user };
}; 

export default connect(mapStateToProps)(PlaceWorkers);
            
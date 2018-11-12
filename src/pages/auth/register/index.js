import React, { Component } from 'react';
import { render } from 'react-dom';
import { CardHeaderTittle } from './../../../components/ui/cards-icon';
import firebase from './../../../database/firebase';
import {auth}  from './../../../services/auth';
import { Input } from './../../../components/ui/input';


class Register extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      form: {email:'', password:'', displayName:'', },
      error:false,
    };
    this.form = {};
    this.photo = null;
    this.savePhotoInCache = this.savePhotoInCache.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.attemptRegister = this.attemptRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  attemptRegister(event) {
    event.preventDefault();
    const displayName = this.state.displayName;
    const file = this.photo;
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((response)=>{
      const newUser = {
        email: response.user.uid,
        uid: response.user.uid,
        displayName: this.state.displayName,
        photoURL:'',
      };
      if (this.photo){
        auth.uploadImage(response.user.uid, this.photo).then((URL) => {
          newUser.photoURL = URL;
          this.registerUser(newUser);
        }).catch(error => console.error(error));
      } else {
        this.props.history.push('/');
      }
    }).catch(error => {
      console.error(error);
      this.setState({errorMessage: error.message});
    });
  }

  registerUser(newUser){
    auth.registerUser(newUser).then(response=>{
      if(response.success){
        auth.saveUser(response.data);
        this.props.history.push('/');
      }
    }).catch(error => console.log(error));
  }

  handleChange(name, value){
    this.setState({[name]:value});
  }

  savePhotoInCache(file) {
    this.photo = file;
  }

  addPhoto(){
    const fileInput = document.getElementById('add-photo');
    fileInput.click();
    fileInput.addEventListener('change', (e) => this.savePhotoInCache(e.target.files[0]));
  }
  
  render(){
    return (
    <div className="center-card">
      <div className="card">
        <CardHeaderTittle />
          <form  onSubmit={this.attemptRegister}  id="form-register-id">
            <Input
              id="register-name"
              name="displayName"
              placeholder="Ingresa tu nombre"
              className="input-width"
              type="nombre"
              minlength="6"
              required={true}
              onChange={this.handleChange}
            />
            <Input
              id="register-email"
              name="email"
              placeholder="Ingresa tu email"
              className="input-width"
              type="email"
              minlength="6"
              required={true}
              onChange={this.handleChange}
            />
            <Input
              id="register-password"
              name="password"
              placeholder="Ingresa tu password"
              className="input-width"
              type="password"
              required={true}
              minlength="6"
              onChange={this.handleChange}
            />
            { this.state.errorMessage && <h4 className="center-text red">{this.state.errorMessage} </h4>}
            <input className="nodisplay" id="add-photo" type="file"/>
            <button  className="center-button margin-top raised" type="button" onClick={this.addPhoto}> 
              AGREGAR FOTO
            </button>
            <button  className="center-button margin-top" type="submit"> 
              REGISTRAR
            </button>
        </form>
      </div>
    </div>);
  }
}
  

export {Register};

import React, { Component } from 'react';
import { render } from 'react-dom';
import { CardHeaderTittle } from '/components/ui/cards-icon';
import firebase from '/database/firebase';
import {auth}  from '/services/auth';
import { Input } from '/components/ui/input';


class Register extends Component {
  constructor(props){ 
    this.state = {
      form: {email:'', password:'', displayName:'', },
      error:false,
    };
    this.form = {};
    this.photo = {};
    this.savePhotoInCache = this.savePhotoInCache.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.attemptRegister = this.attemptRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  attemptRegister(event) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then((response)=>{
      this.registerUser();
      this.props.history.push('/');
    }).catch(function(error) {
      console.error(error);
    });
  }

  registerUser(){
    auth.registerUser(this.form).then(response=>console.log('Register', response))
      .catch(error => console.log(error));
  }

  handleChange(name, value){
    this.form[name] = value;
  }

  savePhotoInCache(file) {
    this.photo = file;
  }

  addPhoto(){
    const fileInput = document.getElementById('add-photo')
    fileInput.click();
    fileInput.addEventListener('change', (e) => this.savePhotoInCache(e.target.files[0]));
  }
  
  render(){
    return (
    <div className="center-card">
      <div className="card">
        <CardHeaderTittle />
          <form  onSubmit={this.attemptRegister}  id="form-id">
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
            <input className="nodisplay" id="add-photo"/>
            <button  className="center-button margin-top raised" type="buttton" onClick={this.addPhoto}> 
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

import React, { Component } from 'react';
import { render } from 'react-dom';
import { CardHeaderTittle } from './../../../components/ui/cards-icon';
//import firebase from './../../../database/firebase';
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
    this.confirmPassword = this.confirmPassword.bind(this);
  }
  
  componentDidMount(){
    this.fileInput = document.getElementById('add-photo');
    this.image = document.getElementById('preview-image');
  }

  attemptRegister(event) {
    event.preventDefault();
    if(this.state.password === this.state.password_confirmation){
        //firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((response)=>{
        const newUser = {
          email: this.state.email,
          //uid: response.user.uid,
          //displayName: this.state.displayName,
          name:this.state.displayName,
          //photoURL:'',
          photo_url: '',
          password:this.state.password,
          role_vp:2,
        };
        if (this.photo){
          auth.uploadImage(this.state.email, this.photo).then((URL) => {
            //newUser.photoURL = URL;
            newUser.photo_url = URL;
            this.registerUser(newUser);
          }).catch(error => console.error(error));
        } else {
          this.registerUser(newUser);
          this.props.history.push('/');
        }
      /*}).catch(error => {
        console.error(error);
        this.setState({errorMessage: error.message});
      });*/
    }  
  }

  registerUser(newUser){
    auth.registerUser(newUser).then(response=>{
      if(response.status){
        // TODO THIS WILL WORK WHEN THE BACKEND SEND ME THE TOKEN
        // auth.saveUser(response.data);
        auth.loginWithEmailAndPassword(this.state.email, this.state.password).then((response)=>{
          auth.saveUser(response.data);
          this.props.history.push('/');
        }).catch(error => {
          this.setState({errorMessage: error.message});
        });
      }
    }).catch(error => console.log(error));
  }

  handleChange(name, value){
    this.setState({[name]:value});
  }
  
  confirmPassword (name, value, event){
    this.setState({[name]:value});
    if( value !== this.state.password){
      event.classList.add('invalid');
    }else {
      event.classList.remove('invalid');
    }
    
  }

  savePhotoInCache(file) {
    this.photo = file;
    let reader  = new FileReader();
    reader.onload =  () => {
      this.image.style.display = 'block';
      this.image.src = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.image.src = "";
    }
  }

  addPhoto(){
    this.fileInput.click();
    this.fileInput.addEventListener('change', (e) => this.savePhotoInCache(e.target.files[0]));
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
            <Input
              id="register-password2"
              name="password_confirmation"
              placeholder="Repite tu password"
              className="input-width"
              type="password"
              required={true}
              minlength="6"
              onChange={this.confirmPassword}
            />
            <br/>
            <img src="" className="nodisplay" height="200" alt="preview..." id="preview-image"/>
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

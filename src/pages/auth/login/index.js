import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from "react-redux";
import { CardHeaderTittle } from './../../../components/ui/cards-icon';
import { Input } from './../../../components/ui/input';
import firebase from './../../../database/firebase';
import {auth}  from './../../../services/auth';
import { addUser } from "./../../../redux/actions/actions";

class Login extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      email:'',
      password:'',
      error:false,
    };
    this.attemptLogin = this.attemptLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fbSignIn = this.fbSignIn.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.goTo = this.goTo.bind(this);
  }

  attemptLogin(event) {
    event.preventDefault();
    auth.loginWithEmailAndPassword(this.state.email, this.state.password).then((response)=>{
      console.log('loginResponse', response)
      auth.saveUser(response.data);
      this.setState = {form: {}};
      this.props.history.push('/');
    }).catch(error => {
      this.setState({errorMessage: error.message});
    });
  }

  googleSignIn(){
    auth.googleSignIn().then(response =>  {
      this.props.addUser(response.user);
      this.setState = {form: {}};
      this.props.history.push('/');
    }).catch(error => {
      this.setState({errorMessage: error.message});
      console.error(error);
    });
  }

  fbSignIn(){
    auth.fbSignIn().then(response =>  {
      this.props.addUser(response.user);
      this.setState = {form: {}};
      this.props.history.push('/');
    }).catch(error => {
      this.setState({errorMessage: error.message});
      console.error(error);
    });
  }

  goTo(path){
    this.props.history.push(path);
  }

  handleChange(name, value){
    this.setState({[name]:value});
  }
  
  render(){
    return (
    <div className="center-card">
      <div className="card">
        <CardHeaderTittle />
          <form  onSubmit={this.attemptLogin}  id="form-login-id">
            <Input
              id="login-email"
              name="email"
              placeholder="Ingresa tu email"
              className="input-width"
              type="email"
              minlength="6"
              required={true}
              onChange={this.handleChange}
            />
            <Input
              id="login-password"
              name="password"
              placeholder="Ingresa tu password"
              className="input-width"
              type="password"
              required={true}
              minlength="6"
              onChange={this.handleChange}
            />
            <h4 className="center-text">Ingresa con </h4>
            { this.state.errorMessage && <h4 className="center-text red">{this.state.errorMessage} </h4>}
            <div className="center-flex" id="login-options">
              <img onClick={this.googleSignIn} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="icon pointer"/>
              <img onClick={this.fbSignIn} src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" className="icon pointer"/>
            </div>
            <button  className="center-button margin-top" type="submit"> 
              INGRESAR 
            </button>
            <button  className="center-button margin-top raised" type="button" onClick={() => this.goTo('/auth/register')}>
              REGISTRAR 
            </button>
            <button  className="center-button margin-top raised" type="button" onClick={() => this.goTo('/auth/forgot-password')}>
              RECORDAR CONSTRASEÑA 
            </button>
        </form>
      </div>
    </div>);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  };
};

export default connect(null, mapDispatchToProps)(Login);


import React, { Component } from 'react';
import { render } from 'react-dom';
import { Avatar } from '../../auth/avatar';
import { Link } from 'react-router-dom';
import { uiService } from './../../../services/ui.service';
import {auth}  from './../../../services/auth';
import { connect } from "react-redux";
import { removeUser } from "./../../../redux/actions/actions";
import { withRouter } from "react-router-dom";

const navs =  [
  {route: '/about', name: 'About'},
  {route: '/posts', name: 'Posts'},
];

class Navbar extends Component{

  constructor(props){
    super(props);
    this.state = { isMobile: uiService.isMobile(), open: false, user: null, showMenu: false};
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.onChangePath = this.onChangePath.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.signOut = this.signOut.bind(this);
    this.goTo = this.goTo.bind(this);
    this.elemContent = '';
    this.elemNav = '';  
    this.showMenu = this.showMenu.bind(this);
    //auth.getCurrentUser().then(user=>this.setState({user:user})).catch(error=>console.error(error));
  }

  goTo(path){
    this.props.history.push(path);
    this.onChangePath();
  }

  signOut(){
    auth.signOut().then( success => {
      this.props.removeUser();
      this.props.history.push('/');
    }).catch( error => console.error(error));
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  toggleDrawer(){
    this.toggleNav();
    this.setState(state => ({
      open: !state.open
    }));
  }

  toggleNav() { 
    if(!this.state.open){
      this.elemContent.style.width = '100%';
      //this.elemContent.style.display = 'block';
      this.elemNav.style.width = '40%';
       
    }else{
      this.elemContent.style.width = '0%';
      //this.elemContent.style.display = 'none';
      this.elemNav.style.width = '0%';
    }
  }

  onChangePath(){
    if(this.state.open){
      this.toggleDrawer();
    }
  }

  componentDidMount() {
    this.elemContent = document.getElementById('side-overlay');
    this.elemNav = document.getElementById('side-nav'); 
    this.elemContent.addEventListener('click', (e)=> {
      if(e.srcElement.id === 'side-overlay'){
        this.toggleDrawer();
      }
    });
    window.addEventListener("resize", ($event) => {
      const isMobile = uiService.isMobile();
      this.setState({
        isMobile: isMobile,
        });
    });
  }
  
  render(){
    const list = [{name:'Salir'},{ name:'Perfil'}]
    const listsItems = navs.map(value => 
      <li key={value.route} id={`nav-${value.name.toLowerCase}`} onClick={this.onChangePath}><Link to={value.route}>{value.name}</Link></li>
    );
    return(
      <div>
        <div className="navbar">
          <ul className="ul">
            { this.state.isMobile && 
            <i className="material-icons white" onClick={this.toggleDrawer}>menu</i>
            }
            <li id='nav-home' onClick={this.onChangePath}><Link to='/'>Home</Link></li>
            { !this.state.isMobile && 
            listsItems}
            <li className="spacer"></li>
            {!this.props.user.email && <li id='nav-login' onClick={this.onChangePath}><Link to='/login' >Login</Link></li>}
            {this.props.user.email && <li id='nav-login'  onClick={this.showMenu}> 
            {
              this.state.showMenu
              ? (
              <div className="card menu">
                <p className="pointer" onClick={()=>{this.goTo('/profile')}}> Profile </p>
                <p className="pointer" onClick={this.signOut}> Salir </p>
              </div>
              ): (null)
            }
            <a>Profile</a></li>}
          </ul>
        </div>
        <div className="side-overlay" id="side-overlay">
          <div className="nav-list"  id="side-nav">
            { this.state.isMobile && this.state.open && listsItems }
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return { user: state.user };
}; 

const mapDispatchToProps = dispatch => {
  return {
    removeUser: user => dispatch(removeUser(user))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
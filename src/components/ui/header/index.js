import React, { Component } from 'react';
import { render } from 'react-dom';
import  Navbar  from '../navbar';

 import '../ui.scss';

class Header extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <header>
        <Navbar/>
      </header>
    );
  }
}

export { Header };
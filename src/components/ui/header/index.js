import React, { Component } from 'react';
import { render } from 'react-dom';
import  Navbar  from '../navbar';
import { uiService} from '/services/ui.service';

 import '../ui.scss';

class Header extends Component{
  constructor(props){
    super();
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
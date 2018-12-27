import React, {Component} from 'react';
import {render} from 'react-dom';

class PlaceCardServices extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (<div> 
           <img className="half-image" src="https://www.elheraldo.co/sites/default/files/styles/width_860/public/articulo/2015/05/04/chuzo_desgranado_natalli_8.jpg?itok=IJvku1cn" alt="photico"/>
           <img className="half-image" src="https://www.mycolombianrecipes.com/wp-content/uploads/2014/02/mazorca-desgranada-colombiana.jpg" alt="photico"/>
           <div className="flex-header padding10">
             <span className="nospace">Una salchipapaso </span>
             <span className="gray sub-span"> 30K</span>
             <span className="spacer"></span>
             <button className="raised">PEDIR</button>
          </div>
          <div className="flex-header padding10">
             <span className="nospace">Una hamburguesaria </span>
             <span className="gray sub-span"> 10K</span>
             <span className="spacer"></span>
             <button className="raised">PEDIR</button>
          </div>
        </div>);
  }
}

export default PlaceCardServices;
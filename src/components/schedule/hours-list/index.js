import React, { Component } from 'react';
import { render } from 'react-dom';

import './style.scss';

class HoursList extends Component{
  constructor(props){
    super(props);
    this.array = [];
    this.state = {array:[{}, {}, {}, {}, {}, {}, {}, {}]};
    this.getRandomInt = this.getRandomInt.bind(this);
    this.selectHour = this.selectHour.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }
  
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  selectHour(idx){
    this.removeClass();
    this.array[idx] = {...this.array[idx], ...{className:this.array[idx].className + ' selected-card'}};
    this.setState({array: this.array});
  }
  
  removeClass(){
    for (var i = 0; i < this.array.length; i++) {
      if(this.array[i].className.search('selected-card') > 0 ){
        this.array[i].className = this.array[i].className.substring(0, this.array[i].className.search('selected-card'));
      }
    }
  } 
  
  componentDidMount(){
    this.array = [];
    for (let i = 0; i < 7; i++){
      this.array.push({className: 'card'});
    }
    this.setState({array:this.array});
  }

  render(){
    let freeHours = this.state.array.map((value, i) => {
      return(<div className={value.className} key={i} onClick={() => this.selectHour(i)}>
            <span>{`${this.getRandomInt(25)}:${this.getRandomInt(61)}`}</span>
          </div>); 
    });
    return (<div className="horizontal flex" style={{overflowX:'scroll',border:'1px solid #e4e1e1'}}>
        {freeHours}
      </div>);
  }
}

export default HoursList;
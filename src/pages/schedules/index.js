import React, { Component } from 'react';
import { render } from 'react-dom';
import {vanillaCalendar} from '../../assets/js/vanillaCalendar.js';

import '../../assets/scss/vanillaCalendar.scss';

class Schedules extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    vanillaCalendar.init({
      disablePastDays: true
    });
  }
  
  render(){
    return (
    <div className="center-card">
      <div className="card">
        <h1 className="nomargin">Juanito Caleman</h1>
        <h3 className="gray nomargin">Choose a day to schedule</h3>
        <div id="v-cal">
          <div class="vcal-header">
            <button class="vcal-btn" data-calendar-toggle="previous">
              <svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
              </svg>
            </button>

            <div class="vcal-header__label" data-calendar-label="month">
              March 2017
            </div>


            <button class="vcal-btn" data-calendar-toggle="next">
              <svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
              </svg>
            </button>
          </div>
          <div class="vcal-week">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
          <div class="vcal-body" data-calendar-area="month"></div>
        </div>

        <p class="demo-picked">
          Date picked:
          <span data-calendar-label="picked"></span>
        </p>

        <button className="full-width-important center-button" type="button">RESERVE</button>
      </div>
    </div>); 
  }
}
            
export {Schedules};
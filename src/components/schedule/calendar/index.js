import React, { Component } from 'react';
import { render } from 'react-dom';
//import {vanillaCalendar} from '../../../assets/js/vanillaCalendar.js';

import '../../../assets/scss/vanillaCalendar.scss';

class ScheduleCalender extends Component {
  constructor(props){
    super(props);
    this.activeDates = null;
    this.options = {disablePastDays:true};
    this.date =  new Date();
    this.todaysDate = new Date();
    this.date.setDate(1);
    this.initializeCalendar = this.initializeCalendar.bind(this);
    this.createMonth = this.createMonth.bind(this);
    this.createDay = this.createDay.bind(this);
    this.removeActiveClass = this.removeActiveClass.bind(this);
    this.monthsAsString = this.monthsAsString.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.dateClicked = this.dateClicked.bind(this);
    this.clearCalendar = this.clearCalendar.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.state = {days:[], date:''};
  }
  
  componentDidMount(){
    //vanillaCalendar.init({disablePastDays:false});
    this.initializeCalendar();
    this.createMonth();
  }
  
  nextMonth(e){
    e.stopPropagation();
    this.setState({days:[]}, () => {
      this.clearCalendar();
      const prevMonth = this.date.getMonth() + 1;
      this.date.setMonth(prevMonth);
      this.createMonth();
    });
  }
  
  previousMonth(e){
    e.stopPropagation();
    this.setState({days:[]}, () => {
      this.clearCalendar();
      const prevMonth = this.date.getMonth() - 1;
      this.date.setMonth(prevMonth);
      this.createMonth();
    });
  }
  
  initializeCalendar(){
    this.month = document.querySelectorAll('[data-calendar-area="month"]')[0];
    this.next = document.querySelectorAll('[data-calendar-toggle="next"]')[0];
    this.previous = document.querySelectorAll('[data-calendar-toggle="previous"]')[0];
    this.label = document.querySelectorAll('[data-calendar-label="month"]')[0];
  }
  
  createMonth(){
    const currentMonth = this.date.getMonth();
    while (this.date.getMonth() === currentMonth) {
      this.createDay(
        this.date.getDate(),
        this.date.getDay(),
        this.date.getFullYear()
      );
      this.date.setDate(this.date.getDate() + 1);
    }
    // while loop trips over and day is at 30/31, bring it back
    this.date.setDate(1);
    this.date.setMonth(this.date.getMonth() - 1);

    this.label.innerHTML =
      this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
    this.dateClicked();
  }
  
  dateClicked () {/*
    this.activeDates = document.querySelectorAll(
      '[data-calendar-status="active"]'
    );
    for (let i = 0; i < this.activeDates.length; i++) {
      console.log(this.activeDates[i]);
      this.activeDates[i].addEventListener('click', this.selectDay);
    }*/
  }
  
  selectDay(num, day, month){
    this.setState({date: `You choose ${num}/${this.date.getMonth()+1}/${this.date.getFullYear()}`});
    /*console.log(event);
    const picked = document.querySelectorAll(
      '[data-calendar-label="picked"]'
    )[0];
    picked.innerHTML = event.srcElement.dataset.calendarDate;
    */
    //this.removeActiveClass();
    //event.target.classList.add('vcal-date--selected');
  }
  
  createDay(num, day, month){
    //const newDay = document.createElement('div');
    //const dateEl = document.createElement('span');
   // dateEl.innerHTML = num;
    //newDay.className = 'vcal-date';
    //newDay.setAttribute('data-calendar-date', this.date);
    const key = ''   + num + this.date.getMonth()+1 + this.date.getFullYear();
    let className = 'vcal-date';
    let style = {};
    let attribute;
    // if it's the first day of the month
    if (num === 1) {
      if (day === 0) {
        //newDay.style.marginLeft = (6 * 14.28) + '%';
        style.marginLeft = (6 * 14.28) + '%';
      } else {
        //newDay.style.marginLeft = ((day - 1) * 14.28) + '%';
        style.marginLeft = ((day - 1) * 14.28) + '%';
      }
    }

    if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
      //newDay.classList.add('vcal-date--disabled');
      className = className + ' vcal-date--disabled';
    } else {
      //newDay.classList.add('vcal-date--active');
      className = className + ' vcal-date--active';
      attribute = 'active';
      //newDay.setAttribute('data-calendar-status', 'active');
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      //newDay.classList.add('vcal-date--today');
      className = className + ' vcal-date--today';
    }
    let newElement = <div  onClick={(e) => this.selectDay(num, day, month)} className={className} key={key} style={style} data-calendar-status={attribute} data-calendar-date={this.date}><span>{num}</span></div>;
    
    this.setState((prevState) => {
      return {days: [...prevState.days, ...[newElement]]};
    });
    //newDay.appendChild(dateEl)
    //this.month.appendChild(newDay);
  }
  
  monthsAsString (monthIndex) {
    return [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ][monthIndex];
  }
  
  removeActiveClass () {
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].classList.remove('vcal-date--selected');
    }
  }
  
  clearCalendar() {
    this.month.innerHTML = '';
  }
  
  render(){
    return (
    <div className="card">
        {this.props.user && <h1 className="nomargin">{this.props.user.name}</h1>}
        <h3 className="gray nomargin">Choose a day to schedule</h3>
        <div id="v-cal">
          <div className="vcal-header">
            <button className="vcal-btn" data-calendar-toggle="previous" onClick={this.previousMonth}>
              <svg height="24" version="1.1" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
              </svg>
            </button>

            <div className="vcal-header__label" data-calendar-label="month">
              March 2017
            </div>


            <button className="vcal-btn" data-calendar-toggle="next" onClick={this.nextMonth}>
              <svg height="24" version="1.1" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
              </svg>
            </button>
          </div>
          <div className="vcal-week">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
          <div className="vcal-body" data-calendar-area="month">
            {this.state.days}
          </div>
        </div>

        <p className="demo-picked">
          Date picked:
          <span data-calendar-label="picked">{this.state.date}</span>
        </p>

        <button className="full-width-important center-button" type="button">RESERVE</button>
      </div>); 
  }
}
            
export {ScheduleCalender};
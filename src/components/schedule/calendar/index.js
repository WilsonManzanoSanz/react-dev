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
    this.days = [];
    this.initializeCalendar = this.initializeCalendar.bind(this);
    this.createMonth = this.createMonth.bind(this);
    this.createDay = this.createDay.bind(this);
    this.removeActiveClass = this.removeActiveClass.bind(this);
    this.monthsAsString = this.monthsAsString.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.clearCalendar = this.clearCalendar.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.state = {days:[], date:'', properties:[], currentMonth:''};
  }
  
  componentDidMount(){
    this.initializeCalendar();
    this.createMonth();
  }
  
  nextMonth(e){
    e.stopPropagation();
    this.days = [];
    this.clearCalendar();
    const prevMonth = this.date.getMonth() + 1;
    this.date.setMonth(prevMonth);
    this.createMonth();
  }
  
  previousMonth(e){
    e.stopPropagation();
    this.days = [];
    this.clearCalendar();
    const prevMonth = this.date.getMonth() - 1;
    this.date.setMonth(prevMonth);
    this.createMonth();
  }
  
  initializeCalendar(){
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
    this.setState({days:this.days});
    // while loop trips over and day is at 30/31, bring it back
    this.date.setDate(1);
    this.date.setMonth(this.date.getMonth() - 1);
    
    this.setState({currentMonth:this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()});
  }
  
  selectDay(num, day, month){
    this.setState({date: `You choose ${num}/${this.date.getMonth()+1}/${this.date.getFullYear()}`});
    this.removeActiveClass();
    this.days[num-1] = {...this.days[num-1], ...{className:this.days[num-1].className + ' vcal-date--selected'}};
    this.setState({days: this.days});
  }
  
  createDay(num, day, month){
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
      className = className + ' vcal-date--active';
      attribute = 'active';
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      className = className + ' vcal-date--today';
    }
    this.days.push({num:num, day:day, month: month, className: className, style: style, attribute: attribute, key:key});
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
  
  removeActiveClass (){
    for (var i = 0; i < this.days.length; i++) {
      if(this.days[i].className.search('--selected') > 0 ){
        this.days[i].className = this.days[i].className.substring(0, this.days[i].className.search('--selected'));
      }
    }
  }
  
  clearCalendar() {
  }
  
  render(){
    const days = this.state.days.map(value => <div  onClick={(e) => this.selectDay(value.num, value.day, value.month)} className={value.className} key={value.key} style={value.style} data-calendar-status={value.attribute} data-calendar-date={this.date}><span>{value.num}</span></div>);
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
              {this.state.currentMonth}
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
            {days}
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
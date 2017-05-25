import React from 'react';
import DatePicker from 'react-datepicker';
import css from 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import TimePicker from 'react-bootstrap-time-picker';


const Mdisplay_2 = React.createClass({
	getInitialState: function() {
    return {
      startDate: moment(),
      starttime : "00:00",
      endtime: "00:00"
    };
  },

  handleChange: function(date) {
    // console.log(date,date.toDate(),date.format("YYYY-MM-DD"));
    this.setState({
      startDate: date
    });
  },
  dateFormat(time){
  	// console.log(time);
  	time = (time/3600);
  	// console.log(time)
  	var hr = ("0"+/[0-9]+/.exec(time)).slice(-2);
  	var min=0;
  	time.toString().length == 3 || time.toString().length == 4 ? min=30 : min="00";
    // console.log(hr,min, hr+":"+min)
  	return time = hr+":"+min;
  },

  handleChangeTime:function(time){
  	time = this.dateFormat(time);
  	this.setState({
  		starttime : time
  	});
  },

  handleChangeEndtime(time){
  	time = this.dateFormat(time);
  	this.setState({
  		endtime : time
  	});
  },

	handleSubmit(e){
		e.preventDefault();
		const date = this.state.startDate.format("YYYY-MM-DD");
		const starttime = this.state.starttime;
		const endtime = this.state.endtime;
		const eventItem = this.refs.eventItem.value;
		// console.log(date,time,eventItem);
		// const datepicker = this.state.startDate;
		// console.log("DATE PICKER",datepicker);
		this.props.addEventList(date,starttime,endtime,eventItem,this.props.id,this.props.email);
		this.refs.eventForm.reset();
    this.props.handleClosePlusButton();
	},

render(){
	return(
	<div className="meventdiv">
		<h4 className="meventlabel">Add Event</h4>
		<form className='eventform' ref='eventForm' onSubmit={this.handleSubmit} id='loginForm'>
			<input type='text' ref='eventItem' placeholder='Enter event' className="meventItem" />
			<DatePicker className="meventItem datepicker" selected={this.state.startDate} onChange={this.handleChange} />
			<label className="mstart">Start time</label>
			<TimePicker onChange={this.handleChangeTime} value={this.state.starttime} 
					className="mtimepicker"/>
			<label className="mend">End time</label>
			<TimePicker onChange={this.handleChangeEndtime} value={this.state.endtime}
					className="mtimepicker"/>	
      <div>	
			<button type='submit' className="meventformButton" >Submit</button>
			<button type='cancel' className="meventformButton" onClick={this.props.handleClosePlusButton}>Cancel</button>
		  </div>
    </form>
	</div>
			)
	}
})

export default Mdisplay_2;

// <input type='number' ref='id' placeholder='Enter ID' />
import React from 'react';
import DatePicker from 'react-datepicker';
import css from 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import TimePicker from 'react-bootstrap-time-picker';

const EventForm = React.createClass({
	getInitialState: function() {
    return {
      startDate: moment(),
      starttime : 0,
      endtime:0
    };
  },

  handleChange: function(date) {
    console.log(date,date.toDate(),date.format("YYYY-MM-DD"));
    this.setState({
      startDate: date
    });
  },
  dateFormat(time){
  	console.log(time);
  	time = (time/3600);
  	console.log(time)
  	var hr = ("0"+/[0-9]+/.exec(time)).slice(-2);
  	var min=0;
  	time.toString().length == 3 || time.toString().length == 4 ? min=30 : min="00";
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
	},

	render(){
		return(
			<div>
			<h4>Add Events</h4>
				<form className='eventform' ref='eventForm' onSubmit={this.handleSubmit}>
					<DatePicker selected={this.state.startDate} onChange={this.handleChange} />
					<label>start time</label>
					<TimePicker onChange={this.handleChangeTime} value={this.state.starttime}/>
					<label>end time</label>
					<TimePicker onChange={this.handleChangeEndtime} value={this.state.endtime}/>
					<input type='text' ref='eventItem' placeholder='Enter event' />
					<button type='submit' className="eventformButton">Submit</button>
				</form>
			</div>
			)
	}
})

export default EventForm;

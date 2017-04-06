import React from 'react';

const EventForm = React.createClass({
	handleSubmit(e){
		e.preventDefault();
		const date = this.refs.date.value;
		const starttime = this.refs.starttime.value;
		const endtime = this.refs.endtime.value;
		const eventItem = this.refs.eventItem.value;
		// console.log(date,time,eventItem);
		this.props.addEventList(date,starttime,endtime,eventItem,this.props.id,this.props.email);
		this.refs.eventForm.reset();
	},

	render(){
		return(
			<div>
			<h4>Add Events</h4>
				<form className='event-form' ref='eventForm' onSubmit={this.handleSubmit}>
					<input type='date' ref='date' placeholder='Enter date' />
					<label>start time</label>
					<input type='time' ref='starttime' placeholder='Enter start time' />
					<label>end time</label>
					<input type='time' ref='endtime' placeholder='Enter end time' />
					<input type='text' ref='eventItem' placeholder='Enter event' />
					<button type='submit' className="eventformButton">Submit</button>
				</form>
			</div>
			)
	}
})

export default EventForm;
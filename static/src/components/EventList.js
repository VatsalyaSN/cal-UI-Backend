import React from 'react';
import Header from './Header';
import DisplayEvents from './DisplayEvents';
import EventForm from './EventForm';

const EventList = React.createClass({
	componentDidMount(){
		this.props.handleOnload("month");
		this.props.handleOnload("week");
		this.props.handleEventOnload(this.props.id,this.props.email);
	},

	componentWillUnmount(){
		console.log("COMPOMENT WILL UNMOUNT");
		this.props.handleOnUnmount();
	},
	
	renderEvents(event,i){
		return(
		<div key={i}>
			<h5>{event.dateItem}{event.starttime}{event.eventItem}</h5>
		</div>
		)
	},

	render(){
		const {id,email,months,year,addEventList,weekDate,getCurrentWeek,handleNextWeek,handlePreviousWeek,handleOnload} = this.props;
				return(
			<div className='events'>
			<Header date={weekDate} months={months} year={year} handleOnload={handleOnload} handleNext={handleNextWeek} handlePrevious={handlePreviousWeek} today={getCurrentWeek}/>
			<br/>
			
			{this.props.event.map(this.renderEvents)}
			<EventForm addEventList={addEventList} id={id} email={email}/>
			</div>
			)
	}
});

export default EventList;
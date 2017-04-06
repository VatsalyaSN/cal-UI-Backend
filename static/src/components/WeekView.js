import React from 'react';
import Header from './Header';
import CalendarViewWeekly from './CalendarViewWeekly';


const WeekView = React.createClass({
	componentWillMount(){
		console.log("COMPONENT WILL MOUNT")
			this.props.handleEventOnload(this.props.id,this.props.email);
	},

	componentDidMount(){
		console.log("FROM WEEKEVIEW>>> ",this.props.id,this.props.email);
		this.props.handleOnload("month");
		this.props.handleOnload("week");
		setTimeout(function(){this.props.loadEvent(this.props)}.bind(this),100);	
	},

	componentWillUnmount(){
		this.props.handleOnUnmount();
	},
	
	render(){
		const {date,months,monthArray,year,getCurrentWeek,handleNextWeek,handlePreviousWeek,handleOnload,weekDate,loadEvent,logoutAndRedirect} = this.props;
		let greeting;
		if(this.props.username != '')
			greeting = <h3>Hey {this.props.username}</h3>;
		return(
			<div>
				{greeting}
				<button onClick={logoutAndRedirect}>Logout</button>
				<Header date={weekDate} months={months} year={year} handleOnload={handleOnload} handleNext={handleNextWeek} handlePrevious={handlePreviousWeek} today={getCurrentWeek} loadEvent={loadEvent}/>
				<CalendarViewWeekly weekDate={weekDate} event={this.props.eventStore} months={months} monthArray={monthArray}/>
			</div>
			)
	}
})

export default WeekView;
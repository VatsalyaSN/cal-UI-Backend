import React from 'react';
import {render} from 'react-dom';
import CalenderView from './CalenderView';
import Mdisplay from './Mdisplay';

const MonthView = React.createClass({
	componentWillMount(){
		// console.log("COMPONENT WILL MOUNT")
		this.props.handleEventOnload(this.props.id,this.props.email);
	},

	timer(){
		this.props.foo(this.props.event)
	},

	componentDidMount(){
		// console.log("COMPONENT DID MOUNT")
		// console.log("FROM MONTHVIEW>>> ",this.props.id,this.props.email);
		this.interval = setInterval(this.timer, 60000)
		this.props.handleOnload("month");
		this.props.loadMonthEvent(this.props);
	},

	componentWillUnmount(){
		// console.log("COMPOMENT WILL UNMOUNT");
		this.props.handleOnUnmount();
		this.props.closeDetail(this.props.date,"details");
		clearInterval(this.interval)
	},

	render(){
		const {addEventList,closeDetail,caretNext,caretPrevious,currentYear,date,
				dateArray,details,deleteEventList,eventStoreMonth,endTime,googleAccSync,
				handlePrevious,handleNext,handleToday,handleDetails,handleMonth,
				handleMdisplay,handlePlusButton,handleClosePlusButton,logoutAndRedirect,
				lastWeek,months,monthArray,moreButton,mObject,nextValue,nextWeek,popupItem,
				plusButton,showMore,startDate,startTime,weekDate,year,loadMonthEvent
			  }= this.props;
		// let greeting;
		// if(this.props.username != '')
		// 	greeting = <h3>Hey {this.props.username}</h3>;

	return(
		<div className="month">
			<CalenderView dateArray={dateArray} months={months} date={date} weekDate={" "} 
				event={eventStoreMonth} moreButton={moreButton} showMore={showMore} 
				closeDetail={closeDetail} details={details} handleDetails={handleDetails}
				popupItem={popupItem} deleteEventList={deleteEventList} 
				lastWeek={lastWeek} nextWeek={nextWeek} year={year} mObject={mObject}
				handleMdisplay={handleMdisplay} monthArray={monthArray} 
				caretNext={caretNext} caretPrevious={caretPrevious} currentYear={currentYear}
				handleMonth={handleMonth} id={this.props.id} />

			<Mdisplay plusButton={plusButton} months={months} mObject={mObject} 
				handlePlusButton={handlePlusButton} addEventList={addEventList} 
				startDate={startDate} startTime={startTime} endTime={endTime}
				handleClosePlusButton={handleClosePlusButton} googleAccSync={googleAccSync}
				logoutAndRedirect={logoutAndRedirect} id={this.props.id} email={this.props.email}
				username={this.props.username} monthArray={monthArray} handleMonth={handleMonth}/>
		</div>
		)
	}
})

export default MonthView;
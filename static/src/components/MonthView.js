import React from 'react';
import {render} from 'react-dom';
import CalenderView from './CalenderView';
import Header from './Header';


const MonthView = React.createClass({
	componentWillMount(){
		// console.log("COMPONENT WILL MOUNT")
		this.props.handleEventOnload(this.props.id,this.props.email);
	},

	componentDidMount(){
		// console.log("COMPONENT DID MOUNT")
		// console.log("FROM MONTHVIEW>>> ",this.props.id,this.props.email);
		this.props.handleOnload("month");
		setTimeout(function(){this.props.loadMonthEvent(this.props)}.bind(this),100);
	},

	componentWillUnmount(){
		// console.log("COMPOMENT WILL UNMOUNT");
		this.props.handleOnUnmount();
	},

	render(){
		const {date,dateArray,handlePrevious,handleNext,handleToday,logoutAndRedirect, months, monthArray, nextValue,weekDate,year,eventStoreMonth,moreButton,showMore,closeDetail} = this.props;
		let greeting;
		if(this.props.username != '')
			greeting = <h3>Hey {this.props.username}</h3>;

		return(
			<div>
				{greeting}
				<button onClick={logoutAndRedirect}>Logout</button>
				<Header date={' '} months={months} year={year} today={handleToday} handleNext={handleNext} handlePrevious={handlePrevious}/>
				<CalenderView dateArray={dateArray} months={months} date={date} weekDate={" "} event={eventStoreMonth} moreButton={moreButton} showMore={showMore} closeDetail={closeDetail}/>
			</div>
			)
	}
})

export default MonthView;
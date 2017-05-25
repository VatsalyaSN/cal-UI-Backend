import React from 'react';
import render from 'react-dom';
import TableHeader from './TableHeader';
import TableBody from  './TableBody';
import Mdisplay from './Mdisplay';
import {Icon} from 'react-fa';
import MonthOption from './MonthOption';
import 'react-fa/node_modules/font-awesome/css/font-awesome.css'


const CalenderView = React.createClass({
	
	renderEvents(event,date,moreButtonAction,lastWeek,nextWeek,x){
		var items=[];
		var day;
		var dateN;
		var i,j;
		for(i=0;i<7;i++){
			items[i] = [];
		}
		// console.log(date,event);
		event.forEach(function(item,i){
			// console.log(item.dateItem.slice(8,10));
			for(j=0;j<date.length;j++){
				// console.log(date[j]);
				if(date[j] == item.dateItem.slice(8,10)){
					// console.log("MATCHED ",date[j],item.dateItem.slice(8,10))
					dateN = new Date(item.dateItem);
					day = dateN.getDay();
					if(items[day] == " ")
					{
						// console.log("SPLICE ... ")
						items[day].splice(0,1,item);
					}
					else
					{
						// console.log("PUSH ",items);
						items[day].push(item)
					}
				}
			}
		})
		// console.log("SHOWMORE>>> ",this.props.showMore[x]);
		// console.log("DETAILS >> ",this.props.details[x],x);
		if(this.props.showMore[x] != undefined)
		return <TableBody date={date} item={items} moreButtonAction={moreButtonAction} 
					showMore={this.props.showMore[x]} closeDetail={this.props.closeDetail} 
					month={this.props.months} details={this.props.details[x]} 
					handleDetails={this.props.handleDetails} popupItem={this.props.popupItem}
					deleteEventList={this.props.deleteEventList} handleMdisplay={this.props.handleMdisplay}
					year={this.props.year} lastWeek={lastWeek} nextWeek={nextWeek} 
					id={this.props.id}/>

	},
	handleClick(){
		const d=new Date();
		this.props.currentYear();
		this.props.handleMonth(d.getMonth());
	},

	handleNext(){
		this.props.caretNext();
		this.props.handleMonth(0);
	},

	handlePrevious(){
		this.props.caretPrevious();
		this.props.handleMonth(0);
	},

	render(){
			return(
		<div className="cal">
				<p className="addSpace"></p>
				<span className="fa fcaretr" onClick={this.handleNext}>
					<Icon name="caret-right" size="2x" className="fa fa-caret-right caretR"/>
				</span>
					<span className="yrSpan" onClick={this.handleClick}>{this.props.year}</span>
				<span className="fa fcaretl" onClick={this.handle1Previous}>
					<Icon name="caret-left" size="2x" className="fa fa-caret-left caretL"/>
				</span>
				<p className="addSpace"></p>

				<MonthOption handleMonth={this.props.handleMonth} months={this.props.months} year={this.props.year} 
						handleMdisplay={this.props.handleMdisplay} monthArray={this.props.monthArray}/>
			
			<table className="monthtable">
			<TableHeader weekDate={this.props.weekDate}/>
			<tbody>
				{
				this.renderEvents(this.props.event,this.props.date[0],this.props.moreButton,this.props.lastWeek," ",0)
				}
				{
				this.renderEvents(this.props.event,this.props.date[1],this.props.moreButton," "," ",1)
				}
					{
						this.renderEvents(this.props.event,this.props.date[2],this.props.moreButton," "," ",2)
					}
					{
						this.renderEvents(this.props.event,this.props.date[3],this.props.moreButton," "," ",3)
					}
					{
						this.renderEvents(this.props.event,this.props.date[4],this.props.moreButton," ",this.props.nextWeek,4)
					}
					{
						this.props.date[5][0]!= " " ? this.renderEvents(this.props.event,this.props.date[5],this.props.moreButton," ",this.props.nextWeek,5) : null
					}
					</tbody>
				</table>
			</div>
			)

	}
})

export default CalenderView;
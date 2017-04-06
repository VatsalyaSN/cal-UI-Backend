import React from 'react';
import render from 'react-dom';
import TableHeader from './TableHeader';
import TableBody from  './TableBody';


const CalenderView = React.createClass({
	
	renderEvents(event,date,moreButtonAction,x){
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
		if(this.props.showMore[x] != undefined)
		return <TableBody date={date} item={items} moreButtonAction={moreButtonAction} showMore={this.props.showMore[x]} closeDetail={this.props.closeDetail} month={this.props.months}/>

	},

	render(){
		return(
			<div>
				<table className="monthtable">
					<TableHeader weekDate={this.props.weekDate}/>
					<tbody>
					{
						this.renderEvents(this.props.event,this.props.date[0],this.props.moreButton,0)
					}
					{
						this.renderEvents(this.props.event,this.props.date[1],this.props.moreButton,1)
					}
					{
						this.renderEvents(this.props.event,this.props.date[2],this.props.moreButton,2)
					}
					{
						this.renderEvents(this.props.event,this.props.date[3],this.props.moreButton,3)
					}
					{
						this.renderEvents(this.props.event,this.props.date[4],this.props.moreButton,4)
					}
					{
						this.props.date[5][0]!=" " ? this.renderEvents(this.props.event,this.props.date[5],this.props.moreButton,5) : null
					}
					</tbody>
				</table>
			</div>
			)
	}
})

export default CalenderView;
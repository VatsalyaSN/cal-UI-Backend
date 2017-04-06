import React from 'react';
import {render} from 'react-dom';
import TableHeader from './TableHeader';
import Time from './Time';

const CalendarViewWeekly = React.createClass({
	handleEventMap(event,time,value){
		var date;
		var day;
		var num;
		var flag=0;
		var range = (value-1)*60+1;
		var ranges = [];
		var items=[];
		var ph;
		for(var i=0;i<7;i++){
			items.push([" "]);
		}
		for(var x=range;x<range+60;x++){
			ranges.push(x);
		}
		// console.log("RANGES ",ranges);
		// console.log("Range ",range);
		event.forEach(function(item,i) {
			ranges.forEach(function(num){
				// console.log(num,item.start);
				if(num == item.start){
					flag=1;
				}
			})
			if(flag){
				date = new Date(item.dateItem);
				day = date.getDay();
				if(items[day][0] == " ")
				{
				items[day].splice(0,1,item);
				// ph = item.ph;
				}
				else
					{items[day].push(item);
						// ph = item.ph;
					}
				flag=0;
			}
		})
		// console.log(event);
		// console.log("ITTTEMMMS ",items)

		return <Time time={time} item={items}/>
	},

	handleEmptyEvent(){
		return <td className="weeklyViewtd"></td>
	},

	render(){
		return(
			<div >
				
				<table className="weeklyViewtable">
					<thead className="weeklyViewheader">
						<tr className="firstRow">
						    <th className="weeklyViewth"> </th>
							<th className="weeklyViewth">Sun <span className="weeklyViewSpan">{this.props.weekDate[0]}{this.props.weekDate[0] != " "? "/"+(this.props.monthArray.indexOf(this.props.months)+1):" "}</span> </th>
							<th className="weeklyViewth">Mon <span className="weeklyViewSpan">{this.props.weekDate[1]}{this.props.weekDate[1] != " "? "/"+(this.props.monthArray.indexOf(this.props.months)+1):" "}</span> </th>
							<th className="weeklyViewth">Tue <span className="weeklyViewSpan">{this.props.weekDate[2]}{this.props.weekDate[2] != " "? "/"+(this.props.monthArray.indexOf(this.props.months)+1):" "}</span> </th>
							<th className="weeklyViewth">Wed <span className="weeklyViewSpan">{this.props.weekDate[3]}{this.props.weekDate[3] != " "? "/"+(this.props.monthArray.indexOf(this.props.months)+1):" "}</span> </th>
							<th className="weeklyViewth">Thu <span className="weeklyViewSpan">{this.props.weekDate[4]}{this.props.weekDate[4] != " "? "/"+(this.props.monthArray.indexOf(this.props.months)+1):" "}</span> </th>
							<th className="weeklyViewth">Fri <span className="weeklyViewSpan">{this.props.weekDate[5]}{this.props.weekDate[5] != " "? "/"+(this.props.monthArray.indexOf(this.props.months)+1):" "}</span> </th>
							<th className="weeklyViewth">Sat <span className="weeklyViewSpan">{this.props.weekDate[6]}{this.props.weekDate[6] != " "? "/"+(this.props.monthArray.indexOf(this.props.months)+1):" "}</span> </th>
						</tr>
					</thead>
				
				<tbody className="weeklyViewtbody">
					{
						this.handleEventMap(this.props.event, "12:00 AM",0)
					}
					{
						this.handleEventMap(this.props.event, "1:00 AM",1)
					}
					{
						this.handleEventMap(this.props.event, "2:00 AM",2)
					}
					{
						this.handleEventMap(this.props.event, "3:00 AM",3)
					}
					{
						this.handleEventMap(this.props.event, "4:00 AM",4)
					}
					{
						this.handleEventMap(this.props.event, "5:00 AM",5)
					}
					{
						this.handleEventMap(this.props.event, "6:00 AM",6)
					}
					{
						this.handleEventMap(this.props.event, "7:00 AM",7)
					}
					{
						this.handleEventMap(this.props.event, "8:00 AM",8)
					}
					{
						this.handleEventMap(this.props.event, "9:00 AM",9)
					}
					{
						this.handleEventMap(this.props.event, "10:00 AM",10)
					}
					{
						this.handleEventMap(this.props.event, "11:00 AM",11)
					}
					{
						this.handleEventMap(this.props.event, "12:00 PM",12)
					}
					{
						this.handleEventMap(this.props.event, "1:00 PM",13)
					}
					{
						this.handleEventMap(this.props.event, "2:00 PM",14)
					}
					{
						this.handleEventMap(this.props.event, "3:00 PM",15)
					}
					{
						this.handleEventMap(this.props.event, "4:00 PM",16)
					}
					{
						this.handleEventMap(this.props.event, "5:00 PM",17)
					}
					{
						this.handleEventMap(this.props.event, "6:00 PM",18)
					}
					{
						this.handleEventMap(this.props.event, "7:00 PM",19)
					}
					{
						this.handleEventMap(this.props.event, "8:00 PM",20)
					}
					{
						this.handleEventMap(this.props.event, "9:00 PM",21)
					}
					{
						this.handleEventMap(this.props.event, "10:00 PM",22)
					}
					{
						this.handleEventMap(this.props.event, "11:00 PM",23)
					}
					
				</tbody>
				</table>
			</div>
			)
	}
})

export default CalendarViewWeekly;
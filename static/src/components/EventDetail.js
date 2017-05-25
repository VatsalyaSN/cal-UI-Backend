import React from 'react';
import CellData from './CellData';
import EventPopup from './EventPopup';


const EventDetail = (props) =>{
// render(){
// 	console.log("from event Details", this.props.show)
	return(
		<td className="menu">
			<span className="eventSpan">{props.day}, {props.date} {props.month}</span>
			{
				props.show == "week" ? 
					<span onClick={()=> props.closeMoreButtonWeek(props.value,props.dayValue,"more")}
					 className="button">&times;</span>
					:
					<span onClick={()=>props.closeDetail(props.date,"more")}
					 className="button">&times;</span>
			}
			<div className="tbodydiv">
				<ul className="eventul">
					{
						props.items.map((item,i) =>
         						{
            					if(item.eventItem != undefined)
               						return <CellData item={item} key={i} details={props.details} 
				                        handleDetails={props.handleDetails} date={props.date} 
				                        handleDetailsWeek={props.handleDetailsWeek} dayValue={props.dayValue}
				                        value={props.value} show={props.show}></CellData>
         					})

					}
				</ul>
			</div>
			<div>
			{
	            props.details && props.show == "month"? 
	            		<EventPopup 
	                        date={props.date} popupItem={props.popupItem} 
	                        closeDetail={props.closeDetail} show={props.show}
	                        deleteEventList={props.deleteEventList} id={props.id}/> 
	                        : 
	            props.detailsWeek && props.show == "week" ? 
	            		<EventPopup 
	                        date={props.date} popupItem={props.popupItem} 
	                        closeMoreButtonWeek={props.closeMoreButtonWeek} show={props.show}
	                        deleteEventList={props.deleteEventList} value={props.value} 
	                        day={props.dayValue} id={props.id}/>
	                        : " "

	        }
			</div>
		</td>
		)
	}


export default EventDetail;
import React from 'react';
import CellData from './CellData';
import CloseDetail from './CloseDetail';
import EventDetail from './EventDetail';
import EventPopup from './EventPopup';

const TableBodyItem = React.createClass({

renderEvents(items)
   {
      if(items.length < 4){
     return items.map((item,i) =>
         {
            if(item.eventItem != undefined)
               return <CellData item={item} key={i} details={this.props.details} 
                        handleDetails={this.props.handleDetails} date={this.props.date} 
                        handleDetailsWeek={this.props.handleDetailsWeek} dayValue={this.props.dayValue}
                        value={this.props.value} show={this.props.show}></CellData>
         })
      }
      else{
         var limited = items.slice(0,2);
         return limited.map(item =>
         {
            if(item.eventItem != undefined)
            {
               // console.log("item : ",item)
               return <CellData item={item} details={this.props.details} 
                        handleDetails={this.props.handleDetails} date={this.props.date}
                        handleDetailsWeek={this.props.handleDetailsWeek} dayValue={this.props.dayValue}
                        value={this.props.value} show={this.props.show}></CellData>
            }
         })
         
      }
   },

   renderButton(items,moreButtonAction){
      // console.log("IN BUTTON FUNC")
      return <a className="tbodya" href="#" onClick={()=>moreButtonAction(this.props.date)
               }>+{items.length - 2} more..</a>
   },

   renderButtonWeek(items,moreButtonWeek){
      return <a className="tbodya" href="#" onClick={()=>moreButtonWeek(this.props.value,this.props.dayValue)
               }>+{items.length - 2} more..</a>
   },

render()
 {
	return (
		<td className="tbodytd"><span className="tbodyspan">{this.props.date}</span>

            <div className="tbodydiv"><ul className="tbodyul">
            {this.renderEvents(this.props.item)
            }
            {
               this.props.item.length > 3 && this.props.show == "month" ? 
                  this.renderButton(this.props.item,this.props.moreButtonAction): 
               this.props.show == "week" && this.props.item.length > 3 ? 
                  this.renderButtonWeek(this.props.item,this.props.moreButtonWeek) : ""
            }
            {
               this.props.details && this.props.show == "month"? 
                     <EventPopup
                           date={this.props.date} popupItem={this.props.popupItem} 
                           closeDetail={this.props.closeDetail} show={this.props.show}
                           deleteEventList={this.props.deleteEventList}/> 
                           : 
               this.props.detailsWeek && this.props.show == "week" ? 
                     <EventPopup date={this.props.date} popupItem={this.props.popupItem} 
                        closeMoreButtonWeek={this.props.closeMoreButtonWeek} 
                        deleteEventList={this.props.deleteEventList} value={this.props.value} 
                        day={this.props.dayValue} show={this.props.show}/>
                           : " "
           }
            </ul></div>
			</td>
		)
   }
})

export default TableBodyItem;

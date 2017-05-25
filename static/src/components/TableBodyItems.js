import React from 'react';
import CellData from './CellData';
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
      return <a className="tbodya" href="#" onClick={()=>moreButtonAction(this.props.date)
               }>+{items.length - 2} more..</a>
   },

   renderButtonWeek(items,moreButtonWeek){
      return <a className="tbodya" href="#" onClick={()=>moreButtonWeek(this.props.value,this.props.dayValue)
               }>+{items.length - 2} more..</a>
   },

   handleDayColor(date){
      var d = new Date();
      var monthNames = ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"];
      if(date == d.getDate() && this.props.year == d.getFullYear() && this.props.month == monthNames[d.getMonth()])
         return "tbodytd today";
      else
         return "tbodytd";
   },

   handleOnClick(){
      var monthArray=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November', 'December'];
      var month,year;
      if(this.props.date == " "){
         if((monthArray.indexOf(this.props.month)-1) == -1)
            {
            month=monthArray[11]
            year = this.props.year-1
            }
         else
         {
            month=monthArray[monthArray.indexOf(this.props.month)-1]
            year = this.props.year
         }
         
         this.props.handleMdisplay(this.props.lastWeek,month,year,this.props.item)
      }
      else if(this.props.lastWeek == " " || this.props.lastWeek == undefined && this.props.date == " "){
         if((monthArray.indexOf(this.props.month)+1) == 12)
         {
            month=monthArray[0]
            year = this.props.year+1
         }
         else{
            month=monthArray[monthArray.indexOf(this.props.month)+1]
            year=this.props.year
         }

         this.props.handleMdisplay(this.props.nextWeek, month,year,this.props.item)
      }
   },

render()
 {
	return (
		<td className={this.handleDayColor(this.props.date)} 
         onClick={()=>this.handleOnClick}>
      {
         this.props.date != " " ? <p className="tbodyspan">{this.props.date}</p> : 
                                    <p className="tbodyspan tbodyspanOld">
                                    {this.props.lastWeek}
                                    </p>

      }
      {
         this.props.lastWeek == " " || this.props.lastWeek == undefined && this.props.date == " "? 
            <p className="tbodyspanOld">{this.props.nextWeek}</p> :  " " 
      }

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
                           deleteEventList={this.props.deleteEventList} id={this.props.id}/> 
                           : 
               this.props.detailsWeek && this.props.show == "week" ? 
                     <EventPopup date={this.props.date} popupItem={this.props.popupItem} 
                        closeMoreButtonWeek={this.props.closeMoreButtonWeek} 
                        deleteEventList={this.props.deleteEventList} value={this.props.value} 
                        day={this.props.dayValue} show={this.props.show} id={this.props.id}/>
                           : " "
           }
            </ul></div>
			</td>
		)
   }
})

export default TableBodyItem;

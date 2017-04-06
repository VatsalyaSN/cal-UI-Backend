import React from 'react';
import CellData from './CellData';
import EventDetail from './EventDetail';


const TableBodyItem = React.createClass({

renderEvents(items)
   {
      if(items.length < 4){
     return items.map((item,i) =>
         {
            if(item.eventItem != undefined)
               return <CellData item={item} key={i}></CellData>
         })
      }
      else{
         var limited = items.slice(0,2);
         return limited.map(item =>
         {
            if(item.eventItem != undefined)
            {
               // console.log("item : ",item)
               return <CellData item={item}></CellData>
            }
         })
         
      }
   },

   renderButton(items,moreButtonAction){
      // console.log("IN BUTTON FUNC")
      return <a className="tbodya" href="#" onClick={()=>moreButtonAction(this.props.date)}>+{items.length - 2} more..</a>
   },

render()
 {
	return (
		<td className="tbodytd"><span className="tbodyspan">{this.props.date}</span>
				<div className="tbodydiv"><ul className="tbodyul">
            {this.renderEvents(this.props.item)
            }
            {
               this.props.item.length > 3 ? this.renderButton(this.props.item,this.props.moreButtonAction): ""
            }
  
            </ul></div>
			</td>


			
		)
}
})

export default TableBodyItem;

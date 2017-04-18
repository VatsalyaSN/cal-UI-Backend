import React from 'react';
import CellData from './CellData';
import TimeItem from './TimeItem';
import EventDetail from './EventDetail';
import TableBodyItems from './TableBodyItems';


const Time= React.createClass({
   render(){
      return(
      <tr>
         <td className="weeklyViewtd"><div className="head">{this.props.time}</div></td>
        
        {
            this.props.showMoreWeek[0] && this.props.item[0].length != 0 ? 
            <EventDetail date={this.props.date[0]} day="Sunday" dayValue="0" month={this.props.month} 
               items={this.props.item[0]} closeMoreButtonWeek={this.props.closeMoreButtonWeek}
               detailsWeek={this.props.detailsWeek[0]} show="week" value={this.props.value}
               handleDetailsWeek={this.props.handleDetailsWeek} popupItem={this.props.popupItem}
               deleteEventList={this.props.deleteEventList}/>
                : 
            <TableBodyItems item={this.props.item[0]} 
               moreButtonWeek={this.props.moreButtonWeek} detailsWeek={this.props.detailsWeek[0]}
               deleteEventList={this.props.deleteEventList} show="week" dayValue="0" 
               value={this.props.value} handleDetailsWeek={this.props.handleDetailsWeek}
               popupItem={this.props.popupItem} closeMoreButtonWeek={this.props.closeMoreButtonWeek}/>
         }  

         {
            this.props.showMoreWeek[1] && this.props.item[1].length != 0 ? 
            <EventDetail date={this.props.date[1]} day="Monday" dayValue="1" month={this.props.month} 
               items={this.props.item[1]} closeMoreButtonWeek={this.props.closeMoreButtonWeek}
               detailsWeek={this.props.detailsWeek[1]} show="week" value={this.props.value}
               handleDetailsWeek={this.props.handleDetailsWeek} popupItem={this.props.popupItem}
               deleteEventList={this.props.deleteEventList}/>
                : 
            <TableBodyItems item={this.props.item[1]} 
               moreButtonWeek={this.props.moreButtonWeek} detailsWeek={this.props.detailsWeek[1]}
               deleteEventList={this.props.deleteEventList} show="week" dayValue="1" 
               value={this.props.value} handleDetailsWeek={this.props.handleDetailsWeek}
               popupItem={this.props.popupItem} closeMoreButtonWeek={this.props.closeMoreButtonWeek}/>
         }
         
         {
            this.props.showMoreWeek[2] && this.props.item[2].length != 0 ? 
            <EventDetail date={this.props.date[2]} day="Tuesday" dayValue="2" month={this.props.month} 
               items={this.props.item[2]} closeMoreButtonWeek={this.props.closeMoreButtonWeek}
               detailsWeek={this.props.detailsWeek[2]} show="week" value={this.props.value}
               handleDetailsWeek={this.props.handleDetailsWeek} popupItem={this.props.popupItem}
               deleteEventList={this.props.deleteEventList} closeMoreButtonWeek={this.props.closeMoreButtonWeek}/>
                : 
            <TableBodyItems item={this.props.item[2]} 
               moreButtonWeek={this.props.moreButtonWeek} detailsWeek={this.props.detailsWeek[2]}
               deleteEventList={this.props.deleteEventList} show="week" dayValue="2" 
               value={this.props.value} handleDetailsWeek={this.props.handleDetailsWeek}
               popupItem={this.props.popupItem} closeMoreButtonWeek={this.props.closeMoreButtonWeek}/>
         }
         
         {
            this.props.showMoreWeek[3] && this.props.item[3].length != 0 ? 
            <EventDetail date={this.props.date[3]} day="Wednesday" dayValue="3" month={this.props.month} 
               items={this.props.item[3]} closeMoreButtonWeek={this.props.closeMoreButtonWeek}
               detailsWeek={this.props.detailsWeek[3]} show="week" value={this.props.value}
               handleDetailsWeek={this.props.handleDetailsWeek} popupItem={this.props.popupItem}
               deleteEventList={this.props.deleteEventList}/>
                : 
            <TableBodyItems item={this.props.item[3]} 
               moreButtonWeek={this.props.moreButtonWeek} detailsWeek={this.props.detailsWeek[3]}
               deleteEventList={this.props.deleteEventList} show="week" dayValue="3"
               value={this.props.value} handleDetailsWeek={this.props.handleDetailsWeek}
               popupItem={this.props.popupItem} closeMoreButtonWeek={this.props.closeMoreButtonWeek}/>
         }

         {
            this.props.showMoreWeek[4] && this.props.item[4].length != 0 ? 
            <EventDetail date={this.props.date[4]} day="Thursday" dayValue="4" month={this.props.month} 
               items={this.props.item[4]} closeMoreButtonWeek={this.props.closeMoreButtonWeek}
               detailsWeek={this.props.detailsWeek[4]} show="week" value={this.props.value}
               handleDetailsWeek={this.props.handleDetailsWeek} popupItem={this.props.popupItem}
               deleteEventList={this.props.deleteEventList}/>
                : 
            <TableBodyItems item={this.props.item[4]} 
               moreButtonWeek={this.props.moreButtonWeek} detailsWeek={this.props.detailsWeek[4]}
               deleteEventList={this.props.deleteEventList} show="week" dayValue="4" 
               value={this.props.value} handleDetailsWeek={this.props.handleDetailsWeek}
               popupItem={this.props.popupItem} closeMoreButtonWeek={this.props.closeMoreButtonWeek}/>
         }

         {
            this.props.showMoreWeek[5] && this.props.item[5].length != 0 ? 
            <EventDetail date={this.props.date[5]} day="Friday" dayValue="5" month={this.props.month} 
               items={this.props.item[5]} closeMoreButtonWeek={this.props.closeMoreButtonWeek}
               detailsWeek={this.props.detailsWeek[5]} show="week" value={this.props.value}
               handleDetailsWeek={this.props.handleDetailsWeek} popupItem={this.props.popupItem}
               deleteEventList={this.props.deleteEventList}/>
                : 
            <TableBodyItems item={this.props.item[5]} 
               moreButtonWeek={this.props.moreButtonWeek} detailsWeek={this.props.detailsWeek[5]}
               deleteEventList={this.props.deleteEventList} show="week" dayValue="5" 
               value={this.props.value} handleDetailsWeek={this.props.handleDetailsWeek}
               popupItem={this.props.popupItem} closeMoreButtonWeek={this.props.closeMoreButtonWeek}/>
         }

         {
            this.props.showMoreWeek[6] && this.props.item[6].length != 0 ? 
            <EventDetail date={this.props.date[6]} day="Saturday" dayValue="6" month={this.props.month} 
               items={this.props.item[6]} closeMoreButtonWeek={this.props.closeMoreButtonWeek}
               detailsWeek={this.props.detailsWeek[6]} show="week" value={this.props.value}
               handleDetailsWeek={this.props.handleDetailsWeek} popupItem={this.props.popupItem}
               deleteEventList={this.props.deleteEventList} />
                : 
            <TableBodyItems item={this.props.item[6]} 
               moreButtonWeek={this.props.moreButtonWeek} detailsWeek={this.props.detailsWeek[6]}
               deleteEventList={this.props.deleteEventList} show="week" dayValue="6" 
               value={this.props.value} handleDetailsWeek={this.props.handleDetailsWeek}
               popupItem={this.props.popupItem} closeMoreButtonWeek={this.props.closeMoreButtonWeek}/>
         }
      </tr>
		)
   }
})

export default Time;
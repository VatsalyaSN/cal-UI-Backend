import React from 'react';
import {render} from 'react-dom';
import CellData from './CellData';
import TableBodyItems from './TableBodyItems';
import EventDetail from './EventDetail';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const TableBody= (props) => {
      // console.log("DETAILS >> ",props.details[0]);
   // console.log("hey",props.showMore);
	return(
		<tr>
         {
            props.showMore[0] && props.item[0].length != 0 ? 
               <EventDetail date={props.date[0]} day="Sunday" month={props.month} 
                  items={props.item[0]} closeDetail={props.closeDetail} 
                  details={props.details[0]} handleDetails={props.handleDetails}
                  popupItem={props.popupItem} deleteEventList={props.deleteEventList}
                  show="month" id={props.id}/> : 
               <TableBodyItems date={props.date[0]} item={props.item[0]} 
                  moreButtonAction={props.moreButtonAction} details={props.details[0]} 
                  handleDetails={props.handleDetails} popupItem={props.popupItem}
                  closeDetail={props.closeDetail} deleteEventList={props.deleteEventList}
                  show="month" month={props.month} handleMdisplay={props.handleMdisplay}
               year={props.year} lastWeek={props.lastWeek[0]} nextWeek={props.nextWeek[0]}
               id={props.id}/>
         }  
         {
            props.showMore[1] && props.item[1].length != 0 ? 
               <EventDetail date={props.date[1]} day="Monday" month={props.month}
                  items={props.item[1]} closeDetail={props.closeDetail} 
                  details={props.details[1]} handleDetails={props.handleDetails} 
                  popupItem={props.popupItem} deleteEventList={props.deleteEventList}
                  show="month" id={props.id}/> : 
               <TableBodyItems date={props.date[1]} item={props.item[1]} 
                  moreButtonAction={props.moreButtonAction} details={props.details[1]} 
                  handleDetails={props.handleDetails} popupItem={props.popupItem}
                  closeDetail={props.closeDetail} deleteEventList={props.deleteEventList}
                  show="month" month={props.month} handleMdisplay={props.handleMdisplay}
               year={props.year} lastWeek={props.lastWeek[1]} nextWeek={props.nextWeek[1]}
               id={props.id}/>
         }
         {
            props.showMore[2] && props.item[2].length != 0 ? 
               <EventDetail date={props.date[2]} day="Tuesday" month={props.month}
                  items={props.item[2]} closeDetail={props.closeDetail} 
                  details={props.details[2]} handleDetails={props.handleDetails}
                  popupItem={props.popupItem} deleteEventList={props.deleteEventList}
                  show="month" id={props.id}/> : 
               <TableBodyItems date={props.date[2]} item={props.item[2]} 
                  moreButtonAction={props.moreButtonAction} details={props.details[2]} 
                  handleDetails={props.handleDetails} popupItem={props.popupItem}
                  closeDetail={props.closeDetail} deleteEventList={props.deleteEventList}
                  show="month" month={props.month} handleMdisplay={props.handleMdisplay}
               year={props.year} lastWeek={props.lastWeek[2]} nextWeek={props.nextWeek[2]}
               id={props.id}/>
         }
         {
            props.showMore[3] && props.item[3].length != 0 ? 
               <EventDetail date={props.date[3]} day="Wednesday" 
                items={props.item[3]} closeDetail={props.closeDetail}
                  details={props.details[3]} handleDetails={props.handleDetails}
                  popupItem={props.popupItem} deleteEventList={props.deleteEventList}
                  show="month" id={props.id}/> : 
               <TableBodyItems date={props.date[3]} item={props.item[3]} 
                  moreButtonAction={props.moreButtonAction} details={props.details[3]} 
                  handleDetails={props.handleDetails} popupItem={props.popupItem}
                  closeDetail={props.closeDetail} deleteEventList={props.deleteEventList}
                  show="month" month={props.month} handleMdisplay={props.handleMdisplay}
               year={props.year} lastWeek={props.lastWeek[3]} nextWeek={props.nextWeek[3]}
               id={props.id}/>
         }
         {
            props.showMore[4] && props.item[4].length != 0 ? 
               <EventDetail date={props.date[4]} day="Thursday" 
                items={props.item[4]} closeDetail={props.closeDetail} 
                details={props.details[4]} handleDetails={props.handleDetails}
                popupItem={props.popupItem} deleteEventList={props.deleteEventList}
                show="month" id={props.id}/> : 
               <TableBodyItems date={props.date[4]} item={props.item[4]} 
                  moreButtonAction={props.moreButtonAction} details={props.details[4]} 
                  handleDetails={props.handleDetails} popupItem={props.popupItem}
                  closeDetail={props.closeDetail} deleteEventList={props.deleteEventList} 
                  show="month" month={props.month} handleMdisplay={props.handleMdisplay}
                  year={props.year} lastWeek={props.lastWeek[4]} nextWeek={props.nextWeek[4]}
                  id={props.id}/>
         }
         {
            props.showMore[5] && props.item[5].length != 0 ? 
               <EventDetail date={props.date[5]} day="Friday" items={props.item[5]} 
                  closeDetail={props.closeDetail} details={props.details[5]} 
                  handleDetails={props.handleDetails} popupItem={props.popupItem} 
                  deleteEventList={props.deleteEventList} show="month" id={props.id}/> : 
               <TableBodyItems date={props.date[5]} item={props.item[5]} 
                  moreButtonAction={props.moreButtonAction} details={props.details[5]} 
                  handleDetails={props.handleDetails} popupItem={props.popupItem}
                  closeDetail={props.closeDetail} deleteEventList={props.deleteEventList}
                  show="month" month={props.month} handleMdisplay={props.handleMdisplay}
                   year={props.year} lastWeek={props.lastWeek[5]} nextWeek={props.nextWeek[5]}
                   id={props.id} />
         }
         {
            props.showMore[6] && props.item[6].length != 0 ? 
               <EventDetail date={props.date[6]} day="Saturday" items={props.item[6]}
                  closeDetail={props.closeDetail} details={props.details[6]} 
                  handleDetails={props.handleDetails} popupItem={props.popupItem} 
                  deleteEventList={props.deleteEventList} show="month" id={props.id}/> : 
               <TableBodyItems date={props.date[6]} item={props.item[6]} 
                  moreButtonAction={props.moreButtonAction} details={props.details[6]} 
                  handleDetails={props.handleDetails} popupItem={props.popupItem}
                  closeDetail={props.closeDetail} deleteEventList={props.deleteEventList}
                  show="month" month={props.month} handleMdisplay={props.handleMdisplay}
                  year={props.year} lastWeek={props.lastWeek[6]} nextWeek={props.nextWeek[6]}
                  id={props.id}/>
         }

      </tr>
		)
	}
export default TableBody;
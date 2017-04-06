import React from 'react';
import CellData from './CellData';


const Time= React.createClass({
   render(){
      return(
      <tr>
         <td className="weeklyViewtd"><div className="head">{this.props.time}</div></td>
         <td className="weeklyViewtd"><div className="divtd"><ul className="timeul">{
            this.props.item[0].map(item =>
            {
               if(item.eventItem != undefined)
               return <CellData item={item} len={this.props.item[0].length}></CellData>
         })}
            </ul></div></td>
         
         <td className="weeklyViewtd"><div className="divtd"><ul className="timeul">{
            this.props.item[1].map(item =>
            {
               if(item.eventItem != undefined)
               return <CellData item={item} len={this.props.item[1].length}></CellData>
         })}
            </ul></div></td>
         
         <td className="weeklyViewtd"><div className="divtd"><ul className="timeul">{
            this.props.item[2].map(item =>
            {
               if(item.eventItem != undefined)
               return <CellData item={item} len={this.props.item[2].length}></CellData>
         })}
            </ul></div></td>
         
         <td className="weeklyViewtd"><div className="divtd"><ul className="timeul">{
            this.props.item[3].map(item =>
            {
               if(item.eventItem != undefined)
               return <CellData item={item} len={this.props.item[3].length}></CellData>
         })}
            </ul></div></td>

         <td className="weeklyViewtd"><div className="divtd"><ul className="timeul">{
            this.props.item[4].map(item =>
            {
               if(item.eventItem != undefined)
               return <CellData item={item} len={this.props.item[4].length}></CellData>
         })}
            </ul></div></td>

         <td className="weeklyViewtd"><div className="divtd"><ul className="timeul">{
            this.props.item[5].map(item =>
            {
               if(item.eventItem != undefined)
               return <CellData item={item} len={this.props.item[5].length}></CellData>
         })}
            </ul></div></td>

         <td className="weeklyViewtd"><div className="divtd"><ul className="timeul">{
            this.props.item[6].map(item =>
            {
               if(item.eventItem != undefined)
               return <CellData item={item} len={this.props.item[6].length}></CellData>
         })}
            </ul></div></td>
      </tr>
		)
   }
})

export default Time;
function eventsReducer(state=[],action){
	console.log("this is event reducer state ",state);
	switch(action.type){
		case 'ADD_EVENT':
			return [...state,{
		  			dateItem:action.date,
		  			starttime:action.starttime,
		  			endtime : action.endtime,
		  			eventItem:action.event
		  		}];

		  case 'EVENT_DISPLAY':
			// console.log("FROM EVENT HANDLER")
			// console.log(action.data);
			// action.data.forEach(function(event){
			// 	console.log("iteration of array");
			// 	console.log(event.date,event.starttime,event.event_detail);
				// console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH");
				return [...state,{
		  			dateItem:action.data.date,
		  			starttime:action.data.starttime,
		  			endtime : action.data.endtime,
		  			eventItem:action.data.event_detail,
		  			eventId : action.data.event_id
		  		}];
			

		  case 'CLEAR_EVENTS':
		  	return [];

		  case 'EVENT_MAPPING':
		  return state;

		  case 'REMOVE_COMMENT':
		    return [
		    	...state.slice(0,action.i),
		    	...state.slice(action.i+1)
		    ]

		  case 'ADJUST_DISPLAY':
			  	console.log("IN ADJUST ADJUST_DISPLAY", action.id);
			  	var newArr = []
			  	newArr = state.filter(function(item){
			  		return item.eventId != action.id;
			  	})
			  	console.log(newArr);
		  	return newArr;

		  default : 
		    return state;
	}
}

export default eventsReducer;
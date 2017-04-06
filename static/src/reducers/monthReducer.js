function checkIfNotLeapYear(state){
 	const isLeap = new Date(state.year, 1, 29).getMonth() == 1;
 	if(isLeap){
 		return Object.assign({},state,{dateArray : state.dateArray.splice(1,1,29)});
 	}
 	else{
 		return Object.assign({},state,{dateArray : state.dateArray.splice(1,1,28)});
 	}
}

function getCurrentMonth(state,d,nextValue,flag){
			var monthArray = state.monthArray;
			var objNew = {};
			// console.log("NEXTVALUE ",nextValue);
			var currentDate = new Date('"'+state.monthArray[d.getMonth()+nextValue]+' 1, '+state.year+'"');
			var dayOfCurrentMonth = currentDate.getDay();
			var newArr = [new Array(),new Array(),new Array(),new Array(),new Array(),new Array()];
			var x=1;
			var currentMonth = state.dateArray[d.getMonth()+nextValue]
			// console.log(currentMonth);
			for(var i=0;i<6; i++){
				for(var j=0;j<7;j++)
				{
						if((j < dayOfCurrentMonth && i===0) || x > currentMonth)
								newArr[i][j] = " ";
                     
				       if(((j >= dayOfCurrentMonth) && (i===0)) || (i!==0) && x<=currentMonth){
				      		newArr[i][j]=x;
				      		x++; 
				         }
				}
			}	
			if(flag===0)
				objNew = Object.assign({},state,
				 {nextWeekValue : 0, months :state.monthArray[d.getMonth()+nextValue],date : newArr,
				  nextValue : nextValue+1})
			else{
				if(newArr[5][0] === ' ')
					objNew = Object.assign({},state,
						{nextWeekValue : 4, months :state.monthArray[d.getMonth()+nextValue],date : newArr,
						 nextValue : nextValue+1})
				else
					objNew = Object.assign({},state, 
						{nextWeekValue : 5, months :state.monthArray[d.getMonth()+nextValue],date : newArr,
						 nextValue : nextValue+1})
			}

			// console.log(state.date);
		return objNew;
}

function getCurrentWeek(state,d){
		var retObj = {};
		var weekArr=new Array();
		var num;
		checkIfNotLeapYear(state);
		retObj = Object.assign({},state, {year : d.getFullYear()});
		retObj = getCurrentMonth(retObj,d,0,0);
	for(var i=0;i<6;i++){
		for(var j=0;j<7;j++){
			if(retObj.date[i][j] == d.getDate()){
				weekArr = retObj.date[i];
				num = i;
				break;
			}
		}
	}
	// console.log("retObj nextValue --> ",retObj.nextValue);
	// console.log("retObj index ==== > ",retObj.monthArray.indexOf(retObj.monthArray[d.getMonth()]))
	return Object.assign({},state,
			{weekDate : weekArr, nextWeekValue:num, 
				months : retObj.monthArray[d.getMonth()],year : d.getFullYear(),
				nextValue : retObj.nextValue});
}

function getNextWeek(state,d,nextValue,nextWeekValue,flag){
	var retObj ={};
	var newObj={};
	// console.log(nextWeekValue,nextValue)
	if(nextWeekValue === 5 && state.date[5][0] === ' ' || nextWeekValue === 6 || nextWeekValue == 4 && state.date[4][0] === ' '){
		if(state.months === 'December')
			{
				const monthIndex = state.monthArray.indexOf(state.monthArray[d.getMonth()])
				if(monthIndex == 0)
					nextValue = 0;
				else
					nextValue = -monthIndex;
					newObj = Object.assign({},state, {year : state.year+1 });
					checkIfNotLeapYear(newObj);
			}
		else
			newObj = state;

				retObj= getCurrentMonth(newObj,d,nextValue,flag);
				console.log("Ret obj ",retObj);
				return Object.assign({},state,
					{
						weekDate : retObj.date[retObj.nextWeekValue], nextWeekValue:retObj.nextWeekValue, 
						months : retObj.months,year : retObj.year,
						nextValue : retObj.nextValue,date : retObj.date
					});
			}

	else if(nextWeekValue === -1){
			if(state.months === 'January')
				{
					nextValue = 13 - state.monthArray.indexOf(state.monthArray[d.getMonth()]);
				 	newObj = Object.assign({},state, {year : state.year-1 });
					checkIfNotLeapYear(newObj);
				}	
			else 
				newObj = state;
							   
			nextValue = --nextValue;
			retObj=getCurrentMonth(newObj,d,--nextValue,flag=1);

			if(retObj.date[5][0] === ' ' && retObj.date[4][0] === ' '){
				nextWeekValue = 3;
			}

			else{
				nextWeekValue = retObj.nextWeekValue;
			}

			return Object.assign({},state,
					{
						weekDate:retObj.date[nextWeekValue], year : retObj.year,
						nextWeekValue : nextWeekValue, months :retObj.months , 
						date : retObj.date, nextValue : retObj.nextValue
					})
		    	}

	else
		return Object.assign({},state,{weekDate : state.date[nextWeekValue], nextWeekValue : nextWeekValue});
}

function getOnLoadResult(state){
		return Object.assign({},state,{weekDate : state.date[0], nextWeekValue : 0})
}

function toggleShowMore(state,id,show) {
	var i,j;
	var arr = [new Array(),new Array(),new Array(),new Array(),new Array(),new Array()];
	for(i=0;i<state.date.length;i++){
		for(j=0;j<state.date[i].length;j++){
			if(state.date[i][j] == id)
			{
				arr[i][j] = show;
			}
			else
				arr[i][j] = 0;
		}
	}
	return Object.assign({},state,{showMore:arr})
}



function monthReducer(state={}, action){
		var d = new Date();
		var nextValue = state.nextValue;
		var nextWeekValue = state.nextWeekValue;
		var newObj={};
		var flag=0;

			switch(action.type){
				case 'GET_TODAY' : 
						checkIfNotLeapYear(state);
						newObj = Object.assign({},state, {year : d.getFullYear()});
						return getCurrentMonth(newObj,d,0,flag);

				case 'HANDLE_NEXT':{
							if(state.months === 'December')
							  {
							  	const monthIndex = state.monthArray.indexOf(state.monthArray[d.getMonth()])
							  	if(monthIndex == 0)
							  		nextValue = 0;
							  	else
									nextValue = -monthIndex;
							  	newObj = Object.assign({},state, {year : state.year+1 });
							  	checkIfNotLeapYear(newObj);
							  }	
							else 
							  	newObj = state;

							return getCurrentMonth(newObj,d,nextValue,flag);
					   }

				case 'HANDLE_PREVIOUS':{
					console.log("INSIDE MONTH REDUCER");
							if(state.months === 'January')
								 {
								nextValue = 13 - state.monthArray.indexOf(state.monthArray[d.getMonth()]);
							  	newObj = Object.assign({},state, {year : state.year-1 });
							  	checkIfNotLeapYear(newObj);
							  }	
							  else 
							  	newObj = state;
							   nextValue = --nextValue;
							return getCurrentMonth(newObj,d,--nextValue,flag=1);
					    }

				case "HANDLE_NEXT_WEEK":
					console.log("from next ",nextValue);
						return getNextWeek(state,d,nextValue,++nextWeekValue,flag);

				case "HANDLE_PREVIOUS_WEEK":
						return getNextWeek(state,d,nextValue,--nextWeekValue,flag=1);

				case "CURRENT_WEEK":
						return getCurrentWeek(state,d);
				
				case "HANDLE_ONLOAD" : 
						return getOnLoadResult(state);

				case "EVENT_MAPPING":
						return Object.assign({},state,{eventStore:action.finalList});

				case "EVENT_MAPPING_MONTH":
						return Object.assign({},state,{eventStoreMonth : action.newList});

				case "SET_BUTTON":
						return toggleShowMore(state,action.id,true);

				case "CLOSE_DETAIL":
						return toggleShowMore(state,action.id,false);

				case "MONTH_CLEAR":
						return Object.assign({},state,{eventStoreMonth : []});

				case "WEEK_CLEAR":
						return Object.assign({},state,{eventStore : []});
				
				default : 
						return state;
			}
}

export default monthReducer;
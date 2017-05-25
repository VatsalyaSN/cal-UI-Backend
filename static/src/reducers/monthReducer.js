function checkIfNotLeapYear(state){
 	const isLeap = new Date(state.year, 1, 29).getMonth() == 1;
 	if(isLeap){
 		return Object.assign({},state,{dateArray : state.dateArray.splice(1,1,29)});
 	}
 	else{
 		return Object.assign({},state,{dateArray : state.dateArray.splice(1,1,28)});
 	}
}


function getNextMonthWeek(state,newArr,nextweek,flag){
	var x=0,z=1;
	if(flag == 0)
	{
		if(newArr[5][0] != ' '){
			x = newArr[5].filter(function(i){return i == " "});
		}
		else if(newArr[4][6] == ' ')
			x = newArr[4].filter(function(i){return i == " "});

		for(var k=0;k<7-x.length;k++)
			nextweek[k] = " ";

		for(var k=7-x.length;k<7;k++ )
		{
			nextweek[k] = z++;
		}
	}
	
	else
		{
		// console.log("NEXT WEEK",state.date[0],flag)
		if(state.date[0][0] == " ")
			nextweek = state.date[0];
	}
	return nextweek;

}



function getOnLoadResult(state){
		return Object.assign({},state,{weekDate : state.date[0], nextWeekValue : 0})
}

function toggleShowMore(state,id,show,button,item) {
	// console.log("DATE ID..",id)
	var i,j;
	var arr = [new Array(),new Array(),new Array(),new Array(),new Array(),new Array()];
	for(i=0;i<state.date.length;i++){
		for(j=0;j<state.date[i].length;j++){
			if(state.date[i][j] == id)
			{
				arr[i][j] = show
			}
			else
				arr[i][j] = 0;
		}
	}
	if(button == "more")
		return Object.assign({},state,{showMore:arr})
	else
	{
		if(show == true)
			return Object.assign({},state,{details : arr,popupItem : item})
		else
			return Object.assign({},state,{details:arr})
	}
}

function toggleShowMoreWeek(state,index,day,value,item,button){
	// console.log("item",item);
	var arr = [new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),
	new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),
	new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),
	new Array(),new Array(),new Array(),new Array(),new Array(),new Array()];
	
	for(var i=0;i<24;i++)
	{
		for(var j=0;j<7;j++){
			// console.log(j,day,j==day,i,index,i==index);
			if(i == index && j==day)
			{
				// console.log("INSIDE WEEK TOGGLE");
				arr[i][j] = value;

			}
			else
				arr[i][j] = 0;
		}
	}
	if(button == "more")
	return Object.assign({},state,{showMoreWeek:arr});
	else
	{
		if(value==true) 
		{
			// console.log("INSIDE TRUE OF DETAILS",item)
		return Object.assign({},state,{detailsWeek : arr, popupItem : item})

		}
		else
		return Object.assign({},state,{detailsWeek : arr})
	}
}

function newDesign(state,d,nextValue,flag){
	var monthArray = state.monthArray;
	var objNew = {};
	var currentDate = new Date(state.year, nextValue,1);
	// console.log(currentDate);
	// console.log("===========")
	var dayOfCurrentMonth = currentDate.getDay();
	var newArr = [new Array(),new Array(),new Array(),new Array(),new Array(),new Array()];
	var x=1;
	var z=1;
	var currentMonth = state.dateArray[nextValue];
	// console.log(currentMonth,nextValue)
	var nextweek=[];
	var lastweek = [];

	// console.log(currentMonth);
	// console.log("Before changing the state >> ",state.date)
	

	// console.log(lastweek);

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

	// console.log(newArr)
	lastweek = getLastWeek(state,newArr,lastweek,flag,nextValue)
	nextweek = getNextMonthWeek(state,newArr,nextweek,flag);
	
	// console.log(nextweek,newArr);

	if(flag===0 || flag == "today")
		objNew = Object.assign({},state,
				{nextWeekValue : 0, months :state.monthArray[nextValue],
					date : newArr, nextValue : nextValue, lastWeek : lastweek, nextWeek:nextweek})
	else{
		if(newArr[5][0] === ' ')
			objNew = Object.assign({},state,
					{nextWeekValue : 4, months :state.monthArray[nextValue],date : newArr,
						 nextValue : nextValue, nextWeek : nextweek, lastWeek : lastweek})
		else
			objNew = Object.assign({},state, 
					{nextWeekValue : 5, months :state.monthArray[nextValue],date : newArr,
						 nextValue : nextValue ,nextWeek : nextweek, lastWeek : lastweek})
			}

			// console.log(state.date);
	return objNew;
}

function getLastWeek(state,newArr,lastweek,flag,currentMonth){
	var numberOfDays = 0;
	var x=0;
	
		// if(state.months == "February")
		if(currentMonth == 0)
			numberOfDays=state.dateArray[currentMonth];
		else
			numberOfDays=state.dateArray[currentMonth-1];
		
		// console.log(numberOfDays,currentMonth)
		x=newArr[0].filter(function(i){
			return i== " ";
		})
		var len = x.length-1;
		// console.log(numberOfDays,x.length)
		for(var l=0;l<x.length;l++)
		{
			lastweek[l] = numberOfDays-len+l;
		}
		for(var l=x.length;l<7;l++)
			lastweek[l] = " ";

		// console.log("lastweek ---- ",lastweek);

	return lastweek;
}



function monthReducer(state={}, action){
	var dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
	var d = new Date();
	var nextValue = state.nextValue;
	var nextWeekValue = state.nextWeekValue;
	var newObj={};
	var flag=0;
	var month;
	var retObj={};

	switch(action.type){
		case 'GET_TODAY' : 
				checkIfNotLeapYear(state);
				newObj = Object.assign({},state, {year : d.getFullYear()});
				return getCurrentMonth(newObj,d,0,flag);

		case 'MONTH':
			return newDesign(state,d,action.month,flag);

		case 'CURRENT_SECTION':
		// console.log("In current case ===")
			newObj = Object.assign({},state, {year : d.getFullYear() });
					// console.log("In current case ===",newObj)
	
			retObj= newDesign(newObj,d,d.getMonth(),flag);
			// console.log(retObj)
			return Object.assign({},state,{nextWeekValue:retObj.nextWeekValue,
				months:retObj.months,date:retObj.date,nextValue:retObj.nextValue,
				lastWeek:retObj.lastWeek,nextWeek:retObj.nextWeek,year:d.getFullYear()})

		case 'NEXT':
			newObj = Object.assign({},state, {year : state.year+1 });
			checkIfNotLeapYear(newObj);
			if(newObj.year == d.getFullYear())
				retObj=newDesign(newObj,d,d.getMonth(),flag);
			else
				retObj=newDesign(newObj,d,0,flag);
			// console.log("RETURN+++",retObj);
			return Object.assign({},state,{nextWeekValue:retObj.nextWeekValue,
				months:retObj.months,date:retObj.date,nextValue:retObj.nextValue,
				lastWeek:retObj.lastWeek,nextWeek:retObj.nextWeek,year:state.year+1})

		case 'PREVIOUS':
			newObj = Object.assign({},state, {year : state.year-1 });
			checkIfNotLeapYear(newObj);
			if(newObj.year == d.getFullYear())
				retObj=newDesign(newObj,d,d.getMonth(),1);
			else
				retObj=newDesign(newObj,d,0,1);
			return Object.assign({},state,{nextWeekValue:retObj.nextWeekValue,
				months:retObj.months,date:retObj.date,nextValue:retObj.nextValue,
				lastWeek:retObj.lastWeek,nextWeek:retObj.nextWeek,year:state.year-1})

		case 'HANDLE_MDISPLAY':
			var month;
			// console.log(typeof(action.month))
			if(typeof(action.month) == 'number')
				month = action.month
			else
				month=state.monthArray.indexOf(action.month)
			var d1 = new Date(action.year,month,action.date)
			// console.log(month,d1,d1.getDay())
			var mObject= {
				date : action.date,
				day : dayArray[d1.getDay()],
				items:action.items
			}
			return Object.assign({},state,{mObject : mObject})

		
		case "HANDLE_ONLOAD" : 
				return getOnLoadResult(state);

		case "EVENT_MAPPING":
				return Object.assign({},state,{eventStore:action.finalList});

		case "EVENT_MAPPING_MONTH":
				return Object.assign({},state,{eventStoreMonth : action.newList});

		case "SET_BUTTON":
				return toggleShowMore(state,action.id,true,action.button,"");

		case "CLOSE_DETAIL":
				return toggleShowMore(state,action.id,false,action.button,"");

		case "MONTH_CLEAR":
				return Object.assign({},state,{eventStoreMonth : []});

		case "WEEK_CLEAR":
				return Object.assign({},state,{eventStore : []});
		
		case "HANDLE_DETAILS":
				return toggleShowMore(state,action.id,true,action.button,action.item);
		
		case "APPEND_LETTER":
				// console.log("FROM APPEND_LETTER", state.popupItem+action.x)
				return Object.assign({},state,{popupItem : state.popupItem+action.x})

		case "SET_WEEK_BUTTON":
				return toggleShowMoreWeek(state,action.value,action.day,true,"","more");

		case "CLOSE_WEEK_BUTTON":
				return toggleShowMoreWeek(state,action.value,action.day,false,"",action.button);

		case "HANDLE_DETAILS_WEEK":
				return toggleShowMoreWeek(state,action.value,action.day,true,action.item,"details");

		case "PLUS_BUTTON":
			return Object.assign({},state,{plusButton : true})

		case "CLOSE_PLUS_BUTTON":
			return Object.assign({},state,{plusButton : false})

		case "ADJUST_MONTH_DISPLAY":
			var changedArr;
			var arrofstate=state.eventStoreMonth;
			for(var h=0;h<action.idArr.length;h++){
				changedArr=arrofstate.filter(function(c){
				return c.eventId != action.idArr[h]
			})
			arrofstate=changedArr;	
			}
			console.log("delete new test****",changedArr)
			return Object.assign({},state,{eventStoreMonth:changedArr})

		default : 
				return state;
	}
}

export default monthReducer;
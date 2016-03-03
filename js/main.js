"use strict";

var CalenderView = function(){
	
	this.init().readInput().processContent().attachEvents();
};
CalenderView.prototype.init = function(){
	var that = this;
	that.findWidth = Helpers.getFindWidth();
	that.dayMap = Helpers.dayMap;
	return that;
},
CalenderView.prototype.processContent = function(){
	var that = this,
	m,
	content = that.calenderModel.content,
	yearInput = that.calenderModel.yearInput,
	regPattern = Helpers.findStrings(content,['name','birthday']),
	re = new RegExp(regPattern, 'g'),
	date,
	day,
	peopleCollectionGroup = this.peopleCollectionGroup = {};
	while ((m = re.exec(content)) !== null) {
	    if (m.index === re.lastIndex) {
	        re.lastIndex++;
	    }
	    yearInput && (m[2] = m[2].replace(/(\d{4})/g,yearInput));
	    date = new Date(m[2]);
	    day = date.getDay();
	    
	    if(Number.isNaN(day)){
	    	continue; //invalid date
	    }
	    var name= m[1];
	    var nameSplitted = name.split(' ');
	    peopleCollectionGroup[day] = peopleCollectionGroup[day] || [];
	    peopleCollectionGroup[day].push({
	    	name: name,
	    	date: date,
	    	year:date.getUTCFullYear().toString(),
	    	initials: nameSplitted[0].charAt(0)+nameSplitted[1].charAt(0)
	    });
	}
	for (let day in that.dayMap){
		let people = peopleCollectionGroup[day] || [];
		peopleCollectionGroup[day] = people.sort((a,b) => a.date-b.date );
		this.render(people, day);
	}
	return that;
};
CalenderView.prototype.render = function(people, day){
	let that=this,
	calDay = document.querySelector(`[data-day=${that.dayMap[day]}]`),
	classString,
	peopleLength = people.length,
	width;

	classString = calDay.className	;
	if(!people.length){
		classString += ' day--empty';
	}else{
		classString = classString.replace('day--empty','');
	}
	calDay.className = classString;
	width = that.findWidth(peopleLength);
	var dayPersonHtml = people.reduce((res,person) => res + `<div class="day__person" style="width:${width}%;height:${width}%">${person['initials']}	</div>`,'');
	var elem = calDay.querySelector('.day__people');
	elem && (elem.innerHTML = dayPersonHtml);
	return that;
};
CalenderView.prototype.readInput = function(){
	var that = this;
	that.calenderModel = {
		content: document.getElementById('json-input').value,
		yearInput: document.querySelector('.app__input').value
	};
	return that;
};
CalenderView.prototype.attachEvents = function(){
	var that = this,
	peopleCollectionGroup;
	document.querySelector('.app__button').addEventListener('click',e=>{
		this.readInput().processContent();
	},false);
	return that;
};


new CalenderView();


















"use strict";

var CalenderView = function(content){
	this.content = content;
	this.processContent();
	this.attachEvents();
};
CalenderView.prototype.processContent = function(yearInput){
	var m;
	var content = this.content;
	var regPattern = findStrings(content,['name','birthday']);
	var re = new RegExp(regPattern, 'g');
	var  peopleCollectionGroup = this.peopleCollectionGroup = {};
	while ((m = re.exec(content)) !== null) {
	    if (m.index === re.lastIndex) {
	        re.lastIndex++;
	    }
	    var date = new Date(m[2]);
	    var day = date.getDay();
	    yearInput && date.setYear( yearInput );
	    if(Number.isNaN(day)){
	    	continue;
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
	for (let day in peopleCollectionGroup){
		let people = peopleCollectionGroup[day];
		peopleCollectionGroup[day] = people.sort((a,b) => a.date-b.date );
		this.render(people, day);
	}	
};
CalenderView.prototype.render = function(people, day){
	let calDay = document.querySelector(`[data-day=${dayMap[day]}]`),
	classString;

	classString = calDay.className	;
	if(!people.length){
		classString += ' day--empty';
	}else{
		classString = classString.replace('day--empty','');
	}
	calDay.className = classString;
	var dayPersonHtml = people.reduce((res,person) => res + `<div class="day__person">${person['initials']}	</div>`,'');
	var elem = calDay.querySelector('.day__people');
	elem && (elem.innerHTML = dayPersonHtml);
};
CalenderView.prototype.attachEvents = function(){
	var that = this,
	peopleCollectionGroup;
	document.querySelector('.app__button').addEventListener('click',e=>{
		var peopleCollectionGroup,
		yearInput = document.querySelector('.app__input').value;
		that.content = document.getElementById('json-input').value;
		that.processContent(yearInput);
	},false);

};



var calenderModel = document.getElementById('json-input').value;
new CalenderView(calenderModel);


















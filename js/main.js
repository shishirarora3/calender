"use strict";

var CalenderView = function(content){
	this.content = content;
	this.init();
	this.attachEvents();
};
CalenderView.prototype.init = function(){
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
	var dayPersonHtml = people.reduce((res,person) => res + `<div class="day__person">${person['initials']}	</div>`,'');
	var elem = document.querySelector(`[data-day=${dayMap[day]}] .day__people`);
	elem && (elem.innerHTML = dayPersonHtml);
};
CalenderView.prototype.attachEvents = function(){
	var that = this,
	that.eventAttached = true;
	document.querySelector('.app__button').addEventListener('click',e=>{
		var yearInput = document.querySelector('.app__input').value;
		that.content = document.getElementById('json-input').innerHTML;
		that.init();
		for (let day in peopleCollectionGroup){
		let people = peopleCollectionGroup[day].filter(a=>a.year===yearInput).sort((a,b) => a.date-b.date );
		that.render(people, day);
		}
	},false);

};



var calenderModel = document.getElementById('json-input').innerHTML;
new CalenderView(calenderModel);


















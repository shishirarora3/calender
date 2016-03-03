var findStrings = function(content, strings){
		var len = strings.length;
		var spaceGroups = `\\s*\\r*\\n*\\t*`;
		var capturingGroup = `\"(.+)\"`
		
		var patternString = strings.reduce((res,str,i) => {
			res += `${str}${spaceGroups}:\\s*\\"(.+)\\"`;
			console.log(i);
			if(i !== len-1){
				res+=`\\,${spaceGroups}`;
			}
			return res;
		},'');
		//var pattern = "/name\s*\r*\n*\t*:\s*\"(.+)\"\,\s*\r*\n*\t*birthday\s*\r*\n*\t*:\s*\"(.+)\"/g";
		return patternString;
	};

var dayMap={
0:'sun',
1:'mon',
2:'tue',
3:'wed',
4:'thu',
5:'fri',
6:'sat'
};
var findWidth = n =>{
 for (let k=1;k<=n;k++){
    for(let i =1; i<=n; i++){
      if((k*k)>=n){
        return (100/k);
      } 
    }
  }
};


"use strict";
var Helpers = {
    findStrings: function(content, strings) {
        var len = strings.length;
        var spaceGroups = `\\s*\\r*\\n*\\t*`;
        var capturingGroup = `\"(.+)\"`
        
        var patternString = strings.reduce((res, str, i)=>{
        res+=`${str}${spaceGroups}:\\s*\\"(.+)\\"`;
        console.log(i);
        if (i!==len-1){
        res+=`\\,${spaceGroups}`;
        }
        return res;
        }, '');
        //var pattern = "/name\s*\r*\n*\t*:\s*\"(.+)\"\,\s*\r*\n*\t*birthday\s*\r*\n*\t*:\s*\"(.+)\"/g";
        return patternString;
    },
    dayMap: {
        0: 'sun',
        1: 'mon',
        2: 'tue',
        3: 'wed',
        4: 'thu',
        5: 'fri',
        6: 'sat'
    },
    getFindWidth: function() {
        var _memoizedWidths = {};
        return function(n) {
            let memoizedWidth = _memoizedWidths[n];
            if (memoizedWidth) {
                return memoizedWidth;
            }
            for (let k = 1; k <= n; k++) {
                if ((k * k) >= n) {
                        memoizedWidth = _memoizedWidths = 100 / k;
                        return memoizedWidth;
                }
            }
        };
    }

};

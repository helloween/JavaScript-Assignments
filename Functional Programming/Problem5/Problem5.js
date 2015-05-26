(function () {
  'use strict';

  function map (array, callback) {
    var length = array.length, 
        results = Array(array.length);
    
    for (var index = 0; index < array.length; index++){
      results[index] = callback(array[index]);
    }

    return results;
  }


  console.assert([1,2,3].join() === map([1,2,3], function(item){ return item; }).join());
  console.assert([1,4,9].join() === map([1,2,3], function(item){ return item * item; }).join());
  console.assert([].join() === map([], function(item){ return item; }).join());
})(); 

// q: Does ES5 have built-in alternative?
// a: Array.prototype.map
(function () {
  'use strict'

  function filter (array, callback) {
    var results = [];
    for (var index = 0; index < array.length; index++){
      if (callback(array[index]))
        results.push(array[index])
    }

    return results;
  }



  console.assert([1,3,5].join() === filter([100, 1, 10, 12, 3, 5], function(item){ return item % 2 != 0 } ).join());
  console.assert([1,3,5].join() === filter([100, 1, 10, 12, 3, 5], function(item){ return item < 10 } ).join());
})(); 

// q: Does ES5 have built-in alternative?
// a: Array.prototype.filter()

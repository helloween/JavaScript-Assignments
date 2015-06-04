(function () {
  'use strict';

  function first (array, callback) {
    if(arguments.length == 1 && array instanceof Array)
      return array[0];

    for(var index = 0; index < array.length; index++)
      if (callback(array[index]))
        return array[index];
  }


  console.assert(-2 === first([1, 2, -2, 3, -1], function(item) { return item < 0 }));
  console.assert(undefined === first([1, 2, 3], function(item) { return false; }));
  console.assert(1 === first([1, 2, 3]));
})(); 
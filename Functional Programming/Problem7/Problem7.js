(function () {
  'use strict';

  function linearFold(array, callback, initValue) {
    var memo = initValue;
    if(memo == undefined)
      memo = array.shift();
 
    for(var index = 0; index < array.length; index++)
      memo = callback(memo, array[index], index, array);

    return memo;
  }

  function filter (array, callback) {
    var results = [];
    for (var index = 0; index < array.length; index++){
      if (callback(array[index]))
        results.push(array[index])
    }

    return results;
  }

  function averageOfEven(array) {
    var evenArray = filter(array, function(item) { return item%2 == 0 });
    return linearFold(evenArray, function(memo, item) { return memo += item }, 0) / evenArray.length;
  }



  console.assert(5 === averageOfEven([1,23,2,6,12, 0]));
})(); 
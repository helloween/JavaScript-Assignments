(function () {
  'use strict';

  function linearUnfold(callback, initialValue) {
    var state = true,
        value = initialValue,
        clbResult,
        results = [];

    while(state){
      clbResult = callback(value)
      state = clbResult.pop();
      value = clbResult.pop();
      if (state)
        results.push(value);
    }

    return results;
  }

  function inject(array, callback, initValue) {
    var memo = initValue;
    if (memo == undefined)
      memo = array.shift();
 
    for (var index = 0; index < array.length; index++)
      memo = callback(memo, array[index], index, array);

    return memo;
  }  

  function randomizedArray(seed) {
    var counter = 0,
        results = [];

    randomizedArray = function(seed) {
      var value = Math.floor(Math.random() * 10 + 1),
          state = counter < 9;
      
      counter++;
      return [value, state]
    }

    return randomizedArray;
  }


  var array = linearUnfold(randomizedArray(), 0);
  var sum = inject(array, function(previousValue, item) { previousValue += item }, 0);
  console.assert(sum === array.reduce(function (previousValue, item) { previousValue += item }) );
})(); 
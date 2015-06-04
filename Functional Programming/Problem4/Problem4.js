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
      if(state)
        results.push(value);
    }

    return results;
  }

  function test(value) {
    var result = value * value;
    var state = result < 1000;

    return [result, state];
  }


  console.assert([4, 16, 256].join() === linearUnfold(test, 2).join());
})(); 
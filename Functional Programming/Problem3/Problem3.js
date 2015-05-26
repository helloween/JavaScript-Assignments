(function () {
  'use strict';

  function inject(array, callback, initValue) {
    var memo = initValue;
    if(memo == undefined)
      memo = array.shift();       // to prevent checking previous value in callback
 
    for(var index = 0; index < array.length; index++)
      memo = callback(memo, array[index], index, array);

    return memo;
  }

  function Summation(prevValue, currentValue, index, array){
    return prevValue += currentValue;
  }


  console.assert(10 == inject([1,2,3,4], Summation));
  console.assert(10 == inject([1,2,3,4], Summation, 0));
  console.assert(10 == inject([], Summation, 10));
  console.assert(20 == inject([10], Summation, 10));
  console.assert(3 == inject([1], Summation, 2));
})()

// q: Does ES5 have built-in alternative? 
// a: Array.prototype.reduce, Array.prototype.reduceRigh
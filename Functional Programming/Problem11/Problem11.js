(function () {
  'use strict';

  function memoize (memFn) {
    var memos = {};
    var memoize = function(arg) {

      if (!memos.hasOwnProperty(arg)){
        console.log('Not cached')
        memos[arg] = memFn.apply(this, arguments);
      }

      return memos[arg];
    };

    return memoize;
  }

  var fn = memoize(function(a) { return a + a; });
  console.log(fn(150));
  console.log(fn(150));  
  console.log(fn(50));
  console.log(fn(50)); 
  console.log(fn(undefined)); 
  console.log(fn(null)); 
})();
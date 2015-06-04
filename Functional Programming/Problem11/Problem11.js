(function () {
  'use strict';

  Function.prototype.memoize = function () {
    var memos = {},
        that = this;

    return function(arg) {

      if ( !(arg in memos) ){
        console.log('Not cached');
        memos[arg] = that(arg);
      }

      return memos[arg];
    };

  }

  var fn = (function(a) { return a + a; }).memoize();
  console.log(fn(150));
  console.log(fn(150));
  console.log(fn(50));
  console.log(fn(50));
  console.log(fn(undefined));
  console.log(fn(null));
})();
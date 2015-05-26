(function () {
  'use strict';

  function curry(fn) {
    var length = fn.length;

    function wrap(prev) {
      return function(arg) {
        var args = prev.concat(arg);
        if (args.length < length) {
          return wrap(args);
        } else {
          return fn.apply(this, args);
        }
      }
    }

    return wrap([]);
  }



  var fn = function(a, b, c) { return a + b + c; };
  console.assert(fn(1, 2, 3) === curry(fn)(1)(2)(3));
})(); 

// q: How is it differ from Partial Application?
// a: carrying makes function chain for an every argument; partial application function produces another function with lesser arity which returns value of passed function.


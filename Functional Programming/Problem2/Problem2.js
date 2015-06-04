(function () {
  'use strict';

  Function.prototype.curry = function() {
      if(typeof this !== 'function')
        return this;

      var length = this.length,
          args = [],
          that = this;

      function innerCurry() {
        if(arguments.length)
          args = args.concat(arguments[0]);

        if(args.length < length)
          return innerCurry.bind(null);
        else{
          return that.apply(null, args);
        }
      }

      return innerCurry;
  }


  var fn = function(a, b, c) { return a + b + c; };
  console.assert(fn(1, 2, 3) === fn.curry()(1)(2)(3));
})(); 

// q: How is it differ from Partial Application?
// a: carrying makes function chain for an every argument; partial application function produces another function with lesser arity which returns value of passed function.


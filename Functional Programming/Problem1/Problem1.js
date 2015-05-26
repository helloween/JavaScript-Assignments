(function(){
  'use strict';

  function G(){
    var result = 0;
    // summation as an example
    for(var i = 0; i < arguments.length; i++){
      result += arguments[i];
    }

    return result;
  }

  function F(){
    var args = Array.prototype.slice.call(arguments),
        callback = args.pop();

    return function(){
      return callback.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    }
  }


  console.assert( 10 === G(1, 2, 3, 4) );
  console.assert( 10 === F(4, G)(1, 2, 3) );
  console.assert( 21 === F(4, 5, 6, G)(1, 2, 3) );
  console.assert( G(1, 2, 3, 4, 5, 6) === F(4, 5, 6, G)(1, 2, 3) );
})();

// q: Is there any JavaScript built-in alternative?
// a: Function.prototype.bind
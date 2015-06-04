(function () {
  'use strict';

  function makeLazy() {
    var func = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        lazy = false,
        result;

    return function () {
      if (!lazy){
        result = func.apply(this, args);
        lazy = true;
      }

      return result;
    };
  }


  var outer = 0;
  var foo = function(){ outer = 10; return arguments[0] + arguments[1]; }
  var fooLazy = makeLazy(foo, 10, 20);

  console.assert(30 === fooLazy());
  console.assert(10 === outer);

  outer = 0;

  console.assert(30 === fooLazy());
  console.assert(0 === outer);

})();


